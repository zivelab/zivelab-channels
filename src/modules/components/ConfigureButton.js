import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

// controls
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

// Icons
import SettingsEthernet from "@material-ui/icons/SettingsEthernet";

// components
import ConfigureDialog from "./ConfigureDialog";

// functions
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
    const { about, sendMessage } = this.props;
    const { open } = this.state;

    if (!isEmpty(about)) {
      return (
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
          <ConfigureDialog
            about={about}
            open={open}
            onClose={this.handleClose}
            sendMessage={sendMessage}
          />
        </React.Fragment>
      );
    } else {
      return <React.Fragment key="section-to-configure-ethernet" />;
    }
  }
}

ConfigureButton.propTypes = {
  classes: PropTypes.object.isRequired,
  about: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired
};

export default withStyles(styles)(ConfigureButton);
