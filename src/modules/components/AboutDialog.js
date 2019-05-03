import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

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
import { enqueueSnackbar } from "../redux/actions";
import compose from "../utils/compose";

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
  embeddedWebApp: "Embedded Web App"
};

class AboutDialog extends React.Component {
  handleCopy = async () => {
    await copy(JSON.stringify(this.props.about, undefined, 3));
    this.props.actions.snackbar.enqueueSnackbar("copied");
  };

  handleUpdate = async () => {};

  render() {
    const {
      classes,
      about,
      helperTexts,
      onClose,
      onUpdate,
      ...other
    } = this.props;
    const title = about ? "About " + about.hostName : "About";
    return (
      !isEmpty(about) && (
        <Dialog
          onClose={onClose}
          scroll="paper"
          aria-labelledby="dialog-about"
          {...other}
        >
          <DialogTitle id="dialog-about">{title}</DialogTitle>
          <DialogContent>
            {Object.keys(about).map(key => (
              <TextField
                id={key}
                key={key}
                label={aboutLabels[key]}
                className={classes.textField}
                value={about[key] ? about[key] : "Not assigned"}
                margin="normal"
                multiline={true}
                helperText={helperTexts[key] ? helperTexts[key] : ""}
                error={helperTexts[key] ? true : false}
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
            {Object.keys(helperTexts).length && (
              <Button color="secondary" onClick={onUpdate}>
                Update all
              </Button>
            )}
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
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      snackbar: bindActionCreators({ enqueueSnackbar }, dispatch)
    }
  };
};

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withStyles(styles)
)(AboutDialog);
