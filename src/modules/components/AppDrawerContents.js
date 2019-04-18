import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// controls
import Badge from "@material-ui/core/Badge";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import LinearProgress from "@material-ui/core/LinearProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";

// Icons
import DeviceHubIcon from "@material-ui/icons/DeviceHub";
import HubSpotIcon from "../icons/HubSpot";

// Components
import FabAddDevice from "./FabAddDevice";
import GettingStartedContents from "./GettingStartedContents";
import ListItemLink from "./ListItemLink";
import UtilityContents from "./UtilityContents";

// functions
import compose from "../utils/compose";
import { getLocalIPAddress, getFullRange, isZiveDevice } from "../utils/net";
import { timeoutPromise } from "../utils/promise";

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  badge: {
    top: "100%",
    right: -3,
    border: `2px solid ${
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[900]
    }`
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium
  }
});

class AppDrawerContents extends React.Component {
  state = {
    localIP: null,
    localDevices: [],
    remoteDevices: [],
    knownDevice: "",

    scanDevices: false,
    isLocalScan: false,
    isRemoteScan: false,
    scanCompleted: 0,
    scanTotal: 0
  };

  handleLocalClick = async () => {
    await this.findDevices(true);
  };

  handleRemoteClick = async () => {
    await this.findDevices(false);
  };

  handleAddKnownDevice = async ip => {
    this.setState({ knownDevice: ip });
    await this.scanKnownDevice(ip);
  };

  scanKnownDevice = async ip => {
    await this.loadDescriptionAsync(ip, true);
  };

  findDevices = async isLocal => {
    try {
      const message = isLocal
        ? "Scanning local devices..."
        : "Scanning remote devices...";
      this.props.sendMessage(message);

      if (!isLocal && !this.state.localIP) {
        await this.getLocalIPAddressAsync();
      }
      const baseIP = isLocal ? "169.254.17.1" : this.state.localIP;
      const scanDevices = getFullRange(baseIP, isLocal);
      this.setState({
        isLocalScan: isLocal,
        isRemoteScan: !isLocal,
        scanCompleted: 0,
        scanTotal: scanDevices.length
      });
      scanDevices.map(async ip => {
        await this.loadDescriptionAsync(ip);
      });
    } catch (e) {
      //console.log(e);
    }
  };

  getLocalIPAddressAsync = async () => {
    try {
      const ip = await getLocalIPAddress();
      if (ip) {
        const knownDevice =
          ip
            .split(".")
            .slice(0, 3)
            .join(".") + ".15";
        this.setState({
          localIP: ip,
          knownDevice: knownDevice
        });
      }
    } catch (e) {
      //console.log(e);
    }
  };

  loadDescriptionAsync = async (ip, showMessage = false) => {
    // ip should be a valid IP address.
    const isLocal = ip.split(".").slice(0, 1)[0] === "169";
    const devices = isLocal ? "localDevices" : "remoteDevices";
    try {
      // [TODO] We really want to '/description', but we will do later
      const descriptionURL = "http://" + ip + "/about";
      const descriptionRequest = new Request(descriptionURL, {
        cache: "no-cache"
      });
      const descriptionFetch = await timeoutPromise(
        1000,
        fetch(descriptionRequest)
      );
      const descriptionJson = await descriptionFetch.json();
      if (descriptionJson) {
        if (!isZiveDevice(descriptionJson.macAddress)) return;
        const validDevice = {
          name: descriptionJson.hostName || "Untitled",
          model: descriptionJson.model,
          serialNumber: descriptionJson.serialNumber,
          ipAddress: descriptionJson.ipAddress,
          macAddress: descriptionJson.macAddress
        };
        if (
          this.state[devices].filter(device => device.ipAddress === ip)
            .length <= 0
        ) {
          this.setState({
            [devices]: [...this.state[devices], validDevice]
          });
        }
      }
    } catch (e) {
      this.setState({
        [devices]: this.state[devices].filter(device => {
          return device.ipAddress !== ip;
        })
      });
      if (showMessage) {
        const message = "Can't find device.";
        this.props.sendMessage(message);
      }
    } finally {
      this.setState({ scanCompleted: this.state.scanCompleted + 1 });
    }
  };

  ScanProgress(disabled = false, value = 0) {
    if (disabled) {
      return <React.Fragment />;
    } else {
      return (
        <React.Fragment>
          <LinearProgress
            variant="determinate"
            value={value}
            color="secondary"
          />
        </React.Fragment>
      );
    }
  }

