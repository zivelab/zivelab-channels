import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

// controls
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import LinearProgress from "@material-ui/core/LinearProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

// Icons
import DeviceHubIcon from "@material-ui/icons/DeviceHub";
import HubSpotIcon from "../icons/HubSpot";
import RefreshIcon from "@material-ui/icons/Refresh";

// Components
import ListItemBoldText from "./ListItemBoldText";
import ListItemLink from "./ListItemLink";

const styles = theme => ({
  leaf: {
    fontWeight: theme.typography.fontWeightMedium
  },
  badge: {
    top: "100%",
    right: -3,
    border: `2px solid ${
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[900]
    }`
  }
});

class DeviceContents extends React.Component {
  state = {
    open: this.props.openImmediately
  };

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.devices) !== JSON.stringify(prevProps.devices)
    ) {
      if (this.props.remote) {
        document.cookie = `remoteDevices=${JSON.stringify(
          this.props.devices
        )};path=/;max-age=31536000`;
      } else {
        document.cookie = `myDevices=${JSON.stringify(
          this.props.devices
        )};path=/;max-age=31536000`;
      }
    }
  }

  handleClick = () => {
    if (this.props.devices.length < 1) {
      this.handleScan();
    } else {
      this.setState(state => ({ open: !state.open }));
    }
  };

  handleScan = () => {
    this.setState(state => ({ open: true }));
    this.props.onScan();
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

  RenderDevices = () => {
    const { remote, devices } = this.props;
    const linkTo = ip => (remote ? "/remote-device/" + ip : "/my-device/" + ip);
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
  };

  getHeader = () => {
    const { devices, remote } = this.props;
    const isEmpty = devices.length < 1;
    if (remote) {
      return isEmpty ? "Scan Remote Devices" : "Remote Devices";
    } else {
      return isEmpty ? "Scan My Devices" : "My Devices";
    }
  };

  renderScanButton = scanning => {
    const { devices } = this.props;
    const isEmpty = devices.length < 1;
    return (
      !isEmpty && (
        <ListItemSecondaryAction>
          <IconButton
            color="default"
            disabled={scanning}
            onClick={this.handleScan}
          >
            <RefreshIcon fontSize="small" />
          </IconButton>
        </ListItemSecondaryAction>
      )
    );
  };

  render() {
    const { classes } = this.props;
    const { devices, remote } = this.props;
    const { isScanning, scanCompleted, scanTotal } = this.props;
    const { open } = this.state;

    // progress in scanning
    const scanning = isScanning && scanTotal > 0 && scanCompleted < scanTotal;
    const completed = scanning ? (scanCompleted * 100) / scanTotal : 0;
    return (
      <React.Fragment key="section-devices-nav">
        <ListItem button dense onClick={this.handleClick} disabled={scanning}>
          <ListItemIcon>
            <Badge
              color="secondary"
              badgeContent={devices.length}
              invisible={devices.length < 1}
              classes={{ badge: classes.badge }}
            >
              {remote ? <HubSpotIcon /> : <DeviceHubIcon />}
            </Badge>
          </ListItemIcon>
          <ListItemBoldText
            primary={this.getHeader()}
            secondary={
              scanning
                ? "scanning: " + scanCompleted + "/" + scanTotal
                : devices.length
                ? devices.length === 1
                  ? "1 device found"
                  : devices.length + " devices found"
                : "no devices found"
            }
          />
          {this.renderScanButton(scanning)}
        </ListItem>
        {this.ScanProgress(!scanning, completed)}
        <Collapse in={open} timeout="auto" unmountOnExit>
          {devices.length > 1 && (
            <Divider variant="inset" key="nav-devices-divider" />
          )}
          <List component="nav-device-list" disablePadding>
            {this.RenderDevices(devices)}
          </List>
        </Collapse>
      </React.Fragment>
    );
  }
}

DeviceContents.defaultProps = {
  remote: false
};

DeviceContents.propTypes = {
  classes: PropTypes.object.isRequired,
  openImmediately: PropTypes.bool,
  remote: PropTypes.bool,
  myIP: PropTypes.string,
  devices: PropTypes.array.isRequired,
  onScan: PropTypes.func,
  isScanning: PropTypes.bool,
  scanCompleted: PropTypes.number,
  scanTotal: PropTypes.number
};

export default withStyles(styles)(DeviceContents);
