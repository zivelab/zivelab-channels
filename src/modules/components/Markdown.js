import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import MarkdownElement from "./MarkdownElement";
import { getContents } from "../utils/parseMarkdown";

const styles = theme => ({
  markdownElement: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0, 1) // (0, theme.spacing.unit)
  }
});

class Markdown extends React.Component {
  render() {
    const { classes, markdown } = this.props;
    const contents = markdown ? getContents(markdown) : [""];
    return (
      <div>
        {contents.map(content => {
          return (
            <MarkdownElement
              className={classes.markdownElement}
              key={content}
              text={content}
            />
          );
        })}
      </div>
    );
  }
}

Markdown.propTypes = {
  classes: PropTypes.object.isRequired,
  markdown: PropTypes.string
};

export default withStyles(styles)(Markdown);
