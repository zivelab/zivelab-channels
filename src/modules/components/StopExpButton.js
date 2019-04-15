import React from "react";
import PropTypes from "prop-types";

// controls
import IconButton from "@material-ui/core/IconButton";

// Icons
import StopIcon from "@material-ui/icons/Stop";

class StopExpButton extends React.Component {
  render() {
    const { disabled, onStop } = this.props;
    return (
      <React.Fragment key="section-to-setup-experiment">
        <IconButton aria-label="Stop" onClick={onStop} disabled={disabled}>
          <StopIcon />
        </IconButton>
      </React.Fragment>
    );
  }
}

StopExpButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onStop: PropTypes.func.isRequired
};

export default StopExpButton;
