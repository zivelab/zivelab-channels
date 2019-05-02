import React from "react";
import PropTypes from "prop-types";

// controls
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

// components
import SetUpDialog from "./SetUpDialog";

// Icons
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

class StartExpButton extends React.Component {
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

  handleStart = () => {
    this.handleClose();
    this.props.onStart();
  };

  render() {
    const { disabled, parameters, onChange, currentRanges } = this.props;
    const { open } = this.state;
    return (
      <>
        <IconButton
          aria-label="Start"
          onClick={this.handleClick}
          disabled={disabled}
          color="primary"
        >
          <Tooltip title="Start">
            <PlayArrowIcon fontSize="large" />
          </Tooltip>
        </IconButton>
        <SetUpDialog
          open={open}
          parameters={parameters}
          onClose={this.handleClose}
          onStart={this.handleStart}
          onChange={onChange}
          currentRanges={currentRanges}
        />
      </>
    );
  }
}

StartExpButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  parameters: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,
  currentRanges: PropTypes.array
};

export default StartExpButton;
