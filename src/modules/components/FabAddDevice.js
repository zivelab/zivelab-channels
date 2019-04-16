import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Tooltip from "@material-ui/core/Tooltip";

import AddIcon from "@material-ui/icons/Add";

import { validateIPaddress } from "../utils/net";
import { getCookie } from "../utils/helpers";

const styles = theme => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  fabMoveUp: {
    transform: "translate3d(0, -75px, 0)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.easeOut
    })
  },
  fabMoveDown: {
    transform: "translate3d(0, 0, 0)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp
    })
  }
});

function getLastKnownDevice(givenDevice) {
  const lastKnwonDevice = getCookie("lastKnownDevice");
  return lastKnwonDevice === "" ? givenDevice : lastKnwonDevice;
}

class FabAddDevice extends React.Component {
  state = {
    open: false,
    knownDevice: "",
    isValidDevice: false
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.open && prevState.knownDevice !== nextProps.knownDevice) {
      const givenDevice = nextProps.knownDevice;
      const knownDevice = getLastKnownDevice(givenDevice);
      const isValid = validateIPaddress(knownDevice);
      return {
        knownDevice: knownDevice,
        isValidDevice: isValid
      };
    } else {
      return null;
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = event => {
    const newValue = event.target.value;
    const isValid = validateIPaddress(newValue);
    this.setState({
      knownDevice: newValue,
      isValidDevice: isValid
    });
  };

  handleClick = () => {
    document.cookie = `lastKnownDevice=${
      this.state.knownDevice
    };path=/;max-age=31536000`;

    this.handleClose();
    this.props.onClick(this.state.knownDevice);
  };

  render() {
    const { classes, disabled, moveUp } = this.props;
    const { open, knownDevice, isValidDevice } = this.state;
    const fabClassName = classNames(
      classes.fab,
      moveUp ? classes.fabMoveUp : classes.fabMoveDown
    );
    return (
      <React.Fragment key="section-to-add-known-device">
        <Tooltip
          title="Click to add known device"
          aria-label="Click to add known device"
          enterDelay={300}
        >
          <Fab
            aria-label="Add"
            className={fabClassName}
            color="primary"
            size="medium"
            onClick={this.handleOpen}
            disabled={disabled}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-known-device"
        >
          <DialogTitle id="form-dialog-known-device">
            Add known device
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the known IP address of your device here.
            </DialogContentText>
            <br />
            <FormControl required error={!isValidDevice}>
              <InputLabel>IP address</InputLabel>
              <Input
                autoFocus
                id="ipAddress-to-add"
                label="IP address"
                value={knownDevice}
                onChange={this.handleChange}
                type="text"
                fullWidth
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleClick}
              color="primary"
              disabled={!isValidDevice}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

FabAddDevice.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  knownDevice: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  moveUp: PropTypes.bool
};

export default withStyles(styles)(FabAddDevice);
