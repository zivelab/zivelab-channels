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

// Icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

// Pages
import LinearRegressionPage from "../../pages/LinearRegressionPage";

const linearRegressionKey = "linear-regression-nav";

class UtilityContents extends React.Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  linearRegressionLink = props => <Link to="/linear-regression" {...props} />;

  linearRegressionPage = () => {
    return <LinearRegressionPage />;
  };

  render() {
    const { classes, selectedKey, onClick } = this.props;
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
          <Divider variant="inset" key="nav-utilities-regression" />
          <List component="div" disablePadding>
            <ListItem
              button
              dense
              className={classes.nested}
              key={linearRegressionKey}
              component={this.linearRegressionLink}
              selected={selectedKey === linearRegressionKey}
              onClick={event => onClick(event, linearRegressionKey)}
            >
              <ListItemText primary="Linear Regression" />
            </ListItem>
          </List>
        </Collapse>
      </React.Fragment>
    );
  }
}

UtilityContents.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedKey: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default UtilityContents;
