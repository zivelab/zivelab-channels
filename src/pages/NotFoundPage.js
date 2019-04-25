import "../bootstrap";
// --- Post bootstrap -----
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";

import AppContent from "../modules/components/AppContent";
import Markdown from "../modules/components/Markdown";
import Page from "../docs/pages/notFound.md";

import { changeAbout } from "../modules/redux/actions";
import { isEmpty } from "../modules/utils/object";
import compose from "../modules/utils/compose";

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

  componentDidUpdate(prevProps, prevState) {
    const { reduxAbout } = prevProps;
    if (!isEmpty(reduxAbout)) {
      this.props.dispatchAbout({});
    }
  }

  componentDidMount() {
    fetch(Page)
      .then(res => res.text())
      .then(md => {
        this.setState({ md });
      });
  }

  defaultLink = props => <Link to="/getting-started/about" {...props} />;

  render() {
    const { classes } = this.props;
    const { md } = this.state;
    return (
      <AppContent className={classes.root} title="Not Found Page">
        <Markdown className={classes.markdown} markdown={md} />
        <Button
          component={this.defaultLink}
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
  reduxAbout: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  reduxAbout: state.about
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ dispatchAbout: changeAbout }, dispatch);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(NotFoundPage);
