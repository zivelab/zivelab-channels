import React from "react";
import PropTypes from "prop-types";

// controls
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

// Icons
import SettingsEthernet from "@material-ui/icons/SettingsEthernet";

// components
import ConfigureDialog from "./ConfigureDialog";

// functions
import { isEmpty } from "../utils/object";

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
    const { about } = this.props;
    const { open } = this.state;

    return (
      !isEmpty(about) && (
        <>
          <Tooltip title="Configure Ethernet settings" enterDelay={300}>
            <IconButton
              color="inherit"
              onClick={this.handleClick}
              aria-label="about"
            >
              <SettingsEthernet />
            </IconButton>
          </Tooltip>
          <ConfigureDialog
            open={open}
            about={about}
            onClose={this.handleClose}
          />
        </>
      )
    );
  }
}

ConfigureButton.propTypes = {
  about: PropTypes.object.isRequired
};

export default ConfigureButton;
