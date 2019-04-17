import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

// controls
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

// functions
import compose from "../utils/compose";

const styles = theme => ({
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

class ListItemLink extends React.Component {
  renderLink = itemProps => <Link to={this.props.to} {...itemProps} />;

  render() {
    const { classes, nested } = this.props;
    const { icon, primary, secondary, to } = this.props;
    const active = this.props.location.pathname === to;
    return (
      <ListItem
        button
        dense
        component={this.renderLink}
        className={classNames({
          [classes.nested]: nested
        })}
      >
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText
          primary={primary}
          secondary={secondary}
          classes={{
            primary: classNames({
              [classes.active]: active
            })
          }}
        />
      </ListItem>
    );
  }
}

ListItemLink.propTypes = {
  classes: PropTypes.object.isRequired,
  nested: PropTypes.bool,
  icon: PropTypes.element,
  primary: PropTypes.string,
  secondary: PropTypes.string,
  to: PropTypes.string.isRequired
};

export default compose(
  withRouter,
  withStyles(styles)
)(ListItemLink);
