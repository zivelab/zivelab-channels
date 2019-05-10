import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import compose from "../utils/compose";
import { changeTitle } from "../redux/actions";

const styles = theme => ({
  root: {
    flex: "1 1 100%",
    width: "auto",
    padding: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 3
  },
  wrap: {
    width: "calc(100% - 48px)",
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  bottomSpacer: {
    marginBottom: 100
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
      this.props.changeTitle(docTitle);
    }
  }

  render() {
    const { className, classes, children, responsive } = this.props;
    return (
      <div
        className={classNames(
          classes.root,
          classes.bottomSpacer,
          { [classes.wrap]: responsive },
          className
        )}
      >
        {children}
      </div>
    );
  }
}

AppContent.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  responsive: PropTypes.bool
};

AppContent.defaultProps = {
  responsive: false
};

const mapStateToProps = state => ({
  reduxTitle: state.title
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeTitle }, dispatch);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(AppContent);
