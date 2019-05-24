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
import { isEmpty, compareVersion, asyncForEach } from "../utils/object";
import { enqueueSnackbar } from "../redux/actions";
import compose from "../utils/compose";

const styles = theme => ({
  badge: {
    padding: 0 //`0 ${theme.spacing(2)}px`
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

  handleUpdate = async () => {
    this.setState({
      open: false
    });

    this.props.actions.snackbar.enqueueSnackbar(
      "Reserved. Please use the windows app to update firmware/app."
    );

    const { versions } = this.state;
    const { about } = this.props;
    if (!versions || !about) return;

    this.props.actions.snackbar.enqueueSnackbar("Updating SIF firmware.");
    //if (compareVersion(versions.sifFirmware, about.sifFirmware) > 0) {
    await this.updateSifFirmware(versions.sifFirmwarePath);
    //}

    //this.props.actions.snackbar.enqueueSnackbar("Updating ZIM firmware.");
    //if (compareVersion(versions.zimFirmware, about.zimFirmware) > 0) {
    //await this.updateZimFirmware(versions.zimFirmwarePath);
    //}

    //this.props.actions.snackbar.enqueueSnackbar("Updating Web App.");
    //if (compareVersion(versions.embeddedWebApp, about.embeddedWebApp) > 0) {
    //await this.updateAppContents(versions.embeddedWebAppPaths);
    //}
  };

  updateSifFirmware = async source => {
    if (!this.props.about || !source) return;

    const ipAddress = this.props.about.ipAddress;
    const targetURL = "http://" + ipAddress + "/update?target=sif";
    var oReq = new XMLHttpRequest();
    oReq.open("POST", targetURL, true);
    oReq.onload = function(oEvent) {
      // Uploaded.
    };

    var blob = new Blob(["abc123"], { type: "text/plain" });

    oReq.send(blob);

    /*
    const ipAddress = this.props.about.ipAddress;
    try {
      const sourceFetch = await fetch(source, {
        signal: this.controller.signal
      });
      const content = await sourceFetch.blob();

      if (content) {
        console.log("Size = " + content.size);
        console.log(content);

        const file = new File(["abc123"], "sif.bin");
        //const file = new File([content], "sif.bin", {
        //  type: "application/octet-stream"
        //});

        var formData = new FormData();
        formData.append("content", file);

        const targetURL = "http://" + ipAddress + "/update?target=sif";
        const settings = {
          method: "POST",
          //mode: "no-cors",
          //headers: {
          //  "Access-Control-Allow-Origin": "*"
          //},
          body: formData,
          signal: this.controller.signal
        };

        const response = await fetch(targetURL, settings);
        if (response.ok) {
          this.props.actions.snackbar.enqueueSnackbar(
            "SIF firmware updated successfully."
          );
        } else {
          this.props.actions.snackbar.enqueueSnackbar(
            "Fail to update SIF firmware."
          );
        }
      }
    } catch (e) {
      console.log(e);
    }
    */
  };

  updateZimFirmware = async source => {
    if (!this.props.about || !source) return;

    const ipAddress = this.props.about.ipAddress;
    try {
      const sourceFetch = await fetch(source, {
        signal: this.controller.signal
      });
      const sourceBlob = await sourceFetch.blob();
      if (sourceBlob) {
        var formData = new FormData();
        formData.append("zim", sourceBlob, "zim.bin");
        const targetURL = "http://" + ipAddress + "/update?target=zim";
        const settings = {
          method: "POST",
          body: formData,
          signal: this.controller.signal
        };
        const response = await fetch(targetURL, settings);
        if (response.ok) {
          this.props.actions.snackbar.enqueueSnackbar(
            "ZIM firmware updated successfully."
          );
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  getAppContentsAsync = async sources => {
    if (!sources) return;

    try {
      var contents = [];
      asyncForEach(sources, async src => {
        const srcFetch = await fetch(src.url);
        const srcBlob = await srcFetch.blob();
        if (srcBlob) {
          contents.push({ value: srcBlob, filename: src.name });
        }
      });
      return contents;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  updateAppContents = async sources => {
    if (!this.props.about || !sources) return;

    const ipAddress = this.props.about.ipAddress;
    try {
      const contents = await this.getAppContentsAsync(sources);

      var formData = new FormData();
      contents.forEach(data => {
        formData.append("files[]", data.value, data.filename);
      });

      const targetURL = "http://" + ipAddress + "/update?target=app";
      const settings = {
        method: "POST",
        body: formData,
        signal: this.controller.signal
      };
      const response = await fetch(targetURL, settings);
      if (response.ok) {
        this.props.actions.snackbar.enqueueSnackbar(
          "Embedded web app updated successfully."
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount = async () => {
    await this.loadVersionsAsync();
  };

  componentWillUnmount() {
    this.controller.abort();
  }

  loadVersionsAsync = async () => {
    // 'https://api.github.com/repos/zivelab/zivelab-channels/contents/assets/sif4zim'

    const sifURL =
      "https://raw.githubusercontent.com/zivelab/zivelab-channels/master/assets/sif4zim/version.json";
    const sifJson = await this.getVersionAsync(sifURL);
    const sifFirmware = sifJson ? sifJson.version : "";
    const sifFirmwarePath = sifJson
      ? "https://raw.githubusercontent.com/zivelab/zivelab-channels/master/assets/sif4zim/" +
        sifJson.path
      : null;

    const zimURL =
      "https://raw.githubusercontent.com/zivelab/zivelab-channels/master/assets/zim/version.json";
    const zimJson = await this.getVersionAsync(zimURL);
    const zimFirmware = zimJson ? zimJson.version : "";
    const zimFirmwarePath = zimJson
      ? "https://raw.githubusercontent.com/zivelab/zivelab-channels/master/assets/zim/" +
        zimJson.path
      : null;

    const appURL =
      "https://raw.githubusercontent.com/zivelab/zivelab-channels/master/demo/babel-standalone/version.json";
    const appJson = await this.getVersionAsync(appURL);
    const embeddedWebApp = appJson ? appJson.version : "";
    const embeddedWebAppPaths = appJson ? await this.getAppFilesAsync() : null;

    this.setState({
      versions: {
        sifFirmware: sifFirmware,
        sifFirmwarePath: sifFirmwarePath,
        zimFirmware: zimFirmware,
        zimFirmwarePath: zimFirmwarePath,
        embeddedWebApp: embeddedWebApp,
        embeddedWebAppPaths: embeddedWebAppPaths
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

  getAppFilesAsync = async () => {
    try {
      const url =
        "https://api.github.com/repos/zivelab/zivelab-channels/contents/demo/babel-standalone";
      const submoduleFetch = await fetch(url, {
        signal: this.controller.signal
      });
      const submoduleJson = await submoduleFetch.json();
      if (submoduleJson) {
        let files = [];
        submoduleJson.forEach(element => {
          files.push({ url: element.download_url, name: element.name });
        });
        return files;
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
    if (compareVersion(latest.embeddedWebApp, about.embeddedWebApp) > 0) {
      helperTexts.embeddedWebApp =
        "New version, " + latest.embeddedWebApp + " available";
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
            onUpdate={this.handleUpdate}
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
