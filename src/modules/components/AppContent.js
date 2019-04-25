import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import compose from "../utils/compose";
import { changeTitle } from "../redux/actions";

const styles = theme => ({
  root: {
    flex: "1 1 100%",
    maxWidth: "100%",
    [theme.breakpoints.up("sm")]: {
      paddingRight: theme.spacing.unit * 1
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing.unit * 1,
      paddingRight: theme.spacing.unit * 5
    }
  }
});

class AppContent extends React.Component {
  getDocTitle = title => {
    return title ? title + " - Zive Channels" : "Zive Channels";
  };

  titleSideEffect = title => {
    document.title = title;
  };

  componentDidMount() {
    const docTitle = this.getDocTitle(this.props.title);
    this.titleSideEffect(docTitle);
  }

  componentDidUpdate() {
    const docTitle = this.getDocTitle(this.props.title);
    const { reduxTitle } = this.props;
    if (reduxTitle !== docTitle) {
      this.titleSideEffect(docTitle);
      this.props.dispatchTitle(docTitle);
    }
  }

  render() {
    const { className, classes, children } = this.props;
    return <div className={clsx(classes.root, className)}>{children}</div>;
  }
}

AppContent.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  reduxTitle: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  reduxTitle: state.title
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ dispatchTitle: changeTitle }, dispatch);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(AppContent);
