import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

// controls
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

// Icons
import InfoIcon from "@material-ui/icons/Info";

// components
import AboutDialog from "./AboutDialog";

// functions
import compose from "../utils/compose";
import { isEmpty } from "../utils/object";

const styles = theme => ({});

class AboutButton extends React.Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const { reduxAbout, sendMessage } = this.props;
    const { open } = this.state;

    return (
      !isEmpty(reduxAbout) && (
        <React.Fragment key="section-to-show-about">
          <Tooltip title="Show about" enterDelay={300}>
            <IconButton
              color="inherit"
              onClick={this.handleClick}
              aria-label="about"
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>
          <AboutDialog
            open={open}
            onClose={this.handleClose}
            sendMessage={sendMessage}
          />
        </React.Fragment>
      )
    );
  }
}

AboutButton.propTypes = {
  classes: PropTypes.object.isRequired,
  reduxAbout: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired
};

export default compose(
  connect(state => ({
    reduxAbout: state.about
  })),
  withStyles(styles)
)(AboutButton);
