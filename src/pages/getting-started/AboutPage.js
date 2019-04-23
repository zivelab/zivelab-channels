import "../../bootstrap";
// --- Post bootstrap -----
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import AppContent from "../../modules/components/AppContent";
import Markdown from "../../modules/components/Markdown";
import Page from "../../docs/pages/getting-started/about.md";

import compose from "../../modules/utils/compose";
import { isEmpty } from "../../modules/utils/object";
import { dispatchAbout } from "../../modules/redux/actions";

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

class AboutPage extends Component {
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

  render() {
    const { classes } = this.props;
    const { md } = this.state;
    return (
      <AppContent className={classes.root} title="About">
        <Markdown className={classes.markdown} markdown={md} />
      </AppContent>
    );
  }
}

AboutPage.propTypes = {
  classes: PropTypes.object.isRequired,
  reduxAbout: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  reduxAbout: state.about
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ dispatchAbout }, dispatch);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(AboutPage);
