import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// controls
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

// Icons
import InfoIcon from "@material-ui/icons/Info";

// components
import AboutDialog from "./AboutDialog";

// functions
import { isEmpty, compareVersion } from "../utils/object";
import { enqueueSnackbar } from "../redux/actions";
import compose from "../utils/compose";

const styles = theme => ({
  badge: {
    padding: 0 //`0 ${theme.spacing.unit * 2}px`
  }
});

class AboutButton extends React.Component {
  state = {
    open: false,
    versions: null
  };

  controller = new AbortController();

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

  handleUpdate = (helperTexts, e) => {
    this.setState({
      open: false
    });
    if (helperTexts.sifFirmware) {
      this.props.actions.snackbar.enqueueSnackbar(
        "sifFirmware can be updated..., Reserved."
      );
    }
    if (helperTexts.zimFirmware) {
      this.props.actions.snackbar.enqueueSnackbar(
        "zimFirmware can be updated..., Reserved."
      );
    }
    if (helperTexts.embeddedWebServer) {
      this.props.actions.snackbar.enqueueSnackbar(
        "embeddedWebServer can be updated..., Reserved."
      );
    }
  };

  componentDidMount = async () => {
    await this.loadVersionsAsync();
  };

  componentWillUnmount() {
    this.controller.abort();
  }

  loadVersionsAsync = async () => {
    const sifURL =
      "https://raw.githubusercontent.com/zivelab/zivelab-channels/master/assets/sif4zim/version.json";
    const sifJson = await this.getVersionAsync(sifURL);
    const sifFirmware = sifJson ? sifJson.version : "";

    const zimURL =
      "https://raw.githubusercontent.com/zivelab/zivelab-channels/master/assets/zim/version.json";
    const zimJson = await this.getVersionAsync(zimURL);
    const zimFirmware = zimJson ? zimJson.version : "";

    const serverURL =
      "https://raw.githubusercontent.com/zivelab/zivelab-channels/master/demo/babel-standalone/version.json";
    const serverJson = await this.getVersionAsync(serverURL);
    const embeddedWebServer = serverJson ? serverJson.version : "";

    this.setState({
      versions: {
        sifFirmware: sifFirmware,
        zimFirmware: zimFirmware,
        embeddedWebServer: embeddedWebServer
      }
    });
  };

  getVersionAsync = async url => {
    try {
      const versionFetch = await fetch(url, {
        signal: this.controller.signal
      });
      const versionJson = await versionFetch.json();
      if (versionJson) {
        return versionJson;
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  getNotificationNumber = (latest, about) => {
    let helperTexts = {};

    if (!latest || !about) return helperTexts;
    if (compareVersion(latest.sifFirmware, about.sifFirmware) > 0) {
      helperTexts.sifFirmware =
        "New version, " + latest.sifFirmware + " available";
    }
    if (compareVersion(latest.zimFirmware, about.zimFirmware) > 0) {
      helperTexts.zimFirmware =
        "New version, " + latest.zimFirmware + " available";
    }
    if (compareVersion(latest.embeddedWebServer, about.embeddedWebServer) > 0) {
      helperTexts.embeddedWebServer =
        "New version, " + latest.embeddedWebServer + " available";
    }

    return helperTexts;
  };

  render() {
    const { classes, about } = this.props;
    const { open, versions } = this.state;
    const helperTexts = this.getNotificationNumber(versions, about);
    const notificationNumber = Object.keys(helperTexts).length;
    const tooptip =
      notificationNumber === 1
        ? "New version available"
        : notificationNumber > 1
        ? "New versions available"
        : "About device";
    return (
      !isEmpty(about) && (
        <>
          <IconButton
            color="inherit"
            onClick={this.handleClick}
            aria-label="about"
          >
            <Badge
              color="secondary"
              badgeContent={notificationNumber}
              variant="dot"
              className={classes.badge}
            >
              <Tooltip title={tooptip} enterDelay={300}>
                <InfoIcon />
              </Tooltip>
            </Badge>
          </IconButton>
          <AboutDialog
            open={open}
            about={about}
            helperTexts={helperTexts}
            onClose={this.handleClose}
            onUpdate={e => this.handleUpdate(helperTexts, e)}
          />
        </>
      )
    );
  }
}

AboutButton.propTypes = {
  classes: PropTypes.object.isRequired,
  about: PropTypes.object.isRequired
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
)(AboutButton);
