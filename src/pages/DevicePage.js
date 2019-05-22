import "../bootstrap";
// --- Post bootstrap -----
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";

//controls
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

// components
import AppContent from "../modules/components/AppContent";
import AuxPanel from "../modules/dashboards/AuxPanel";
import BodePanel from "../modules/dashboards/BodePanel";
import CookPanel from "../modules/dashboards/CookPanel";
import NyquistPanel from "../modules/dashboards/NyquistPanel";
import ZTablePanel from "../modules/dashboards/ZTablePanel";

// functions
import { changeAbout, enqueueSnackbar } from "../modules/redux/actions";
import compose from "../modules/utils/compose";
import { exportTableToCsv } from "../modules/utils/object";

const styles = theme => ({
  root: {
    width: "100%",
    margin: 0
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  }
});

// Math Constatnts
const dateTimeOffset = 62135596800000; // ticks from 0000-01-01 to 1970-01-01
const launched = new Date().getTime();
//const queue = [];

// Device specfic constants
const states = {
  NotAssigned: "NotAssigned",
  Idle: "Idle",
  Running: "Running",
  Finished: "Finished",
  Stopped: "Stopped",
  RunningNoiseLevel: "RunningNoiseLevel",
  TooHotFET: "TooHotFET",
  Failed: "Failed"
};

const defaultParameters = {
  initialFrequency: 1000,
  finalFrequency: 1.0,
  density: 10,
  iteration: 1,
  currentRange: 2,
  maxInitialDelay: 12.0,
  skip: 1,
  cycles: 0
};

const parameterLabels = {
  initialFrequency: {
    label: "Initial Frequency",
    min: 0.1,
    max: 4000,
    default: 1000
  },
  finalFrequency: { label: "Final Frequency", min: 0.1, max: 4000, default: 1 },
  density: { label: "Density", min: 1, max: 20, default: 10 },
  iteration: { label: "Iteration", min: 1, max: 200, default: 1 },
  currentRange: { label: "Current Range", min: 0, max: 7, default: 2 },
  maxInitialDelay: {
    label: "Max Initial Delay",
    min: 0,
    max: 100,
    default: 12
  },
  skip: { label: "skip", min: 1, max: 100, default: 1 },
  cycles: { label: "cycles", min: 0, max: 100, default: 0 }
};

let currentIPAddress = null;

class DevicePage extends React.Component {
  state = {
    ipAddress: "",

    about: null,
    channel: null,
    cook: null,
    cookIndex: -1,

    parameters: defaultParameters,

    auxData: [],

    timer: null,

    voltageRanges: [],
    currentRanges: [],
    temperatureSensor: "PT100",

    scientific: false
  };

  controller = new AbortController();

  handleSamples = async () => {
    await this.loadSamplesAsync(this.state.cookIndex);
  };

  handleChange = (event, name) => {
    if (name === "cookIndex") {
      this.setState({ [name]: Number(event.target.value) });
      return;
    }
    const key = Object.keys(parameterLabels).find(key => key === name);
    const parameter = parameterLabels[key];
    let value = event.target.value;
    if (value < parameter.min) {
      value = parameter.min;
    } else if (value > parameter.max) {
      value = parameter.max;
    }
    this.setState({
      parameters: {
        ...this.state.parameters,
        [key]: value
      }
    });
  };

  handleGoFirst = async () => {
    const index = 0;
    this.setState({
      cookIndex: index
    });
    if (
      this.state.cook &&
      this.state.cook.data &&
      index < this.state.cook.data.length &&
      !this.state.cook.data[index].samples
    ) {
      await this.loadSamplesAsync(index);
    }
  };

  handleGoNext = async () => {
    const index = this.state.cookIndex + 1;
    this.setState({
      cookIndex: index
    });
    if (
      this.state.cook &&
      this.state.cook.data &&
      index < this.state.cook.data.length &&
      !this.state.cook.data[index].samples
    )
      await this.loadSamplesAsync(index);
  };

