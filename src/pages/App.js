import "../bootstrap";
// --- Post bootstrap -----
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";

// controls
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

// Icons
import GithubIcon from "@material-ui/docs/svgIcons/GitHub";
import LightbulbOutlineIcon from "@material-ui/docs/svgIcons/LightbulbOutline";
import LightbulbFullIcon from "@material-ui/docs/svgIcons/LightbulbFull";
import MenuIcon from "@material-ui/icons/Menu";

// functions
import compose from "../modules/utils/compose";

// Components
import AppDrawer from "../modules/components/AppDrawer";
import Banners from "../modules/components/Banners";
import Notifications from "../modules/components/Notifications";

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
  title: {
    marginLeft: theme.spacing.unit * 2,
    flex: "0 1 auto"
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
  }
});

if (process.browser) {
  // eslint-disable-next-line no-console
  console.log(
    `%c
    
    ███████╗██╗██╗   ██╗███████╗██╗      █████╗ ██████╗ 
    ╚══███╔╝██║██║   ██║██╔════╝██║     ██╔══██╗██╔══██╗
      ███╔╝ ██║██║   ██║█████╗  ██║     ███████║██████╔╝
     ███╔╝  ██║╚██╗ ██╔╝██╔══╝  ██║     ██╔══██║██╔══██╗
    ███████╗██║ ╚████╔╝ ███████╗███████╗██║  ██║██████╔╝
    ╚══════╝╚═╝  ╚═══╝  ╚══════╝╚══════╝╚═╝  ╚═╝╚═════╝ 

    Tip: you can access the documentation \`theme\` object directly in the console.
`,
    "font-family:monospace;color:#1976d2;font-size:12px;"
  );
}

class App extends React.Component {
  queue = [];

  state = {
    openDrawer: false,
    openMessage: false,
    messageInfo: {}
  };

  toggleDrawer = open => () => {
    this.setState({ openDrawer: open });
  };

  togglePaletteType = () => {
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

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        openMessage: true
      });
    }
  };

  sendMessage = message => {
    this.queue.push({
      message,
      key: new Date().getTime()
    });

    if (this.state.openMessage) {
      this.setState({ openMessage: false });
    } else {
      this.processQueue();
    }
  };

  handleMessageClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ openMessage: false });
  };

  handleMessageExited = () => {
    this.processQueue();
  };

  channelPage = ({ match: { params } }) => {
    return <ChannelPage ipAddress={params.id} />;
  };

  gettingStartedPage = () => {
    return <GettingStartedPage />;
  };

  render() {
    const { classes, reduxTheme, reduxTitle } = this.props;
    const { openDrawer, openMessage, messageInfo } = this.state;
    const title = reduxTitle || "Zive Channels";
    console.log("v0.1.0");
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className={classes.root}>
          <CssBaseline />
          <Banners />
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
              {title !== null && (
                <Typography
                  className={classes.title}
                  variant="h6"
                  color="inherit"
                  noWrap
                >
                  {title}
                </Typography>
              )}
              <div className={classes.grow} />
              <Tooltip title="Toggle theme" enterDelay={300}>
                <IconButton
                  color="inherit"
                  onClick={this.togglePaletteType}
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
          <AppDrawer
            open={openDrawer}
            sendMessage={this.sendMessage}
            toggleDrawer={this.toggleDrawer}
          />
          <main
            className={classNames(classes.content, {
              [classes.contentShift]: openDrawer
            })}
          >
            {/*<div className={classes.drawerHeader} />*/}
            <Switch>
              <Route
                exact
                path="/getting-started"
                component={this.gettingStartedPage}
              />
              <Route exact path="/device/:id" component={this.channelPage} />
              <Redirect path="*" exact to="/getting-started" />
            </Switch>
          </main>
          <Notifications
            open={openMessage}
            messageInfo={messageInfo}
            onClose={this.handleMessageClose}
            onExited={this.handleMessageExited}
          />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  reduxTheme: PropTypes.object.isRequired,
  reduxTitle: PropTypes.string.isRequired
};

export default compose(
  connect(state => ({
    reduxTheme: state.theme,
    reduxTitle: state.title
  })),
  withStyles(styles)
)(App);
