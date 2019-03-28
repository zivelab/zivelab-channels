import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import DocumentTitle from "react-document-title";
import { connect } from "react-redux";
import { ACTION_TYPES } from "../constants";
import compose from "../utils/compose";

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

function dispatchTitle(title, props) {
  props.dispatch({
    type: ACTION_TYPES.TITLE_CHANGE,
    payload: {
      title
    }
  });
}

function AppContent(props) {
  const { className, classes, title, children } = props;
  const docTitle = title ? title + " - Zive Channels" : "Zive Channels";
  dispatchTitle(docTitle, props);
  return (
    <DocumentTitle title={docTitle}>
      <main className={clsx(classes.root, className)}>{children}</main>
    </DocumentTitle>
  );
}

AppContent.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default compose(
  connect(state => ({
    reduxTitle: state.title
  })),
  withStyles(styles)
)(AppContent);
