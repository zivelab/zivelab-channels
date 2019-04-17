import React from "react";

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

const linearRegressionTo = "/linear-regression";

class UtilityContents extends React.Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { open } = this.state;
    return (
      <React.Fragment key="section-to-list-utilities-nav">
        <ListItem button dense onClick={this.handleClick}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText inset primary="Utilities" />
          {open ? <ExpandLess color="action" /> : <ExpandMore color="action" />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Divider variant="inset" key="nav-utilities-inner-divider" />
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

export default UtilityContents;
