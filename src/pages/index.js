import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Snackbar from "@material-ui/core/Snackbar";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

import ReactJson from "react-json-view";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CloseIcon from "@material-ui/icons/Close";
import DeviceHubIcon from "@material-ui/icons/DeviceHub";
import MenuIcon from "@material-ui/icons/Menu";
import TabletIcon from "@material-ui/icons/Tablet";

import {
  getLocalIPAddress,
  getFullRange,
  isZiveDevice
} from "../utilities/utilities.js";

import GettingStartedPage from "./GettingStartedPage.js";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  badgeMargin: {
    margin: theme.spacing.unit * 2
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});

const gettingStartedKey = "getting-started-nav";

class Index extends React.Component {
  state = {
    openDrawer: false,
    openSnackbar: false,
    snackbarMessage: "",
    selectedKey: gettingStartedKey,

    localIP: null,
    localDevices: [],
    remoteDevices: [],

    scanDevices: false,
    isLocalScan: false,
    isRemoteScan: false,
    scanCompleted: 0,
    scanTotal: 0
  };

  toggleDrawer = open => () => {
    this.setState({ openDrawer: open });
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ openSnackbar: false });
  };

  handleListItemClick = (event, key) => {
    this.setState({ selectedKey: key });
  };

  handleLocalClick = () => {
    this.findDevices(true);
  };

  handleRemoteClick = () => {
    this.findDevices(false);
  };

  async findDevices(isLocal) {
    try {
      const message = isLocal
        ? "Scanning local devices..."
        : "Scanning remote devices...";
      this.setState({ openSnackbar: true, snackbarMessage: message });
      if (!isLocal && !this.state.localIP) {
        await this.getLocalIPAddressAsync();
      }
      const baseIP = isLocal ? "169.254.17.1" : this.state.localIP;
      const scanDevices = getFullRange(baseIP);
      this.setState({
        isLocalScan: isLocal,
        isRemoteScan: !isLocal,
        scanCompleted: 0,
        scanTotal: scanDevices.length
      });
      scanDevices.map(async ip => {
        await this.loadAboutAsync(ip);
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getLocalIPAddressAsync() {
    try {
      const ip = await getLocalIPAddress();
      if (ip) {
        this.setState({
          localIP: ip
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async loadAboutAsync(ip) {
    // ip should be a valid IP address.
    const isLocal = ip.split(".").slice(0, 1) === "169";
    const devices = isLocal ? "localDevices" : "remoteDevices";
    try {
      const aboutURL = "http://" + ip + "/about";
      const aboutRequest = new Request(aboutURL);
      const aboutFetch = await fetch(aboutRequest);
      const aboutJson = await aboutFetch.json();
      if (aboutJson) {
        if (!isZiveDevice(aboutJson.MacAddress)) return;
        const validDevice = {
          name: aboutJson.Model || aboutJson.model,
          serialNumber: aboutJson.SerialNumber || aboutJson.serialNumber,
          ipAddress: aboutJson.IPAddress || aboutJson.ipAddress,
          macAddress: aboutJson.MacAddress || aboutJson.macAddress,
          about: aboutJson
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
      const invalidDevice = this.state[devices].filter(
        device => device.ipAddress === ip
      );
      this.setState({
        [devices]: this.state[devices].filter(function(device) {
          return device !== invalidDevice;
        })
      });
    } finally {
      this.setState({ scanCompleted: this.state.scanCompleted + 1 });
    }
  }

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

  ListDevices(devices) {
    const linkTo = ip => "/device/" + ip;
    const deviceLink = ip => props => <Link to={linkTo(ip)} {...props} />;
    if (devices) {
      return devices.map(device => (
        <React.Fragment>
          <Divider />
          <ListItem
            button
            key={device.ipAddress}
            component={deviceLink(device.ipAddress)}
            selected={this.state.selectedKey === device.ipAddress}
            onClick={event => this.handleListItemClick(event, device.ipAddress)}
          >
            <ListItemIcon>
              <TabletIcon />
            </ListItemIcon>
            <ListItemText primary={device.name} secondary={device.ipAddress} />
          </ListItem>
        </React.Fragment>
      ));
    } else {
      return <React.Fragment />;
    }
  }

  getAbout(ip) {
    if (!ip) return null;
    const isLocal = ip.split(".").slice(0, 1) === "169";
    const devices = isLocal ? "localDevices" : "remoteDevices";
    const matchedDevice = this.state[devices].find(function(device) {
      return device.ipAddress === ip;
    });
    return matchedDevice.about;
  }

  GettingStartedTitle = () => (
    <Typography variant="h6" color="inherit" noWrap>
      ZiveLab Channels
    </Typography>
  );
  GettingStartedHome = () => <GettingStartedPage />;

  DeviceTitle = ({ match: { params } }) => (
    <Typography variant="h6" color="inherit" noWrap>
      Device at {params.id}
    </Typography>
  );
  DeviceHome = ({ match: { params } }) => {
    const about = this.getAbout(params.id);
    const aboutRef = {
      model: "Zive ZIM-SIF",
      description: "Impedance Meter",
      frequencyRanges: "4kHz to 0.1Hz",
      voltageRanges: "1000V/100V",
      currentRanges: "2A/400mA/200mA...400uA",
      temperatureSensor: "PT1000",
      macAddress: "00:1B:C5:08:11:00",
      ipAddress: "192.168.0.6",
      subnetMask: "255.255.255.0",
      router: "192.168.0.1",
      port: 2000,
      sifBoard: "1.0.0.0",
      sifFirmware: "1.0.1.1",
      sifSerialNumber: "IF19030001A",
      zimBoard: "1.1.0.0",
      zimFirmware: "0.0.1.0",
      zimSerialNumber: "IM19030001A"
    };
    return (
      <React.Fragment>
        <h1>Device at {params.id} will be rendered here</h1>
        <ReactJson src={about} displayDataTypes={false} />
        <h3>ref</h3>
        <ReactJson src={aboutRef} displayDataTypes={false} />
      </React.Fragment>
    );
  };

  gettingStartedLink = props => <Link to="/" {...props} />;

  render() {
    const { classes, theme } = this.props;
    const { openDrawer, openSnackbar, snackbarMessage } = this.state;
    const { localIP, localDevices, remoteDevices } = this.state;
    const { isLocalScan, isRemoteScan, scanCompleted, scanTotal } = this.state;

    // progress in scanning
    const isScanning = scanTotal > 0 && scanCompleted < scanTotal;
    const isLocalScanning = isLocalScan && isScanning;
    const isRemoteScanning = isRemoteScan && isScanning;
    const completed = isScanning ? (scanCompleted * 100) / scanTotal : 0;
    return (
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: openDrawer
            })}
          >
            <Toolbar disableGutters={!openDrawer}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.toggleDrawer(true)}
                className={classNames(
                  classes.menuButton,
                  openDrawer && classes.hide
                )}
              >
                <MenuIcon />
              </IconButton>
              <Switch>
                <Route path="/" exact component={this.GettingStartedTitle} />
                <Route path="/device/:id" exact component={this.DeviceTitle} />
              </Switch>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={openDrawer}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.toggleDrawer(false)}>
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            <ListItem
              button
              key={gettingStartedKey}
              component={this.gettingStartedLink}
              selected={this.state.selectedKey === gettingStartedKey}
              onClick={event =>
                this.handleListItemClick(event, gettingStartedKey)
              }
            >
              <ListItemText primary="Getting Started" />
            </ListItem>
            <Divider />
            <Tooltip
              title="Click to scan local devices"
              aria-label="Click to scan local devices"
            >
              <ListItem
                button
                key="local-devices-nav"
                onClick={this.handleLocalClick}
                disabled={isScanning}
              >
                <ListItemIcon>
                  <DeviceHubIcon />
                </ListItemIcon>
                <ListItemText
                  primary="My Devices"
                  secondary={
                    isLocalScanning
                      ? "scanning... " + scanCompleted + "/" + scanTotal
                      : localDevices.length
                      ? ""
                      : "no devices found"
                  }
                />
              </ListItem>
            </Tooltip>
            {this.ScanProgress(!isLocalScanning, completed)}
            {this.ListDevices(localDevices)}
            <Divider />
            <Tooltip
              title="Click to scan remote devices"
              aria-label="Click to scan remote devices"
            >
              <ListItem
                button
                key="remote-devices-nav"
                onClick={this.handleRemoteClick}
                disabled={isScanning}
              >
                <ListItemIcon>
                  <DeviceHubIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Remote Devices"
                  secondary={
                    isRemoteScanning
                      ? "scanning... " + scanCompleted + "/" + scanTotal
                      : remoteDevices.length
                      ? localIP
                      : "no devices found"
                  }
                />
              </ListItem>
            </Tooltip>
            {this.ScanProgress(!isRemoteScanning, completed)}
            {this.ListDevices(remoteDevices)}
            <Divider />
          </Drawer>
          <main
            className={classNames(classes.content, {
              [classes.contentShift]: openDrawer
            })}
          >
            <div className={classes.drawerHeader} />
            <Switch>
              <Route path="/" exact component={this.GettingStartedHome} />
              <Route path="/device/:id" exact component={this.DeviceHome} />
            </Switch>
          </main>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={openSnackbar}
            autoHideDuration={2000}
            onClose={this.handleSnackbarClose}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="message-id">{snackbarMessage}</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleSnackbarClose}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        </div>
      </Router>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles, { withTheme: true })(Index));
