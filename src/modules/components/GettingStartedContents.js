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
import AppsIcon from "@material-ui/icons/Apps";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const aboutTo = "/getting-started/about";

class GettingStartedContents extends React.Component {
  state = {
    open: this.props.openImmediately
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { open } = this.state;
    return (
      <React.Fragment key="section-getting-started-nav">
        <ListItem button dense onClick={this.handleClick}>
          <ListItemIcon>
            <AppsIcon />
          </ListItemIcon>
          <ListItemText inset primary="Getting Started" />
          {open ? <ExpandLess color="action" /> : <ExpandMore color="action" />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Divider variant="inset" key="nav-getting-started-about-divider" />
          <List component="div" disablePadding>
            <ListItemLink nested primary="About" to={aboutTo} />
          </List>
        </Collapse>
      </React.Fragment>
    );
  }
}

GettingStartedContents.propTypes = {
  openImmediately: PropTypes.bool
};

export default GettingStartedContents;
