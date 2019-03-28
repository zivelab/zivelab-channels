import "../bootstrap";
// --- Post bootstrap -----
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

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
  constructor(props) {
    super(props);

    this.state = {
      md: ""
    };
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
    let { md } = this.state;
    return (
      <AppContent className={classes.root}>
        <Markdown className={classes.markdown} markdown={md} />
      </AppContent>
    );
  }
}

GettingStartedPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GettingStartedPage);
