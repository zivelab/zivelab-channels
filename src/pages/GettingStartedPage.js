import "../bootstrap";
// --- Post bootstrap -----
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { ACTION_TYPES } from "../modules/constants";

import compose from "../modules/utils/compose";
import { isEmpty } from "../modules/utils/object";

import AppContent from "../modules/components/AppContent";
import Markdown from "../modules/components/Markdown";
import Page from "../docs/pages/gettingStarted/gettingStarted.md";

const styles = theme => ({
  root: {
    marginBottom: 100
  },
  markdown: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    padding: (0, theme.spacing.unit * 2)
  }
});

class GettingStartedPage extends Component {
  state = {
    md: ""
  };

  dispatchAbout = about => {
    this.props.dispatch({
      type: ACTION_TYPES.ABOUT_CHANGE,
      payload: {
        about
      }
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { reduxAbout } = prevProps;
    if (!isEmpty(reduxAbout)) {
      this.dispatchAbout({});
    }
  }

  componentDidMount() {
    fetch(Page)
      .then(res => res.text())
      .then(md => {
        this.setState({ md });
      });
  }

  render() {
    const { classes } = this.props;
    const { md } = this.state;
    return (
      <AppContent className={classes.root} title="Getting Started">
        <Markdown className={classes.markdown} markdown={md} />
      </AppContent>
    );
  }
}

GettingStartedPage.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  reduxAbout: PropTypes.object.isRequired
};

export default compose(
  connect(state => ({
    reduxAbout: state.about
  })),
  withStyles(styles)
)(GettingStartedPage);
