import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
// controls
import ListItemText from "@material-ui/core/ListItemText";

const styles = theme => ({
  bold: {
    fontWeight: theme.typography.fontWeightMedium
  }
});

class ListItemBoldText extends React.Component {
  render() {
    const { classes, primary, secondary } = this.props;
    return (
      <ListItemText
        primary={primary}
        secondary={secondary}
        classes={{
          primary: classNames([classes.bold])
        }}
      />
    );
  }
}

ListItemBoldText.propTypes = {
  classes: PropTypes.object.isRequired,
  primary: PropTypes.string,
  secondary: PropTypes.string
};

export default withStyles(styles)(ListItemBoldText);
