import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import compose from "../utils/compose";
import MarkdownElement from "./MarkdownElement";
import { getContents } from "../utils/parseMarkdown";

const styles = theme => ({
  markdownElement: {
    marginTop: theme.spacing.unit * 2, //theme.spacing(2),
    marginBottom: theme.spacing.unit * 2, //theme.spacing(2),
    padding: (0, theme.spacing.unit) //theme.spacing(0, 1)
  }
});

function Markdown(props) {
  const { classes, markdown } = props;
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

Markdown.propTypes = {
  classes: PropTypes.object.isRequired,
  markdown: PropTypes.string
};

export default compose(withStyles(styles))(Markdown);