  handleGoLast = async () => {
    const index = this.state.cook.data.length - 1;
    this.setState({
      cookIndex: index
    });
    if (
      this.state.cook &&
      this.state.cook.data &&
      index < this.state.cook.data.length &&
      !this.state.cook.data[index].samples
    ) {
      await this.loadSamplesAsync(index);
    }
  };
  handleGoPrevious = async () => {
    const index = this.state.cookIndex - 1;
    this.setState({
      cookIndex: index
    });
    if (
      this.state.cook &&
      this.state.cook.data &&
      index < this.state.cook.data.length &&
      !this.state.cook.data[index].samples
    )
      await this.loadSamplesAsync(index);
  };

  handleStart = async () => {
    await this.startExpAsync();
  };

  handleStop = async () => {
    await this.stopExpAsync();
  };

  handleDownload = async () => {
    this.setState({
      scientific: true
    });
  };

  handleClearAuxData = () => {
    this.setState({
      auxData: []
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.ipAddress !== nextProps.ipAddress) {
      currentIPAddress = nextProps.ipAddress;
      return {
        ipAddress: nextProps.ipAddress,
        about: null,
        channel: null,
        cook: null,
        cookIndex: -1
      };
    } else {
      return null;
    }
  }

  componentDidMount = async () => {
    await this.loadAboutAsync();
    await this.loadChannelAsync();
    let timer = setInterval(async () => {
      await this.loadChannelAsync();
    }, 2000);
    this.setState({ timer });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.ipAddress !== this.state.ipAddress) {
      this.loadAboutAsync();
      this.loadChannelAsync();
    }
    if (
      this.state.about &&
      JSON.stringify(prevProps.reduxAbout) !== JSON.stringify(this.state.about)
    ) {
      this.props.actions.about.changeAbout(this.state.about);
    }
    if (
      prevState.scientific !== this.state.scientific &&
      this.state.scientific
    ) {
      this.saveCookedAsCSV();
    }
  }

  // [todo] We have to cancel all asynchronous tasks
  componentWillUnmount() {
    currentIPAddress = null;
    this.controller.abort();
    clearInterval(this.state.timer);
  }

