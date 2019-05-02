import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

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
      helperTexts.sifFirmware = "v" + latest.sifFirmware + " is available.";
    }
    if (compareVersion(latest.zimFirmware, about.zimFirmware) > 0) {
      helperTexts.zimFirmware = "v" + latest.zimFirmware + " is available.";
    }
    if (compareVersion(latest.embeddedWebServer, about.embeddedWebServer) > 0) {
      helperTexts.embeddedWebServer =
        "v" + latest.embeddedWebServer + " is available.";
    }

    return helperTexts;
  };

  render() {
    const { classes, about } = this.props;
    const { open, versions } = this.state;
    const helperTexts = this.getNotificationNumber(versions, about);
    const notificationNumber = Object.keys(helperTexts).length;
    console.log(helperTexts);
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
              <Tooltip title="About device" enterDelay={300}>
                <InfoIcon />
              </Tooltip>
            </Badge>
          </IconButton>
          <AboutDialog
            open={open}
            about={about}
            helperTexts={helperTexts}
            onClose={this.handleClose}
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

export default withStyles(styles)(AboutButton);
