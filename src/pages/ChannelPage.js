import "../bootstrap";
// --- Post bootstrap -----
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import ReactJson from "react-json-view";
import moment from "moment";

import AppContent from "../modules/components/AppContent";

const styles = theme => ({
  root: {
    marginBottom: 100
  },
  content: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    padding: (0, theme.spacing.unit * 2)
  }
});

// Special characters
/*
const voltageSign = "V";
const currentSign = "A";
const frequencySign = "Hz";
const ohmSign = "\u2126";
const degreeSign = "\u00B0";
const degreeCelsiusSign = "\u00B0C";
*/

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
  RunningNoiseLevel: "RunningNoiseLevel"
};
//const voltageRanges = [
//  { value: 0, label: "1000V" },
//  { value: 1, label: "100V" }
//];
//const currentRanges = [
//  { value: 0, label: "2A" },
//  { value: 1, label: "400mA" },
//  { value: 2, label: "200mA" },
//  { value: 3, label: "40mA" },
//  { value: 4, label: "20mA" },
//  { value: 5, label: "4mA" },
//  { value: 6, label: "2mA" },
//  { value: 7, label: "400uA" }
//];
//const aboutLabels = {
//  model: "Model",
//  description: "Description",
//  frequencyRanges: "Frequency Ranges",
//  voltageRanges: "Voltage Ranges",
//  currentRanges: "Current Ranges",
//  temperatureSensor: "Temperature Sensor",
//  macAddress: "Mac Address",
//  ipAddress: "IP Address",
//  subnetMask: "Subnet Mask",
//  router: "Router",
//  port: "Port",
//  sifBoard: "SIF Board",
//  sifFirmware: "SIF Firmware",
//  sifSerialNumber: "SIF Serial Number",
//  zimBoard: "ZIM Board",
//  zimFirmware: "ZIM Firmware",
//  zimSerialNumber: "ZIM Serial Number"
//};
//const colHeaders = {
//  pt: "Pt",
//  time: "Time [s]",
//  frequency: "Freq [Hz]",
//  zreal: "Zreal [" + { ohmSign } + "]",
//  zimag: "Zimag [" + { ohmSign } + "]",
//  zmod: "Zmod [" + { ohmSign } + "]",
//  zphase: "Zphase [" + { degreeSign } + "]",
//  idc: "Idc [A]",
//  vdc: "vdc [V]",
//  temperature: "Temperature [" + { degreeCelsiusSign } + "]",
//  currentRange: "IRange [A]"
//};
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
/*
const parameterLabels = {
  initialFrequency: {
    label: "Initial Frequency",
    min: 0.1,
    max: 4000,
    default: 1000
  },
  finalFrequency: { label: "Final Frequency", min: 0.1, max: 4000, default: 1 },
  density: { label: "Density", min: 1, max: 20, default: 10 },
  iteration: { label: "Iteration", min: 1, max: 100, default: 1 },
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
*/

class ChannelPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      about: null,
      channel: null,
      cook: null,

      parameters: defaultParameters,
      activeIndex: -1,

      auxData: []
    };

    this.loadAboutAsync = this.loadAboutAsync.bind(this);
    this.loadChannelAsync = this.loadChannelAsync.bind(this);
    this.loadCookAsync = this.loadCookAsync.bind(this);
    this.loadSamplesAsync = this.loadSamplesAsync.bind(this);
  }

  componentWillMount() {
    clearInterval(this.timerID);
  }

  componentDidMount() {
    this.loadAboutAsync();
    this.loadChannelAsync();
    this.timerID = setInterval(() => this.loadChannelAsync, 1000);
  }

  async loadAboutAsync() {
    const { ipAddress } = this.props;
    try {
      const aboutURL = "http://" + ipAddress + "/about";
      const aboutFetch = await fetch(aboutURL);
      const aboutJson = await aboutFetch.json();
      if (aboutJson) {
        this.setState({
          about: aboutJson
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async loadChannelAsync() {
    const { ipAddress } = this.props;
    try {
      const channelURL = "http://" + ipAddress + "/channel";
      const channelFetch = await fetch(channelURL);
      const channelJson = await channelFetch.json();
      if (channelJson) {
        const state = Object.keys(states).find(
          key => states[key] === channelJson.state
        );
        channelJson.isIdle = state === states.Idle;
        channelJson.isRunning =
          state === states.Running ||
          state === states.Finished ||
          state === states.Stopped;
        channelJson.isRunningNoiseLevel = state === states.RunningNoiseLevel;

        /*
        if (state === states.Running && this.state.channel.isIdle) {
          this.handleSnackBar("Started");
        } else if (state === states.Finished) {
          this.handleSnackBar("Successfully finished");
        } else if (state === states.Stopped) {
          this.handleSnackBar("Manually stopped");
        }
        */

        // Update state: channel and auxData
        const newAuxItem = {
          time: new Date().getTime() - launched,
          voltage: channelJson.auxVoltage,
          temperature: channelJson.auxTemperature
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
            this.loadCookAsync();
          }
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      //clearInterval(this.timerID );
    }
  }

  async loadCookAsync() {
    const { ipAddress } = this.props;
    try {
      const cookURL = "http://" + ipAddress + "/cook";
      const cookFetch = await fetch(cookURL);
      const cookJson = await cookFetch.json();
      if (cookJson) {
        cookJson.started.moment = moment(
          cookJson.started.ticks - dateTimeOffset
        );
        this.setState({
          cook: cookJson,
          parameters: { ...cookJson.parameters }
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async loadSamplesAsync(index) {
    try {
      const samplesURL =
        "http://" + this.props.ipAddress + "/sample?" + index.toString();
      const samplesFetch = await fetch(samplesURL);
      const samplesJson = await samplesFetch.json();
      if (
        samplesJson &&
        this.state.cook &&
        this.state.cook.data &&
        index >= 0 &&
        index < this.state.cook.data.length
      ) {
        // Update state: cook[index].samples
        const data = this.state.cook.data.map((item, j) => {
          if (j === index) {
            return (item.samples = samplesJson);
          } else {
            return item;
          }
        });
        this.setState({
          cook: {
            ...this.state.cook,
            [data]: data
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { classes } = this.props;
    const { about, channel, cook } = this.state;
    return (
      <AppContent className={classes.root}>
        <div className={classes.content}>
          <h2>About</h2>
          {about ? (
            <ReactJson src={about} displayDataTypes={false} collapsed={true} />
          ) : (
            <div />
          )}
          <h2>Channel</h2>
          {channel ? (
            <ReactJson
              src={channel}
              displayDataTypes={false}
              collapsed={true}
            />
          ) : (
            <div />
          )}
          <h2>Cook</h2>
          {cook ? (
            <ReactJson src={cook} displayDataTypes={false} collapsed={true} />
          ) : (
            <div />
          )}
        </div>
      </AppContent>
    );
  }
}

ChannelPage.propTypes = {
  classes: PropTypes.object.isRequired,
  ipAddress: PropTypes.string.isRequired
};

export default withStyles(styles)(ChannelPage);
