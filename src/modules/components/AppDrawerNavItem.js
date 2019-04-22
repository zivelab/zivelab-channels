import React from "react";
import PropTypes from "prop-types";

// controls
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

// components
import ListItemBoldText from "./ListItemBoldText";
import ListItemLink from "./ListItemLink";

class AppDrawerNavItem extends React.Component {
  state = {
    open: this.props.openImmediately
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const {
      children,
      depth,
      icon,
      onClick,
      openImmediately,
      primary,
      secondary,
      to,
      ...other
    } = this.props;

    if (to) {
      return (
        <ListItemLink
          depth={depth}
          to={to}
          primary={primary}
          secondary={secondary}
          disableRipple
          {...other}
        />
      );
    }

    return (
      <>
        <ListItem button dense onClick={this.handleClick} {...other}>
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          <ListItemBoldText
            depth={depth}
            primary={primary}
            secondary={secondary}
          />
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children}
          </List>
        </Collapse>
      </>
    );
  }
}

AppDrawerNavItem.propTypes = {
  children: PropTypes.node,
  depth: PropTypes.number.isRequired,
  icon: PropTypes.element,
  onClick: PropTypes.func,
  openImmediately: PropTypes.bool,
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string,
  to: PropTypes.string
};

AppDrawerNavItem.defaultProps = {
  depth: 0,
  openImmediately: false
};

export default AppDrawerNavItem;
