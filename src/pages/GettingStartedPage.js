import React, { Component } from "react";
import Markdown from "../modules/components/Markdown";
import PropTypes from "prop-types";

import Page from "../docs/pages/gettingStarted/gettingStarted.md";

class GettingStartedPage extends Component {
  constructor(props) {
    super(props);

    this.state = { md: "" };
  }

  componentWillMount() {
    fetch(Page)
      .then(res => res.text())
      .then(md => {
        this.setState({ md });
      });
  }

  render() {
    const { classes } = this.props;
    console.log(this.props);
    let { md } = this.state;
    return (
      <React.Fragment>
        <Markdown className={classes.markdown}>{md}</Markdown>
      </React.Fragment>
    );
  }
}

GettingStartedPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default GettingStartedPage;
