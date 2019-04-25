import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

// controls
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";

// Icons
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

// Components
import AppDrawerContents from "./AppDrawerContents";

// functions
import compose from "../utils/compose";

const drawerWidth = 240;
const styles = theme => ({
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
  }
});

class AppDrawer extends React.Component {
  render() {
    const { classes, open, reduxTheme, toggleDrawer } = this.props;
    return (
      <nav>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={toggleDrawer(false)}>
              {reduxTheme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <AppDrawerContents />
        </Drawer>
      </nav>
    );
  }
}

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  reduxTheme: state.theme
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(AppDrawer);
