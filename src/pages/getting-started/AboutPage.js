import "../../bootstrap";
// --- Post bootstrap -----
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import AppContent from "../../modules/components/AppContent";
import Markdown from "../../modules/components/Markdown";
import Page from "../../docs/pages/getting-started/about.md";

import { isEmpty } from "../../modules/utils/object";
import { changeAbout } from "../../modules/redux/actions";

class AboutPage extends Component {
  state = {
    md: ""
  };

  componentDidUpdate(prevProps, prevState) {
    const { reduxAbout } = prevProps;
    if (!isEmpty(reduxAbout)) {
      this.props.changeAbout({});
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
    const { md } = this.state;
    return (
      <AppContent title="About">
        <Markdown markdown={md} />
      </AppContent>
    );
  }
}

AboutPage.propTypes = {
  reduxAbout: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  reduxAbout: state.about
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeAbout }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutPage);