  loadAboutAsync = async () => {
    const { ipAddress } = this.state;
    if (ipAddress !== currentIPAddress) return;
    try {
      const aboutURL = "http://" + ipAddress + "/about";
      const aboutFetch = await fetch(aboutURL, {
        signal: this.controller.signal
      });
      const aboutJson = await aboutFetch.json();
      if (aboutJson) {
        aboutJson.hostName = aboutJson.hostName || "Untitled";
        aboutJson.configureIPv4 = aboutJson.configureIPv4 || "Using DHCP";
        aboutJson.maxPowerRating = aboutJson.maxPowerRating || "40W";
        const voltageRanges = aboutJson.voltageRanges
          .split("/")
          .map((range, index) => {
            return { value: index, label: range };
          });
        const currentRanges = aboutJson.currentRanges
          .split("/")
          .map((range, index) => {
            return { value: index, label: range, diabled: false };
          });
        aboutJson.currentRanges =
          currentRanges[0].label +
          "/" +
          currentRanges[1].label +
          "/.../" +
          currentRanges[currentRanges.length - 1].label;
        const temperatureSensor = aboutJson.temperatureSensor || "PT100";

        const embeddedWebApp = await this.loadWebAppVersionAsync();
        if (embeddedWebApp) {
          aboutJson.embeddedWebApp = embeddedWebApp;
        }

        this.setState({
          about: aboutJson,
          voltageRanges,
          currentRanges,
          temperatureSensor
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  loadWebAppVersionAsync = async () => {
    const { ipAddress } = this.state;
    if (ipAddress !== currentIPAddress) return;
    try {
      const versionURL = "http://" + ipAddress + "/version.json";
      const versionFetch = await fetch(versionURL, {
        signal: this.controller.signal
      });
      const versionJson = await versionFetch.json();
      if (versionJson && versionJson.version) {
        return versionJson.version;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  loadChannelAsync = async () => {
    const { ipAddress } = this.state;
    if (ipAddress !== currentIPAddress) return;
    try {
      const channelURL = "http://" + ipAddress + "/channel";
      const channelFetch = await fetch(channelURL, {
        signal: this.controller.signal
      });
      const channelJson = await channelFetch.json();
      if (channelJson) {
        const state = Object.keys(states).find(
          key => states[key] === channelJson.state
        );
        channelJson.received = Date.now();
        channelJson.isIdle = state === states.Idle;
        channelJson.isRunning =
          state === states.Running ||
          state === states.Finished ||
          state === states.Stopped;
        channelJson.isRunningNoiseLevel = state === states.RunningNoiseLevel;
        channelJson.isTooHot = state === states.TooHotFET;
        channelJson.isFailed = state === states.Failed;

        if (
          state === states.Running &&
          this.state.channel &&
          (this.state.channel.isIdle || false)
        ) {
          this.props.actions.snackbar.enqueueSnackbar("Started");
        } else if (state === states.Finished) {
          this.props.actions.snackbar.enqueueSnackbar("Successfully finished");
        } else if (state === states.Stopped) {
          this.props.actions.snackbar.enqueueSnackbar("Manually stopped");
        }

        // Update state: channel and auxData
        const newAuxItem = {
          time: (new Date().getTime() - launched) / 1000, // [sec]
          voltage: channelJson.auxVoltage && channelJson.auxVoltage.toFixed(3),
          temperature:
            channelJson.auxTemperature && channelJson.auxTemperature.toFixed(3)
        };
        if (this.state.auxData.length < 200) {
          this.setState({
            channel: channelJson,
            auxData: [...this.state.auxData, newAuxItem]
          });
        } else {
          // eslint-disable-next-line
          const [first, ...rest] = this.state.auxData;
          this.setState({
            channel: channelJson,
            auxData: [...rest, newAuxItem]
          });
        }
        // If lastStarted does not equals to cook.started, update cook.
        if (channelJson.lastStarted) {
          const lastTicks = channelJson.lastStarted.ticks;
          const lastCount = channelJson.lastStarted.count;
          if (
            !this.state.cook ||
            this.state.cook.started.ticks !== lastTicks ||
            this.state.cook.started.count !== lastCount
          ) {
            await this.loadCookAsync();
          }
        }

        if (
          !channelJson.isRunning &&
          this.state.cook &&
          this.state.cook.data.length > 0 &&
          this.state.cookIndex < 0
        ) {
          this.handleGoFirst();
        } else if (
          !channelJson.isRunning &&
          this.state.cook &&
          this.state.cook.data.length > 0 &&
          this.state.cookIndex > this.state.cook.data.length
        ) {
          this.handleGoLast();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  loadCookAsync = async () => {
    const { ipAddress } = this.state;
    if (ipAddress !== currentIPAddress) return;
    try {
      const cookURL = "http://" + ipAddress + "/cook";
      const cookFetch = await fetch(cookURL, {
        signal: this.controller.signal
      });
      const cookJson = await cookFetch.json();
      if (cookJson) {
        cookJson.started.moment = moment(
          cookJson.started.ticks - dateTimeOffset
        );
        cookJson.data = cookJson.data.filter(function(item) {
          return item.frequency !== 0;
        });
        cookJson.parameters.currentRange = cookJson.parameters.currentRange - 1; // 0 = Auto
        this.setState({
          cook: cookJson,
          parameters: { ...cookJson.parameters }
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  loadSamplesAsync = async index => {
    const { ipAddress, cook } = this.state;
    if (ipAddress !== currentIPAddress) return;
    try {
      const samplesURL = "http://" + ipAddress + "/samples?index=" + index;
      const samplesFetch = await fetch(samplesURL, {
        signal: this.controller.signal
      });
      const samplesJson = await samplesFetch.json();
      if (
        samplesJson &&
        cook &&
        cook.data &&
        index >= 0 &&
        index < cook.data.length
      ) {
        // Update state: cook.data[index].samples
        const data = cook.data.map((item, j) => {
          if (j === index) {
            item.samples = samplesJson;
          }
          return item;
        });
        this.setState({
          cook: {
            ...this.state.cook,
            data: data
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  startExpAsync = async () => {
    const { ipAddress } = this.state;
    if (ipAddress !== currentIPAddress) return;
    try {
      const ticks = new Date().getTime() + dateTimeOffset; // miliiseconds since 0000-01-01
      const payload = new URLSearchParams();
      payload.append(
        "initialFrequency",
        this.state.parameters.initialFrequency
      );
      payload.append("finalFrequency", this.state.parameters.finalFrequency);
      payload.append("density", this.state.parameters.density);
      payload.append("iteration", this.state.parameters.iteration);
      payload.append("currentRange", this.state.parameters.currentRange + 1); //0 = "Auto"
      payload.append("maxInitialDelay", this.state.parameters.maxInitialDelay);
      payload.append("skip", 1);
      payload.append("cycles", 0);
      payload.append("started", ticks);
      const settings = {
        method: "POST",
        headers: {
          "Content-Length": payload.toString().length.toString()
        },
        body: payload.toString(),
        signal: this.controller.signal
      };
      const startURL = "http://" + ipAddress + "/start";
      const response = await fetch(startURL, settings);
      if (response.ok) {
        this.setState({
          cookIndex: -1
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  stopExpAsync = async () => {
    const { ipAddress } = this.state;
    if (ipAddress !== currentIPAddress) return;
    try {
      const stopURL = "http://" + ipAddress + "/stop";
      const settings = {
        method: "POST",
        headers: {
          "Content-Length": 0
        },
        signal: this.controller.signal
      };
      const response = await fetch(stopURL, settings);
      if (response.ok) {
        //console.log("Manually Stopped");
      }
    } catch (e) {
      console.log(e);
    }
  };

  saveCookedAsCSV = () => {
    if (this.state.about && this.state.about.zimSerialNumber) {
      const tblID = "cook-table";
      const fileName =
        this.state.about.zimSerialNumber +
        "_cooked_" +
        this.state.cook.started.ticks;
      exportTableToCsv(tblID, fileName);
    }

    this.setState({
      scientific: false
    });
  };

  getTitle = about => {
    if (about) {
      const hostName = about.hostName || "Untitled";
      const model = about.model.startsWith("Zive")
        ? about.model
            .split(" ")
            .slice(1)
            .join(" ")
        : about.model;
      const ip = about.ipAddress;
      return hostName === "Untitled"
        ? model + " (" + ip + ")"
        : hostName + " (" + model + ", " + ip + ")";
    } else {
      return "";
    }
  };

  render() {
    const { classes } = this.props;
    const { about, channel, cook, cookIndex, parameters, auxData } = this.state;
    const { voltageRanges, currentRanges, temperatureSensor } = this.state;
    const { scientific } = this.state;
    const title = this.getTitle(about);
    return (
      <AppContent title={title} responsive>
        <Grid
          container
          className={classes.root}
          spacing={40}
          layout="row"
          alignItems="stretch"
        >
          {/* Aux Voltage/Temperature */}
          <Grid item key="AuxCard" xs={12} sm={12} md={4}>
            <AuxPanel
              auxData={auxData}
              channel={channel}
              onClear={this.handleClearAuxData}
              voltageRanges={voltageRanges}
              temperatureSensor={temperatureSensor}
            />
          </Grid>

          {/* Cook */}
          <Grid item key="CookCard" xs={12} sm={12} md={8}>
            <CookPanel
              channel={channel}
              cook={cook}
              cookIndex={cookIndex}
              parameters={parameters}
              onGoFirst={this.handleGoFirst}
              onGoLast={this.handleGoLast}
              onGoNext={this.handleGoNext}
              onGoPrevious={this.handleGoPrevious}
              onStart={this.handleStart}
              onStop={this.handleStop}
              onDownload={this.handleDownload}
              onChange={this.handleChange}
            />
          </Grid>

          {/* Nyquist */}
          <Grid item key="CookNyquistCard" xs={12} sm={12} md={6}>
            <NyquistPanel cook={this.state.cook} />
          </Grid>

          {/* Bode */}
          <Grid item key="CookBodeCard" xs={12} sm={12} md={6}>
            <BodePanel cook={this.state.cook} />
          </Grid>

          {/* Cook Table */}
          {/* [TODO] I can't resolve that table is overflowed its parent. */}
          <Hidden mdDown implementation="js">
            <Grid item key="CookTable" xs={12} sm={12} md={12}>
              <ZTablePanel
                cook={this.state.cook}
                currentRanges={currentRanges}
                scientific={scientific}
              />
            </Grid>
          </Hidden>
        </Grid>
      </AppContent>
    );
  }
}

DevicePage.propTypes = {
  classes: PropTypes.object.isRequired,
  ipAddress: PropTypes.string.isRequired,
  reduxAbout: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  reduxAbout: state.about
});

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      about: bindActionCreators({ changeAbout }, dispatch),
      snackbar: bindActionCreators({ enqueueSnackbar }, dispatch)
    }
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(DevicePage);
