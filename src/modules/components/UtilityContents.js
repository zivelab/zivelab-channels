import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// controls
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

// components
import LinkListItemText from "./LinkListItemText";

// Icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const linearRegressionKey = "linear-regression-nav";
const linearRegressionTo = "/linear-regression";
const linearRegressionLink = props => (
  <Link to={linearRegressionTo} {...props} />
);

class UtilityContents extends React.Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes } = this.props;
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
            <ListItem
              button
              dense
              className={classes.nested}
              key={linearRegressionKey}
              component={linearRegressionLink}
            >
              <LinkListItemText
                primary="Linear Regression"
                href={linearRegressionTo}
              />
            </ListItem>
          </List>
        </Collapse>
      </React.Fragment>
    );
  }
}

UtilityContents.propTypes = {
  classes: PropTypes.object.isRequired
};

export default UtilityContents;
