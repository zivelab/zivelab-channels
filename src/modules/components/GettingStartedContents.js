import React from "react";
import PropTypes from "prop-types";

// controls
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// components
import ListItemBoldText from "./ListItemBoldText";
import ListItemLink from "./ListItemLink";

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
          <ListItemBoldText primary="Getting Started" />
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
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