  RenderDevices(devices) {
    const linkTo = ip => "/device/" + ip;
    const dividerKey = ip => {
      return "nav-divider-" + ip.split(".").join("-");
    };
    const deviceTitle = device => {
      const name = device.name || "Untitled";
      const model = device.model.startsWith("Zive")
        ? device.model
            .split(" ")
            .slice(1)
            .join(" ")
        : device.model;
      return name === "Untitled" ? model : name;
    };
    const deviceDesc = device => {
      const name = device.name || "Untitled";
      const model = device.model.startsWith("Zive")
        ? device.model
            .split(" ")
            .slice(1)
            .join(" ")
        : device.model;
      const ip = device.ipAddress;
      return name === "Untitled" ? ip : model + " | " + ip;
    };
    const sorted = devices.sort(function(a, b) {
      const a_ip = a.ipAddress
        .split(".")
        .map(num => `000${num}`.slice(-3))
        .join("");
      const b_ip = b.ipAddress
        .split(".")
        .map(num => `000${num}`.slice(-3))
        .join("");
      return a_ip - b_ip;
    });
    return sorted.map(device => (
      <React.Fragment key="section-to-device-list-nav">
        <Divider variant="inset" key={dividerKey(device.ipAddress)} />
        <ListItemLink
          nested
          primary={deviceTitle(device)}
          secondary={deviceDesc(device)}
          to={linkTo(device.ipAddress)}
        />
      </React.Fragment>
    ));
  }

  componentDidMount = () => {
    this.getLocalIPAddressAsync();
  };

  render() {
    const { classes, notified } = this.props;
    const { localIP, localDevices, remoteDevices, knownDevice } = this.state;
    const { isLocalScan, isRemoteScan, scanCompleted, scanTotal } = this.state;

    // progress in scanning
    const isScanning = scanTotal > 0 && scanCompleted < scanTotal;
    const isLocalScanning = isLocalScan && isScanning;
    const isRemoteScanning = isRemoteScan && isScanning;
    const completed = isScanning ? (scanCompleted * 100) / scanTotal : 0;

    // [todo] we need more elegant way
    const openGettingStartedContents =
      this.props.location.pathname === "/" ||
      this.props.location.pathname.indexOf("getting-started") >= 0;
    const openUtilitiesContents =
      this.props.location.pathname.indexOf("utilities") >= 0;
    return (
      <React.Fragment key="section-to-list-nav-contents">
        <Divider key="nav-first-divider" />
        <GettingStartedContents openImmediately={openGettingStartedContents} />
        <Divider key="nav-second-divider" />
        <Tooltip
          title={`Scan local devices of ${localIP}`}
          aria-label="Scan local devices"
          enterDelay={300}
        >
          <ListItem
            button
            dense
            key="nav-local-devices"
            onClick={this.handleLocalClick}
            disabled={isScanning}
          >
            <ListItemIcon>
              <Badge
                color="secondary"
                badgeContent={localDevices.length}
                invisible={localDevices.length < 1}
                classes={{ badge: classes.badge }}
              >
                <DeviceHubIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText
              inset
              primary="My Devices"
              secondary={
                isLocalScanning
                  ? "scanning: " + scanCompleted + "/" + scanTotal
                  : localDevices.length
                  ? localDevices.length === 1
                    ? "1 device found"
                    : localDevices.length + " devices found"
                  : "no devices found"
              }
            />
          </ListItem>
        </Tooltip>
        {this.ScanProgress(!isLocalScanning, completed)}
        <Collapse in={true} timeout="auto" unmountOnExit>
          <List component="nav-local-device-list" disablePadding>
            {this.RenderDevices(localDevices)}
          </List>
        </Collapse>
        <Divider key="nav-third-divider" />
        <Tooltip
          title="Scan remote devices"
          aria-label="Scan remote devices"
          enterDelay={300}
        >
          <ListItem
            button
            dense
            key="nav-remote-devices"
            onClick={this.handleRemoteClick}
            disabled={isScanning}
          >
            <ListItemIcon>
              <Badge
                color="secondary"
                badgeContent={remoteDevices.length}
                invisible={remoteDevices.length < 1}
                classes={{ badge: classes.badge }}
              >
                <HubSpotIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText
              inset
              primary="Remote Devices"
              secondary={
                isRemoteScanning
                  ? "scanning: " + scanCompleted + "/" + scanTotal
                  : remoteDevices.length
                  ? remoteDevices.length === 1
                    ? "1 device found"
                    : remoteDevices.length + " devices found"
                  : "no devices found"
              }
            />
          </ListItem>
        </Tooltip>
        {this.ScanProgress(!isRemoteScanning, completed)}
        <Collapse in={true} timeout="auto" unmountOnExit>
          <List component="nav-remote-device-list" disablePadding>
            {this.RenderDevices(remoteDevices)}
          </List>
        </Collapse>
        <Divider key="nav-end-devices-divider" />
        <UtilityContents openImmediately={openUtilitiesContents} />
        <Divider key="nav-last-divider" />
        <FabAddDevice
          knownDevice={knownDevice}
          onClick={this.handleAddKnownDevice}
          disabled={isScanning}
          moveUp={notified}
        />
      </React.Fragment>
    );
  }
}

AppDrawerContents.propTypes = {
  classes: PropTypes.object.isRequired,
  notified: PropTypes.bool.isRequired,
  sendMessage: PropTypes.func.isRequired
};

export default compose(
  connect(state => ({
    reduxTitle: state.title
  })),
  withRouter,
  withStyles(styles)
)(AppDrawerContents);
