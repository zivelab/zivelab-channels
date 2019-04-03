import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

// controls
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

// functions
import { isEmpty } from "../utils/object";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

const aboutLabels = {
  hostName: "Host Name",
  model: "Model",
  description: "Description",
  frequencyRanges: "Frequency Ranges",
  voltageRanges: "Voltage Ranges",
  currentRanges: "Current Ranges",
  temperatureSensor: "Temperature Sensor",
  macAddress: "Mac Address",
  ipAddress: "IP Address",
  subnetMask: "Subnet Mask",
  router: "Router",
  port: "Port",
  sifBoard: "SIF Board",
  sifFirmware: "SIF Firmware",
  sifSerialNumber: "SIF Serial Number",
  zimBoard: "ZIM Board",
  zimFirmware: "ZIM Firmware",
  zimSerialNumber: "ZIM Serial Number"
};

class AboutDialog extends React.Component {
  render() {
    const { classes, about, onClose, ...other } = this.props;
    if (!isEmpty(about)) {
      return (
        <Dialog
          onClose={onClose}
          scroll="paper"
          aria-labelledby="dialog-about"
          {...other}
        >
          <DialogTitle id="dialog-about">About</DialogTitle>
          <DialogContent>
            {Object.keys(about).map((key, index) => (
              <TextField
                id={aboutLabels[key]}
                label={aboutLabels[key]}
                className={classes.textField}
                value={about[key] ? about[key] : "Not assigned"}
                margin="normal"
                multiline={true}
                InputProps={{
                  readOnly: true
                }}
              />
            ))}
          </DialogContent>
          <DialogActions>
            <Button disabled={true} color="primary">
              Copy to Clipboard
            </Button>
          </DialogActions>
        </Dialog>
      );
    } else {
      return <React.Fragment />;
    }
  }
}

AboutDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  about: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};

export default withStyles(styles)(AboutDialog);
