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

// [TODO]
// Warning: Cannot update during an existing state transition (such as within `render`).
// Render methods should be a pure function of props and state.
//
// We have to find a way how to handle this warning.
// is it solved?
function dispatchTitle(props, title) {
  props.dispatch({
    type: ACTION_TYPES.TITLE_CHANGE,
    payload: {
      title
    }
  });
}

function AppContent(props) {
  const { className, classes, title, children, reduxTitle } = props;
  const docTitle = title ? title + " - Zive Channels" : "Zive Channels";
  if (docTitle !== reduxTitle) {
    dispatchTitle(props, docTitle);
  }
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
  title: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  reduxTitle: PropTypes.string.isRequired
};

export default compose(
  connect(state => ({
    reduxTitle: state.title
  })),
  withStyles(styles)
)(AppContent);
