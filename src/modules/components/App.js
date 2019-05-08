import "../../bootstrap";
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
import { bindActionCreators } from "redux";

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
import compose from "../utils/compose";
import { changeTheme } from "../redux/actions";

// Components
import AboutButton from "./AboutButton";
import AppDrawer from "./AppDrawer";
import Banners from "./Banners";
import ConfigureButton from "./ConfigureButton";
import Notifier from "./Notifier";
import OpenInNewButton from "./OpenInNewButton";

// Pages
import AboutPage from "../../pages/getting-started/AboutPage";
import DevicePage from "../../pages/DevicePage";
import LinearRegressionPage from "../../pages/getting-started/utilities/LinearRegressionPage";
import NotFoundPage from "../../pages/NotFoundPage";

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
    transition: theme.transitions.create("width"),
    "@media print": {
      position: "absolute"
    }
  },
  appBarShift: {
    [theme.breakpoints.up("lg")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  drawer: {
    [theme.breakpoints.up("lg")]: {
      flexShrink: 0,
      width: drawerWidth
    }
  },
  navIconHide: {
    [theme.breakpoints.up("lg")]: {
      display: "none"
    }
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
    
    ZiveLab-Channels
`,
    "font-family:monospace;color:#1976d2;font-size:12px;"
  );
}

class App extends React.Component {
  state = {
    mobileOpen: false
  };

  handleDrawerOpen = () => {
    this.setState({ mobileOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ mobileOpen: false });
  };

  togglePaletteType = () => {
    const paletteType =
      this.props.reduxTheme.paletteType === "light" ? "dark" : "light";
    document.cookie = `paletteType=${paletteType};path=/;max-age=31536000`;

    this.props.changeTheme(paletteType);
  };

  devicePage = ({ match: { params } }) => {
    return <DevicePage ipAddress={params.id} />;
  };

  aboutPage = () => {
    return <AboutPage />;
  };

  linearRegressionPage = () => {
    return <LinearRegressionPage />;
  };

  notFoundPage = () => {
    return <NotFoundPage />;
  };

  render() {
    const { classes, reduxTheme, reduxTitle, reduxAbout } = this.props;
    const { mobileOpen } = this.state;
    const title = reduxTitle || "Zive Channels";
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className={classes.root}>
          <CssBaseline />
          <Banners />
          <AppBar
            position="fixed"
            className={classNames(classes.appBar, classes.appBarShift)}
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classes.navIconHide}
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
              <AboutButton about={reduxAbout} />
              <ConfigureButton about={reduxAbout} />
              <OpenInNewButton about={reduxAbout} />
              <IconButton
                color="inherit"
                onClick={this.togglePaletteType}
                aria-label="toggleTheme"
              >
                <Tooltip title="Toggle light/dark theme" enterDelay={300}>
                  {reduxTheme.paletteType === "light" ? (
                    <LightbulbOutlineIcon />
                  ) : (
                    <LightbulbFullIcon />
                  )}
                </Tooltip>
              </IconButton>
              <IconButton
                edge="end"
                component="a"
                color="inherit"
                href="https://github.com/zivelab/zivelab-channels"
                aria-label="github"
              >
                <Tooltip title="Github repository" enterDelay={300}>
                  <GithubIcon />
                </Tooltip>{" "}
              </IconButton>
            </Toolbar>
          </AppBar>
          <AppDrawer
            className={classes.drawer}
            onClose={this.handleDrawerClose}
            onOpen={this.handleDrawerOpen}
            mobileOpen={mobileOpen}
          />
          <main className={classNames(classes.content, classes.contentShift)}>
            <Switch>
              <Redirect exact path="/" to="/getting-started/about" />
              <Route
                exact
                path="/getting-started/about"
                component={this.aboutPage}
              />
              <Route
                exact
                path="/getting-started/utilities/linear-regression"
                component={this.linearRegressionPage}
              />
              <Route exact path="/my-device/:id" component={this.devicePage} />
              <Route
                exact
                path="/remote-device/:id"
                component={this.devicePage}
              />
              <Route component={this.notFoundPage} />
            </Switch>
          </main>
          <Notifier />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  reduxAbout: state.about,
  reduxTheme: state.theme,
  reduxTitle: state.title
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeTheme }, dispatch);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(App);
