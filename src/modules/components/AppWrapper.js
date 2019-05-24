import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  StylesProvider,
  ThemeProvider,
  createGenerateClassName
} from "@material-ui/styles";
import { SnackbarProvider } from "notistack";

import Button from "@material-ui/core/Button";

import { lightTheme, darkTheme, setPrismTheme } from "./prism";
import getTheme from "../styles/getTheme";
import { getCookie } from "../utils/helpers";
import { changeTheme } from "../redux/actions";

const generateClassName = createGenerateClassName();

function themeSideEffect(reduxTheme) {
  setPrismTheme(reduxTheme.paletteType === "light" ? lightTheme : darkTheme);
  document.body.dir = reduxTheme.direction;
}

class AppWrapper extends React.Component {
  state = {};

  componentDidMount() {
    themeSideEffect(this.props.reduxTheme);

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    const { reduxTheme } = this.props;

    const paletteType = getCookie("paletteType");
    const paletteColors = getCookie("paletteColors");

    if (
      (paletteType && reduxTheme.paletteType !== paletteType) ||
      (paletteColors &&
        JSON.stringify(reduxTheme.paletteColors) !== paletteColors)
    ) {
      this.props.changeTheme(
        paletteType,
        paletteColors ? JSON.parse(paletteColors) : null
      );
    }
  }

  componentDidUpdate() {
    themeSideEffect(this.props.reduxTheme);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (typeof prevState.theme === "undefined") {
      return {
        prevProps: nextProps,
        theme: getTheme(nextProps.reduxTheme)
      };
    }

    const { prevProps } = prevState;

    if (
      nextProps.reduxTheme.paletteType !== prevProps.reduxTheme.paletteType ||
      nextProps.reduxTheme.paletteColors !==
        prevProps.reduxTheme.paletteColors ||
      nextProps.reduxTheme.direction !== prevProps.reduxTheme.direction
    ) {
      return {
        prevProps: nextProps,
        theme: getTheme(nextProps.reduxTheme)
      };
    }

    return null;
  }

  render() {
    const { children } = this.props;
    const { theme } = this.state;
    return (
      <StylesProvider generateClassName={generateClassName}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            maxSnack={1}
            action={
              <Button color="secondary" size="small">
                {"Dismiss"}
              </Button>
            }
          >
            {children}
          </SnackbarProvider>
        </ThemeProvider>
      </StylesProvider>
    );
  }
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

const mapStateToProps = state => ({
  reduxTheme: state.theme
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeTheme }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppWrapper);
