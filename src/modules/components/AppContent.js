import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flex: "1 1 100%",
    maxWidth: "100%",
    [theme.breakpoints.up("sm")]: {
      paddingRight: theme.spacing.unit * 1
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing.unit * 1,
      paddingRight: theme.spacing.unit * 5
    }
  }
});

function AppContent(props) {
  const { className, classes, children } = props;
  return <main className={clsx(classes.root, className)}>{children}</main>;
}

AppContent.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string
};

export default withStyles(styles)(AppContent);
