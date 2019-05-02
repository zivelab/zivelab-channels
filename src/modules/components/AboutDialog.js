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
import copy from "clipboard-copy";

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
  hostName: "Name",
  model: "Model",
  description: "Description",
  frequencyRanges: "Frequency Ranges",
  voltageRanges: "Voltage Ranges",
  currentRanges: "Current Ranges",
  temperatureSensor: "Temperature Sensor",
  configureIPv4: "Configure IPv4",
  ipAddress: "IPv4 Address",
  subnetMask: "Subnet Mask",
  router: "Router",
  port: "Port",
  macAddress: "Mac Address",
  sifBoard: "SIF Board",
  sifFirmware: "SIF Firmware",
  sifSerialNumber: "SIF Serial Number",
  zimBoard: "ZIM Board",
  zimFirmware: "ZIM Firmware",
  zimSerialNumber: "ZIM Serial Number",
  embeddedWebServer: "Embedded Web Server"
};

class AboutDialog extends React.Component {
  handleCopy = async () => {
    await copy(JSON.stringify(this.props.about, undefined, 3));
  };

  render() {
    const { classes, about, helperTexts, onClose, ...other } = this.props;
    return (
      !isEmpty(about) && (
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
                id={key}
                key={key}
                label={aboutLabels[key]}
                className={classes.textField}
                value={about[key] ? about[key] : "Not assigned"}
                margin="normal"
                multiline={true}
                helperText={helperTexts[key] ? helperTexts[key] : ""}
                InputProps={{
                  readOnly: true
                }}
              />
            ))}
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleCopy}>
              Copy to Clipboard
            </Button>
          </DialogActions>
        </Dialog>
      )
    );
  }
}

AboutDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  about: PropTypes.object.isRequired,
  helperTexts: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};

export default withStyles(styles)(AboutDialog);
