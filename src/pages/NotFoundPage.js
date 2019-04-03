import "../bootstrap";
// --- Post bootstrap -----
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { ACTION_TYPES } from "../modules/constants";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import compose from "../modules/utils/compose";
import { isEmpty } from "../modules/utils/object";

import AppContent from "../modules/components/AppContent";
import Markdown from "../modules/components/Markdown";
import Page from "../docs/pages/notFound.md";

const styles = theme => ({
  root: {
    marginBottom: 100
  },
  content: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    padding: (0, theme.spacing.unit * 2)
  },
  button: {
    marginTop: theme.spacing.unit * 4
  }
});

class NotFoundPage extends Component {
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

  componentWillMount() {
    fetch(Page)
      .then(res => res.text())
      .then(md => {
        this.setState({ md });
      });
  }

  gettingStartedLink = props => <Link to="/getting-started" {...props} />;

  render() {
    const { classes } = this.props;
    const { md } = this.state;
    // console.log(this.props.location.pathname);
    return (
      <AppContent className={classes.root} title="Not Found Page">
        <Markdown className={classes.markdown} markdown={md} />
        <Button
          component={this.gettingStartedLink}
          className={classes.button}
          variant="outlined"
          color="primary"
        >
          GET STARTED
        </Button>
      </AppContent>
    );
  }
}

NotFoundPage.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  reduxAbout: PropTypes.object.isRequired
};

export default compose(
  connect(state => ({
    reduxAbout: state.about
  })),
  withStyles(styles)
)(NotFoundPage);
