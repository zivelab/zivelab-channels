import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import { connect } from "react-redux";

// controls
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

// Icons
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CloseIcon from "@material-ui/icons/Close";
import DeviceHubIcon from "@material-ui/icons/DeviceHub";
import GithubIcon from "@material-ui/docs/svgIcons/GitHub";
import LightbulbOutlineIcon from "@material-ui/docs/svgIcons/LightbulbOutline";
import LightbulbFullIcon from "@material-ui/docs/svgIcons/LightbulbFull";
import MenuIcon from "@material-ui/icons/Menu";
import TabletIcon from "@material-ui/icons/Tablet";

// functions
import compose from "../modules/utils/compose";
import {
  getLocalIPAddress,
  getFullRange,
  isZiveDevice
} from "../modules/utils/net";

// Components
import FabAddDevice from "../modules/components/FabAddDevice";

// Pages
import GettingStartedPage from "./GettingStartedPage";
import ChannelPage from "./ChannelPage";

import { ACTION_TYPES } from "../modules/constants";

const drawerWidth = 240;

const styles = theme => ({
  "@global": {
    strong: {
      fontWeight: theme.typography.fontWeightMedium
    }
  },

  root: {
    display: "flex"
  },
  grow: {
    flexGrow: 1
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
    marginLeft: -drawerWidth,
    marginTop: "32px"
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  markdown: {
    ...theme.typography.body1,
    padding: "0 8px",
    margin: "32px"
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
    knownDevice: "192.168.0.15",

    scanDevices: false,
    isLocalScan: false,
    isRemoteScan: false,
    scanCompleted: 0,
    scanTotal: 0
  };

  toggleDrawer = open => () => {
    this.setState({ openDrawer: open });
  };

  handleTogglePaletteType = () => {
    const paletteType =
      this.props.reduxTheme.paletteType === "light" ? "dark" : "light";
    document.cookie = `paletteType=${paletteType};path=/;max-age=31536000`;

    this.props.dispatch({
      type: ACTION_TYPES.THEME_CHANGE,
      payload: {
        paletteType
      }
    });
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

  handleAddKnownDevice = ip => {
    this.setState({ knownDevice: ip });
    this.scanKnownDevice(ip);
  };

  async scanKnownDevice(ip) {
    await this.loadAboutAsync(ip);
  }

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
        if (!isZiveDevice(aboutJson.macAddress)) return;
        const validDevice = {
          name: aboutJson.model,
          serialNumber: aboutJson.serialNumber,
          ipAddress: aboutJson.ipAddress,
          macAddress: aboutJson.macAddress,
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
    const listKey = ip => {
      return "nav-device-" + ip.split(".").join("-");
    };
    const dividerKey = ip => {
      return "nav-divider-" + ip.split(".").join("-");
    };
    if (devices) {
      return devices.map(device => (
        <React.Fragment>
          <Divider variant="inset" key={dividerKey(device.ipAddress)} />
          <ListItem
            button
            dense
            key={listKey(device.ipAddress)}
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
      Zive Channels
    </Typography>
  );

  ChannelTitle = ({ match: { params } }) => {
    const about = this.getAbout(params.id);
    const model = about.model.startsWith("Zive")
      ? about.model
          .split(" ")
          .slice(1)
          .join(" ")
      : about.model;
    const ip = about.ipAddress;
    return (
      <Typography variant="h6" color="inherit" noWrap>
        {model} ({ip}) - Zive Channels
      </Typography>
    );
  };

  channelPage = ({ match: { params } }) => {
    return (
      <React.Fragment>
        <ChannelPage ipAddress={params.id} />
      </React.Fragment>
    );
  };

  gettingStartedLink = props => <Link to="/" {...props} />;

  gettingStartedPage = () => {
    return (
      <React.Fragment>
        <GettingStartedPage classes={this.props} />
      </React.Fragment>
    );
  };

  componentDidMount = () => {
    this.getLocalIPAddressAsync();
  };

  render() {
    const { classes, reduxTheme } = this.props;
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
                edge="start"
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
                <Route path="/device/:id" exact component={this.ChannelTitle} />
              </Switch>
              <div className={classes.grow} />
              <Tooltip title="Toggle theme" enterDelay={300}>
                <IconButton
                  color="inherit"
                  onClick={this.handleTogglePaletteType}
                  aria-label="toggleTheme"
                >
                  {reduxTheme.paletteType === "light" ? (
                    <LightbulbOutlineIcon />
                  ) : (
                    <LightbulbFullIcon />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="Github repository" enterDelay={300}>
                <IconButton
                  edge="end"
                  component="a"
                  color="inherit"
                  href="https://github.com/zivelab/zivelab-channels"
                  aria-label="github"
                >
                  <GithubIcon />
                </IconButton>
              </Tooltip>
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
                {reduxTheme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </div>
            <Divider key="nav-first-divider" />
            <ListItem
              button
              dense
              key={gettingStartedKey}
              component={this.gettingStartedLink}
              selected={this.state.selectedKey === gettingStartedKey}
              onClick={event =>
                this.handleListItemClick(event, gettingStartedKey)
              }
            >
              <ListItemText primary="Getting Started" />
            </ListItem>
            <Divider key="nav-second-divider" />
            <Tooltip
              title="Click to scan local devices"
              aria-label="Click to scan local devices"
            >
              <ListItem
                button
                dense
                key="nav-local-devices"
                onClick={this.handleLocalClick}
                disabled={isScanning}
              >
                <ListItemIcon>
                  <DeviceHubIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Scan My Devices"
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
            <Divider key="nav-third-divider" />
            <Tooltip
              title="Click to scan remote devices"
              aria-label="Click to scan remote devices"
            >
              <ListItem
                button
                dense
                key="nav-remote-devices"
                onClick={this.handleRemoteClick}
                disabled={isScanning}
              >
                <ListItemIcon>
                  <DeviceHubIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Scan Remote Devices"
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
            <Divider key="nav-last-divider" />
            <FabAddDevice
              classes={classes}
              knownDevice={this.state.knownDevice}
              onClick={this.handleAddKnownDevice}
            />
          </Drawer>
          <main
            className={classNames(classes.content, {
              [classes.contentShift]: openDrawer
            })}
          >
            <div className={classes.drawerHeader} />
            <Switch>
              <Route path="/" exact component={this.gettingStartedPage} />
              <Route path="/device/:id" exact component={this.channelPage} />
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
  dispatch: PropTypes.func.isRequired,
  reduxTheme: PropTypes.object.isRequired
};

export default compose(
  connect(state => ({
    reduxTheme: state.theme
  })),
  withStyles(styles)
)(Index);
