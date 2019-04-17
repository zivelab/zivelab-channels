import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

// controls
import ListItemText from "@material-ui/core/ListItemText";

// functions
import compose from "../utils/compose";

const styles = theme => ({
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium
  }
});

class LinkListItemText extends React.Component {
  render() {
    const { classes } = this.props;
    const { href } = this.props;
    const { primary, secondary } = this.props;
    const active = this.props.location.pathname === href;
    return (
      <ListItemText
        primary={primary}
        secondary={secondary}
        classes={{
          primary: classNames({
            [classes.active]: active
          })
        }}
      />
    );
  }
}

LinkListItemText.propTypes = {
  classes: PropTypes.object.isRequired,
  href: PropTypes.string.isRequired,
  primary: PropTypes.string,
  secondary: PropTypes.string
};

export default compose(
  withRouter,
  withStyles(styles)
)(LinkListItemText);
