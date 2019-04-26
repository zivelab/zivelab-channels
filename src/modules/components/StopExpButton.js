import React from "react";
import PropTypes from "prop-types";

// controls
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

// Icons
import StopIcon from "@material-ui/icons/Stop";

class StopExpButton extends React.Component {
  render() {
    const { disabled, onStop } = this.props;
    return (
      <IconButton
        aria-label="Stop"
        onClick={onStop}
        disabled={disabled}
        color="secondary"
      >
        <Tooltip title="Stop">
          <StopIcon fontSize="large" />
        </Tooltip>
      </IconButton>
    );
  }
}

StopExpButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onStop: PropTypes.func.isRequired
};

export default StopExpButton;
