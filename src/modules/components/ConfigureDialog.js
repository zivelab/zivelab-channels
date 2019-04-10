import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

// controls
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

// functions
import compose from "../utils/compose";
import { isEmpty } from "../utils/object";
import { validateIPaddress } from "../utils/net";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  }
});

const configureIPv4s = {
  UsingDHCP: "Using DHCP",
  Manually: "Manually",
  Automatically: "Automatically"
};

const configureIPv4Options = [
  {
    value: configureIPv4s.UsingDHCP,
    label: configureIPv4s.UsingDHCP,
    disabled: false
  },
  {
    value: configureIPv4s.Manually,
    label: configureIPv4s.Manually,
    disabled: false
  },
  {
    value: configureIPv4s.Automatically,
    label: configureIPv4s.Automatically,
    disabled: true
  }
];

class ConfigureDialog extends React.Component {
  state = {
    hostName: "",
    configureIPv4: "",
    ipAddress: "",
    subnetMask: "",
    router: ""
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleClick = async () => {
    const success = await this.postConfigureAsync();
    if (success) {
      this.props.sendMessage(
        "The device's Ethernet settings have changed. \n Please restart it for the applied changes to take effect."
      );
    } else {
      this.props.sendMessage("Fail to change the device's Ethernet settings.");
    }
    this.props.onClose();
  };

  handleClose = () => {
    // set default values
    const { reduxAbout } = this.props;
    this.setState({
      hostName: reduxAbout.hostName,
      configureIPv4: reduxAbout.configureIPv4,
      ipAddress: reduxAbout.ipAddress,
      subnetMask: reduxAbout.subnetMask,
      router: reduxAbout.router
    });
    this.props.onClose();
  };

  postConfigureAsync = async () => {
    const ip = this.props.reduxAbout.ipAddress;
    try {
      const payload = new URLSearchParams();
      payload.append("hostName", this.state.hostName);
      payload.append("configureIPv4", this.state.configureIPv4);
      payload.append("ipAddress", this.state.ipAddress);
      payload.append("subnetMask", this.state.subnetMask);
      payload.append("router", this.state.router);
      const settings = {
        method: "POST",
        headers: {
          "Content-Length": payload.toString().length.toString()
        },
        body: payload.toString()
      };
      const configureURL = "http://" + ip + "/configure";
      const response = await fetch(configureURL, settings);
      return response.ok;
    } catch (e) {
      //console.log(e);
      return false;
    }
  };

  componentDidMount() {
    const { reduxAbout } = this.props;
    this.setState({
      hostName: reduxAbout.hostName,
      configureIPv4: reduxAbout.configureIPv4,
      ipAddress: reduxAbout.ipAddress,
      subnetMask: reduxAbout.subnetMask,
      router: reduxAbout.router
    });
  }

  componentDidUpdate(prevProps) {
    const { reduxAbout } = this.props;
    if (JSON.stringify(reduxAbout) !== JSON.stringify(prevProps.reduxAbout)) {
      this.setState({
        hostName: reduxAbout.hostName,
        configureIPv4: reduxAbout.configureIPv4,
        ipAddress: reduxAbout.ipAddress,
        subnetMask: reduxAbout.subnetMask,
        router: reduxAbout.router
      });
    }
  }

  render() {
    const { classes, reduxAbout, onClose, ...other } = this.props;
    const {
      hostName,
      configureIPv4,
      ipAddress,
      subnetMask,
      router
    } = this.state;
    const isDHCP = configureIPv4 === configureIPv4s.UsingDHCP;
    const isValid =
      hostName.trim().length >= 1 &&
      (configureIPv4 === configureIPv4s.UsingDHCP ||
        (configureIPv4 !== configureIPv4s.UsingDHCP &&
          validateIPaddress(ipAddress) &&
          validateIPaddress(subnetMask) &&
          validateIPaddress(router)));
    const isChanged =
      hostName.trim() !== reduxAbout.hostName ||
      configureIPv4 !== reduxAbout.configureIPv4 ||
      ipAddress !== reduxAbout.ipAddress ||
      subnetMask !== reduxAbout.subnetMask ||
      router !== reduxAbout.router;
    if (!isEmpty(reduxAbout)) {
      return (
        <React.Fragment key="section-to-open-dialog-configure">
          <Dialog
            onClose={this.handleClose}
            scroll="paper"
            aria-labelledby="dialog-configure"
            {...other}
          >
            <DialogTitle id="dialog-configure">Configure</DialogTitle>
            <DialogContent>
              <div>
                <DialogContentText>
                  Please enter the name of your device here.
                </DialogContentText>
                <TextField
                  id="new-name"
                  key="new-name"
                  label="Host Name"
                  className={classes.textField}
                  value={hostName}
                  error={hostName.length === 0}
                  onChange={this.handleChange("hostName")}
                  margin="normal"
                  multiline={true}
                  variant="outlined"
                />
              </div>
              <br />
              <div>
                <DialogContentText>
                  Please configure the ethernet settings of your device here.
                </DialogContentText>
                <TextField
                  id="new-dhcp"
                  select
                  key="new-dhcp"
                  label="Configure IPv4"
                  className={classes.textField}
                  value={configureIPv4}
                  onChange={this.handleChange("configureIPv4")}
                  margin="normal"
                  multiline={true}
                  InputProps={{
                    readOnly: false
                  }}
                  variant="outlined"
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                >
                  {configureIPv4Options.map(option => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <br />
                <TextField
                  id="new-IPv4-address"
                  key="new-IPv4-address"
                  label="IPv4 Address"
                  className={classes.textField}
                  value={ipAddress}
                  error={!validateIPaddress(ipAddress)}
                  onChange={this.handleChange("ipAddress")}
                  margin="normal"
                  multiline={true}
                  disabled={isDHCP}
                />
                <br />
                <TextField
                  id="new-subnet-mask"
                  key="new-subnet-mask"
                  label="Subnet Mask"
                  className={classes.textField}
                  value={subnetMask}
                  error={!validateIPaddress(subnetMask)}
                  onChange={this.handleChange("subnetMask")}
                  margin="normal"
                  multiline={true}
                  disabled={isDHCP}
                />
                <br />
                <TextField
                  id="new-router"
                  key="new-router"
                  label="Router"
                  className={classes.textField}
                  value={router}
                  error={!validateIPaddress(router)}
                  onChange={this.handleChange("router")}
                  margin="normal"
                  multiline={true}
                  disabled={isDHCP}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                onClick={this.handleClick}
                disabled={!isValid || !isChanged}
              >
                Apply
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      );
    } else {
      return <React.Fragment key="section-to-open-dialog-configure-disabled" />;
    }
  }
}

ConfigureDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  reduxAbout: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired
};

export default compose(
  connect(state => ({
    reduxAbout: state.about
  })),
  withStyles(styles)
)(ConfigureDialog);
