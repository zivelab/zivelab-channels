import React, { Component } from "react";
import Markdown from "markdown-to-jsx";
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
    let { md } = this.state;
    return (
      <div className="post">
        <Markdown children={md} />
      </div>
    );
  }
}

export default GettingStartedPage;
