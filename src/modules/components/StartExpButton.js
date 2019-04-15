import React from "react";
import PropTypes from "prop-types";

// controls
import IconButton from "@material-ui/core/IconButton";

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
    const { disabled, parameters, onChange } = this.props;
    const { open } = this.state;
    return (
      <React.Fragment key="section-to-setup-experiment">
        <IconButton
          aria-label="Start"
          onClick={this.handleClick}
          disabled={disabled}
        >
          <PlayArrowIcon />
        </IconButton>
        <SetUpDialog
          open={open}
          parameters={parameters}
          onClose={this.handleClose}
          onStart={this.handleStart}
          onChange={onChange}
        />
      </React.Fragment>
    );
  }
}

StartExpButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  parameters: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired
};

export default StartExpButton;
