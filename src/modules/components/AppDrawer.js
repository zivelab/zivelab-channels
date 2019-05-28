import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

// controls
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

// Components
import AppDrawerContents from "./AppDrawerContents";

// functions
import compose from "../utils/compose";

const drawerWidth = 240;
const styles = theme => ({
  paper: {
    width: drawerWidth
  },
  toolbarIe11: {
    display: "flex"
  },
  toolbar: {
    ...theme.mixins.toolbar,
    paddingLeft: theme.spacing(3),
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center"
  }
});

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

class AppDrawer extends React.Component {
  renderNavItems = () => {
    const { classes, onClose } = this.props;
    return (
      <div className={classes.nav}>
        <div className={classes.toolbarIe11}>
          <div className={classes.toolbar}>{/* TODO insert title here*/}</div>
        </div>
        {<AppDrawerContents onClick={onClose} />}
      </div>
    );
  };

  render() {
    const { classes, className, mobileOpen, onOpen, onClose } = this.props;
    return (
      <nav className={className} role="navigation" aria-label="Main navigation">
        <Hidden lgUp implementation="js">
          <SwipeableDrawer
            classes={{
              paper: clsx(classes.paper, "algolia-drawer")
            }}
            disableBackdropTransition={!iOS}
            variant="temporary"
            open={mobileOpen}
            onOpen={onOpen}
            onClose={onClose}
            ModalProps={{
              keepMounted: true
            }}
          >
            {this.renderNavItems()}
          </SwipeableDrawer>
        </Hidden>
        <Hidden mdDown implementation="css">
          <Drawer
            classes={{
              paper: classes.paper
            }}
            variant="permanent"
            open
          >
            {this.renderNavItems()}
          </Drawer>
        </Hidden>
      </nav>
    );
  }
}

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  mobileOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  reduxTheme: state.theme
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(AppDrawer);
