import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

// controls
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

// Icons
import SettingsEthernet from "@material-ui/icons/SettingsEthernet";

// components
import ConfigureDialog from "./ConfigureDialog";

// functions
import compose from "../utils/compose";
import { isEmpty } from "../utils/object";

const styles = theme => ({});

class ConfigureButton extends React.Component {
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
    const { reduxAbout } = this.props;
    const { open } = this.state;

    return (
      !isEmpty(reduxAbout) && (
        <React.Fragment key="section-to-configure-ethernet">
          <Tooltip title="Configure Ethernet settings" enterDelay={300}>
            <IconButton
              color="inherit"
              onClick={this.handleClick}
              aria-label="about"
            >
              <SettingsEthernet />
            </IconButton>
          </Tooltip>
          <ConfigureDialog open={open} onClose={this.handleClose} />
        </React.Fragment>
      )
    );
  }
}

ConfigureButton.propTypes = {
  classes: PropTypes.object.isRequired,
  reduxAbout: PropTypes.object.isRequired
};

export default compose(
  connect(state => ({
    reduxAbout: state.about
  })),
  withStyles(styles)
)(ConfigureButton);
