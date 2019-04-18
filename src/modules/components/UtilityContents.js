import React from "react";
import PropTypes from "prop-types";

// controls
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

// components
import ListItemLink from "./ListItemLink";

// Icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const linearRegressionTo = "/utilities/linear-regression";

class UtilityContents extends React.Component {
  state = {
    open: this.props.openImmediately
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { open } = this.state;
    return (
      <React.Fragment key="nav-utilities">
        <ListItem button dense onClick={this.handleClick}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText inset primary="Utilities" />
          {open ? <ExpandLess color="action" /> : <ExpandMore color="action" />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Divider
            variant="inset"
            key="nav-utilities-linear-regression-divider"
          />
          <List component="div" disablePadding>
            <ListItemLink
              nested
              primary="Linear Regression"
              to={linearRegressionTo}
            />
          </List>
        </Collapse>
      </React.Fragment>
    );
  }
}

UtilityContents.propTypes = {
  openImmediately: PropTypes.bool
};

export default UtilityContents;
