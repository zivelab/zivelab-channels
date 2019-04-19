import React from "react";
import PropTypes from "prop-types";

// controls
import Collapse from "@material-ui/core/Collapse";
// eslint-disable-next-line
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// eslint-disable-next-line
import ListItemIcon from "@material-ui/core/ListItemIcon";

// components
import ListItemBoldText from "./ListItemBoldText";
import ListItemLink from "./ListItemLink";

// Icons
// eslint-disable-next-line
import AppsIcon from "@material-ui/icons/Apps";

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
          {/*<ListItemIcon>
            <AppsIcon />
          </ListItemIcon>*/}
          <ListItemBoldText primary="Getting Started" />
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {/*<Divider variant="inset" key="nav-getting-started-about-divider" />*/}
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
