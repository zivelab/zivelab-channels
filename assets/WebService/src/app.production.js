function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// To precompile this, copy this code and paste to https://babeljs.io/repl.
// Select es2017, stage-2, and react
const {
  AppBar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  colors,
  Container,
  createMuiTheme,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Grid,
  Icon,
  IconButton,
  LinearProgress,
  MenuItem,
  MuiThemeProvider,
  Paper,
  Snackbar,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  withStyles
} = MaterialUI;

const styles = theme => ({
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed

  },
  appBar: {
    transition: theme.transitions.create("width"),
    "@media print": {
      position: "absolute"
    }
  },
  appBarTitle: {
    flex: 1
  },
  appBarSpacer: theme.mixins.toolbar,
  layout: {
    width: "auto",
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(900 + theme.spacing(3 * 2))]: {
      width: 900,
      marginLeft: "auto",
      marginRight: "auto"
    },
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  cardChart: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  cardControls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  grow: {
    flexGrow: 1
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  gridContainer: {
    width: "100%",
    margin: 0
  },
  menu: {
    width: 200
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500
  },
  table: {
    fontFamily: theme.typography.fontFamily,
    width: "100%"
  },
  tableCell: {
    flex: 1
  },
  tableContainer: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  close: {
    padding: theme.spacing(1)
  },
  chartOuterContainer169: {
    paddingBottom: "56.25%"
    /* 16:9 */
    ,
    position: "relative",
    height: 0 //backgroundColor: "#F5F5F5",

  },
  chartInnerContainer: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%" //backgroundColor: "#F5F5F5",

  },
  areaPlotDefault: {
    // not working
    fill: "#F5F5F5",
    fillOpacity: 0.25,
    stroke: "#F5F5F5"
  },
  areaPlotPrimary: {
    fill: theme.palette.primary.light,
    stroke: theme.palette.primary.light
  },
  areaPlotSecondary: {
    fill: theme.palette.secondary.light,
    stroke: theme.palette.secondary.light
  },
  scatterPlotDefault: {
    fill: theme.palette.text.secondary
  },
  scatterPlotPrimary: {
    fill: theme.palette.primary.light
  },
  scatterPlotSecondary: {
    fill: theme.palette.secondary.light
  },
  linePlotDefault: {
    stroke: theme.palette.primary.main
  },
  referenceLine: {
    stroke: theme.palette.divider
  }
}); // https://developer.mozilla.org/en-US/docs/Web/API/Request


const isDemo = window.location.protocol === "file:";
const aboutURL = isDemo ? new Request("https://raw.githubusercontent.com/zivelab/zivelab-channels/master/demo/json/about.json") : new Request("/about");
const channelURL = isDemo ? new Request("https://raw.githubusercontent.com/zivelab/zivelab-channels/master/demo/json/channel.json") : new Request("/channel");
const cookURL = isDemo ? new Request("https://raw.githubusercontent.com/zivelab/zivelab-channels/master/demo/json/cook.json") : new Request("/cook");

function samplesURL(index) {
  const request = isDemo ? new Request("https://raw.githubusercontent.com/zivelab/zivelab-channels/master/demo/json/samples.json?index=" + index) : new Request("/samples?index=" + index);
  return request;
}

const startURL = new Request("/start");
const stopURL = new Request("/stop");

function getTheme(themeName) {
  const theme = createMuiTheme({
    nprogress: {
      color: themeName === "light" ? "#000" : "#fff"
    },
    palette: {
      type: themeName,
      primary: {
        50: "#e3f2fd",
        100: "#bbdefb",
        200: "#90caf9",
        300: "#64b5f6",
        400: "#42a5f5",
        500: "#2196f3",
        600: "#1e88e5",
        700: "#1976d2",
        800: "#1565c0",
        900: "#0d47a1",
        A100: "#82b1ff",
        A200: "#448aff",
        A400: "#2979ff",
        A700: "#2962ff",
        contrastText: "#fff",
        dark: "#1976d2",
        light: "#64b5f6",
        main: "#2196f3"
      },
      secondary: {
        contrastText: "#fff",
        dark: "rgb(157, 0, 56)",
        light: "rgb(231, 51, 115)",
        main: "rgb(225, 0, 80)"
      },
      background: {
        default: themeName === "light" ? "#fff" : "#303030"
      }
    }
  });
  theme.palette.background.level1 = themeName === "light" ? theme.palette.grey[100] : theme.palette.grey[900];
  theme.palette.background.level0 = themeName === "light" ? theme.palette.grey[50] : theme.palette.grey[900]; // Expose the theme as a global variable so people can play with it.

  window.theme = theme;
  return theme;
} // special characters


const SYMBOLS = {
  DEGREE: "\u00B0",
  DEGREE_CELSIUS: "\u00B0C",
  NAN: "\u25A0\u25A0.\u25A0",
  OHM: "\u2126"
}; // Math Constatnts

const dateTimeOffset = 62135596800000; // ticks from 0000-01-01 to 1970-01-01

const launched = new Date().getTime(); // Color palette for charting
// http://ksrowell.com/blog-visualizing-data/2012/02/02/optimal-colors-for-graphs/

const palette = {
  bar: ["#396AB1", "#DA7C30", "#3E9651", "#CC2529", "#535154", "#6B4C9A", "#922428", "#948B3D"],
  line: ["#3869B1", "#DA7E30", "#3F9852", "#CC2428", "#535055", "#6B4C9A", "#922427", "#958C3D"]
}; // Device specfic constants

const states = {
  NotAssigned: "NotAssigned",
  Idle: "Idle",
  Running: "Running",
  Finished: "Finished",
  Stopped: "Stopped",
  RunningNoiseLevel: "RunningNoiseLevel",
  TooHotFET: "TooHotFET",
  Failed: "Failed",
  NotYetReady: "NotYetReady",
  // cause of transient Vac.
  NotYetCalibrated: "NotYetCalibrated"
};
const defaultVoltageRanges = [{
  value: 0,
  label: "1000V"
}, {
  value: 1,
  label: "100V"
}];
const defaultCurrentRanges = [{
  value: 0,
  label: "2A"
}, {
  value: 1,
  label: "400mA"
}, {
  value: 2,
  label: "200mA"
}, {
  value: 3,
  label: "40mA"
}, {
  value: 4,
  label: "20mA"
}, {
  value: 5,
  label: "4mA"
}, {
  value: 6,
  label: "2mA"
}, {
  value: 7,
  label: "400uA"
}];
const aboutLabels = {
  hostName: "Host Name",
  model: "Model",
  description: "Description",
  frequencyRanges: "Frequency Ranges",
  voltageRanges: "Voltage Ranges",
  currentRanges: "Current Ranges",
  maxPowerRating: "Max Power Rating",
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
const defaultParameters = {
  initialFrequency: 1000,
  finalFrequency: 1.0,
  density: 10,
  iteration: 1,
  currentRange: 2,
  maxInitialDelay: 12.0,
  skip: 1,
  cycles: 0,
  expectedZ: 0.01
};
const parameterLabels = {
  initialFrequency: {
    label: "Initial Frequency",
    min: 0.1,
    max: 4000,
    default: 1000
  },
  finalFrequency: {
    label: "Final Frequency",
    min: 0.1,
    max: 4000,
    default: 1
  },
  density: {
    label: "Density",
    min: 1,
    max: 20,
    default: 10
  },
  iteration: {
    label: "Iteration",
    min: 1,
    max: 100,
    default: 1
  },
  currentRange: {
    label: "Current Range",
    min: 0,
    max: 7,
    default: 2
  },
  maxInitialDelay: {
    label: "Max Initial Delay",
    min: 0,
    max: 100,
    default: 12
  },
  skip: {
    label: "skip",
    min: 1,
    max: 100,
    default: 1
  },
  cycles: {
    label: "cycles",
    min: 0,
    max: 100,
    default: 0
  }
}; // Global functions

function renderNoShape() {
  return null;
}

function durationFormat(durationAsSeconds) {
  return moment.utc(durationAsSeconds * 1000).format("HH:mm:ss");
}

function exportTableToCsv(tableId, filename) {
  if (filename === null || typeof filename === undefined) filename = tableId;
  filename += ".csv";
  const BOM = "\uFEFF";
  const table = document.getElementById(tableId);
  let csvString = BOM;

  for (var rowCnt = 0; rowCnt < table.rows.length; rowCnt++) {
    let rowData = table.rows[rowCnt].cells;

    for (var colCnt = 0; colCnt < rowData.length; colCnt++) {
      let columnData = rowData[colCnt].innerHTML;

      if (columnData === null || columnData.length === 0) {
        columnData = "".replace(/"/g, '""');
      } else {
        columnData = columnData.toString().replace(/"/g, '""'); // escape double quotes
      }

      csvString = csvString + '"' + columnData + '",';
    }

    csvString = csvString.substring(0, csvString.length - 1);
    csvString = csvString + "\r\n";
  }

  csvString = csvString.substring(0, csvString.length - 1); // IE 10, 11, Edge Run

  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    const blob = new Blob([decodeURIComponent(csvString)], {
      type: "text/csv;charset=utf8"
    });
    window.navigator.msSaveOrOpenBlob(blob, filename);
  } else if (window.Blob && window.URL) {
    // HTML5 Blob
    const blob = new Blob([csvString], {
      type: "text/csv;charset=utf8"
    });
    const csvUrl = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.setAttribute("style", "display:none");
    a.setAttribute("href", csvUrl);
    a.setAttribute("download", filename);
    document.body.appendChild(a);
    a.click();
    a.remove();
  } else {
    // Data URI
    const csvData = "data:application/csv;charset=utf-8," + encodeURIComponent(csvString); //const blob = new Blob([csvString], { type: "text/csv;charset=utf8" });
    //const csvUrl = URL.createObjectURL(blob);

    let a = document.createElement("a");
    a.setAttribute("style", "display:none");
    a.setAttribute("target", "_blank");
    a.setAttribute("href", csvData);
    a.setAttribute("download", filename);
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
}

function LightBulbIcon(props) {
  return React.createElement(SvgIcon, props, React.createElement("path", {
    d: "M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1, 1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9A7,7 0 0,0 12,2M9,21A1,1 0 0,0 10, 22H14A1,1 0 0,0 15,21V20H9V21Z"
  }));
}

function LightBulbOutlineIcon(props) {
  return React.createElement(SvgIcon, props, React.createElement("path", {
    d: "M12,2A7,7 0 0,1 19,9C19,11.38 17.81,13.47 16,14.74V17A1,1 0 0,1 15,18H9A1, 1 0 0,1 8,17V14.74C6.19,13.47 5,11.38 5,9A7,7 0 0,1 12,2M9,21V20H15V21A1,1 0 0,1 14, 22H10A1,1 0 0,1 9,21M12,4A5,5 0 0,0 7,9C7,11.05 8.23,12.81 10,13.58V16H14V13.58C15.77, 12.81 17,11.05 17,9A5,5 0 0,0 12,4Z"
  }));
}

function ArrowDownBoxIcon(props) {
  return React.createElement(SvgIcon, props, React.createElement("path", {
    d: "M3 5a2 2 0 0 1 2-2h14c1.104 0 2 .896 2 2v14c0 1.104-.896 2-2 2H5a2 2 0 0 1-2-2V5zm8 1v8.51l-3.505-3.505L6.08 12.42 12 18.34l5.92-5.92-1.415-1.414L13 14.51V6h-2z"
  }));
} // https://github.com/feross/clipboard-copy
// https://unpkg.com/clipboard-copy@latest/index.js returns Uncaught ReferenceError: module is not defined


function clipboardCopy(text) {
  // Use the Async Clipboard API when available. Requires a secure browing
  // context (i.e. HTTPS)
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  } // ...Otherwise, use document.execCommand() fallback
  // Put the text to copy into a <span>


  var span = document.createElement("span");
  span.textContent = text; // Preserve consecutive spaces and newlines

  span.style.whiteSpace = "pre"; // Add the <span> to the page

  document.body.appendChild(span); // Make a selection object representing the range of text selected by the user

  var selection = window.getSelection();
  var range = window.document.createRange();
  selection.removeAllRanges();
  range.selectNode(span);
  selection.addRange(range); // Copy text to the clipboard

  var success = false;

  try {
    success = window.document.execCommand("copy");
  } catch (err) {
    console.log("error", err);
  } // Cleanup


  selection.removeAllRanges();
  window.document.body.removeChild(span); // The Async Clipboard API returns a promise that may reject with `undefined`
  // so we match that here for consistency.

  return success ? Promise.resolve() : Promise.reject(); // eslint-disable-line prefer-promise-reject-errors
} //#region AboutDialogWrapped


class AboutDialog extends React.Component {
  constructor(...args) {
    var _this;

    super(...args);
    _this = this;

    _defineProperty(this, "handleCopy",
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      yield clipboardCopy(JSON.stringify(_this.props.about, undefined, 3));
    }));
  }

  render() {
    const {
      classes,
      about,
      onClose,
      ...other
    } = this.props;
    const title = about ? "About " + about.hostName : "About";
    return about && React.createElement(Dialog, _extends({
      onClose: onClose,
      scroll: "paper",
      "aria-labelledby": "dialog-about"
    }, other), React.createElement(DialogTitle, {
      id: "dialog-about"
    }, title), React.createElement(DialogContent, null, Object.keys(about).map((key, index) => React.createElement(TextField, {
      id: key,
      key: key,
      label: aboutLabels[key],
      className: classes.textField,
      value: about[key] ? about[key] : "Not assigned",
      margin: "normal",
      multiline: true,
      InputProps: {
        readOnly: true
      }
    }))), React.createElement(DialogActions, null, React.createElement(Button, {
      color: "primary",
      onClick: this.handleCopy,
      disabled: false
    }, "Copy to Clipboard")));
  }

}

AboutDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  about: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};
const AboutDialogWrapped = withStyles(styles)(AboutDialog); //#endregion AboutDialogWrapped
//#region SetUpDialog

class SetUpDialog extends React.Component {
  render() {
    const {
      classes,
      parameters,
      currentRanges,
      onClose,
      onStart,
      onChange,
      ...other
    } = this.props;
    return parameters && React.createElement(Dialog, _extends({
      onClose: onClose,
      scroll: "paper",
      "aria-labelledby": "dialog-parameters"
    }, other), React.createElement(DialogTitle, {
      id: "dialog-parameters-title"
    }, "Parameters to setup experiment"), React.createElement(DialogContent, null, React.createElement(TextField, {
      id: "initialFrequency",
      label: "Initial Frequency (Hz)",
      value: parameters.initialFrequency,
      type: "number",
      margin: "dense" //helperText="The starting point for frequency sweep"
      ,
      className: classes.textField,
      onChange: e => onChange(e, "initialFrequency")
    }), React.createElement(TextField, {
      id: "finalFrequency",
      label: "Final Frequency (Hz)",
      value: parameters.finalFrequency,
      type: "number",
      margin: "dense" //helperText="The ending point for frequency sweep"
      ,
      className: classes.textField,
      onChange: e => onChange(e, "finalFrequency")
    }), React.createElement(TextField, {
      id: "density",
      label: "Density (Pt/dec)",
      value: parameters.density,
      type: "number",
      margin: "dense" //helperText="The number of data points in each decade in frequency"
      ,
      className: classes.textField,
      onChange: e => onChange(e, "density")
    }), React.createElement(TextField, {
      id: "iteration",
      label: "Iteration",
      value: parameters.iteration,
      type: "number",
      margin: "dense",
      className: classes.textField,
      onChange: e => onChange(e, "iteration")
    }), React.createElement(TextField, {
      id: "currentRange",
      label: "Current Range",
      select: true,
      value: parameters.currentRange,
      margin: "dense",
      className: classes.textField,
      onChange: e => onChange(e, "currentRange"),
      SelectProps: {
        MenuProps: {
          className: classes.menu
        }
      }
    }, currentRanges.map(option => React.createElement(MenuItem, {
      key: option.value,
      value: option.value
    }, option.label))), React.createElement(TextField, {
      id: "maxInitialDelay",
      label: "Max Initial Delay (s)",
      value: parameters.maxInitialDelay,
      type: "number",
      margin: "dense",
      className: classes.textField,
      onChange: e => onChange(e, "maxInitialDelay")
    })), React.createElement(DialogActions, null, React.createElement(Button, {
      onClick: onStart,
      color: "primary"
    }, "Start"), React.createElement(Button, {
      onClick: onClose,
      color: "default"
    }, "Cancel")));
  }

}

SetUpDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,
  parameters: PropTypes.object.isRequired,
  currentRanges: PropTypes.array.isRequired
};
const SetUpDialogWrapped = withStyles(styles)(SetUpDialog); //#endregion SetUpDialog
//#region ChartTooltipWrapped

class ChartTooltip extends React.Component {
  render() {
    const {
      classes,
      chartProps,
      ...other
    } = this.props;

    if (chartProps.active && chartProps.payload) {
      const {
        payload
      } = chartProps;
      const xName = payload[0].name;
      const xValue = xName == "Zphase" ? d3.format(".3")(payload[0].value) + payload[0].unit : d3.format(".3s")(payload[0].value) + payload[0].unit;
      const yName = payload[1].name;
      const yValue = yName == "Zphase" ? d3.format(".3")(payload[1].value) + payload[1].unit : d3.format(".3s")(payload[1].value) + payload[1].unit;
      return React.createElement(Paper, {
        className: classes.paper,
        elevation: 1,
        key: "tooltip"
      }, React.createElement(Grid, {
        item: true,
        container: true,
        spacing: 2,
        direction: "row",
        justify: "flex-start",
        alignItems: "baseline"
      }, React.createElement(Grid, {
        item: true,
        container: true,
        xs: 5,
        sm: 5,
        md: 5
      }, React.createElement(Grid, {
        item: true,
        container: true,
        direction: "column",
        alignItems: "flex-start"
      }, React.createElement(Typography, {
        gutterBottom: true,
        variant: "h6"
      }, yName), React.createElement(Typography, {
        gutterBottom: true,
        variant: "h6"
      }, xName))), React.createElement(Grid, {
        item: true,
        container: true,
        xs: 7,
        sm: 7,
        md: 7
      }, React.createElement(Grid, {
        item: true,
        container: true,
        direction: "column",
        alignItems: "flex-end"
      }, React.createElement(Typography, {
        gutterBottom: true,
        variant: "h6"
      }, yValue), React.createElement(Typography, {
        gutterBottom: true,
        variant: "h6"
      }, xValue)))));
    }

    return null;
  }

}

ChartTooltip.propTypes = {
  classes: PropTypes.object.isRequired,
  chartProps: PropTypes.object.isRequired
};
const ChartTooltipWrapped = withStyles(styles)(ChartTooltip);

function RenderChartTooltip(props) {
  return React.createElement(ChartTooltipWrapped, {
    chartProps: props
  });
} //#endregion ChartTooltipgWrapped
//#region SparklineWrapped


class Sparkline extends React.Component {
  render() {
    const {
      classes,
      data,
      scatter,
      xKey,
      xUnit,
      yKey,
      yUnit,
      plotStyle,
      ...other
    } = this.props;

    if (!data) {
      return null;
    }

    if (scatter) {
      const scatterStyle = plotStyle ? plotStyle : classes.scatterPlotDefault;
      return React.createElement(Recharts.ResponsiveContainer, {
        width: "100%",
        height: 50
      }, React.createElement(Recharts.ScatterChart, null, React.createElement(Recharts.XAxis, {
        type: "number",
        dataKey: xKey,
        name: xKey,
        unit: xUnit,
        tickFormatter: d3.format(".0s"),
        domain: ["auto", "auto"],
        hide: true
      }), React.createElement(Recharts.YAxis, {
        type: "number",
        dataKey: yKey,
        name: yKey,
        unit: yUnit,
        tickFormatter: d3.format(".3f"),
        domain: ["auto", "auto"],
        hide: true
      }), React.createElement(Recharts.Scatter, {
        data: data,
        type: "monotone",
        fill: palette.bar[0],
        line: false
      })));
    } else {
      const areaStyle = plotStyle ? plotStyle : classes.areaPlotDefault;
      return React.createElement(Recharts.ResponsiveContainer, {
        width: "100%",
        height: 60
      }, React.createElement(Recharts.AreaChart, {
        data: data
      }, React.createElement(Recharts.XAxis, {
        type: "number",
        dataKey: xKey,
        name: xKey,
        unit: xUnit,
        tickFormatter: d3.format(".0s"),
        domain: ["auto", "auto"],
        hide: true
      }), React.createElement(Recharts.YAxis, {
        type: "number",
        name: yKey,
        unit: yUnit,
        tickFormatter: d3.format(".3f"),
        domain: ["auto", "auto"],
        hide: true
      }), React.createElement(Recharts.Area, {
        type: "monotone",
        dataKey: yKey,
        fill: palette.bar[2],
        stroke: palette.bar[2]
      })));
    }
  }

}

Sparkline.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  plotStyle: PropTypes.object,
  scatter: PropTypes.bool,
  xKey: PropTypes.string.isRequired,
  xUnit: PropTypes.string.isRequired,
  yKey: PropTypes.string.isRequired,
  yUnit: PropTypes.string.isRequired
};
const SparklineWrapped = withStyles(styles)(Sparkline); //#endregion SparklineWrapped
//#region LissajousCurveWrapped

class LissajousCurve extends React.Component {
  render() {
    const {
      classes,
      channel,
      cook,
      index,
      plotStyle,
      ...other
    } = this.props;
    const lineStyle = plotStyle ? plotStyle : classes.linePlotDefault;
    const isIdle = channel ? channel.isIdle : false;
    const isRunning = channel ? channel.isRunning : false;
    const samples = isRunning ? channel.stepSamples : isIdle && cook && cook.data && index >= 0 && index < cook.data.length && cook.data[index].samples && cook.data[index].samples.data ? cook.data[index].samples.data : null;

    if (!samples) {
      return React.createElement("div", {
        className: classes.chartOuterContainer169
      }, React.createElement("div", {
        className: classes.chartInnerContainer
      }));
    }

    return React.createElement("div", {
      className: classes.chartOuterContainer169
    }, React.createElement("div", {
      className: classes.chartInnerContainer
    }, React.createElement(Recharts.ResponsiveContainer, null, React.createElement(Recharts.LineChart, {
      data: samples
    }, React.createElement(Recharts.XAxis, {
      type: "number",
      dataKey: "voltage",
      name: "Voltage",
      unit: "V",
      tickFormatter: d3.format(".0s"),
      domain: ["auto", "auto"],
      hide: true
    }), React.createElement(Recharts.YAxis, {
      type: "number",
      name: "Current",
      unit: "A",
      tickFormatter: d3.format(".0s"),
      domain: ["auto", "auto"],
      hide: true
    }), React.createElement(Recharts.ReferenceLine, {
      x: 0,
      className: classes.referenceLine
    }), React.createElement(Recharts.ReferenceLine, {
      y: 0,
      className: classes.referenceLine
    }), React.createElement(Recharts.Line, {
      dataKey: "current",
      type: "basis",
      stroke: palette.line[1],
      dot: false
    })))));
  }

}

LissajousCurve.propTypes = {
  classes: PropTypes.object.isRequired,
  channel: PropTypes.object.isRequired,
  cook: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  plotStyle: PropTypes.object
};
const LissajousCurveWrapped = withStyles(styles)(LissajousCurve); //#endregion LissajousCurveWrapped
//#region HeaderWrapped

class Header extends React.Component {
  render() {
    const {
      classes,
      themeName,
      openAbout,
      about,
      onOpenAbout,
      onClose,
      onToggleTheme,
      ...other
    } = this.props;
    const themeIcon = themeName == "dark" ? React.createElement(LightBulbIcon, null) : React.createElement(LightBulbOutlineIcon, null);

    const title = () => {
      if (about) {
        const hostName = about.hostName || "Untitled";
        const model = about.model.startsWith("Zive") ? about.model.split(" ").slice(1).join(" ") : about.model;
        const ip = about.ipAddress;
        const pageTitle = hostName === "Untitled" ? model + " (" + ip + ")" : hostName + " (" + model + ", " + ip + ")"; // update document title

        if (document.title != pageTitle) {
          document.title = pageTitle;
        }

        return pageTitle;
      } else {
        return "Loading...";
      }
    };

    return React.createElement(AppBar, {
      position: "fixed",
      className: classes.appBar
    }, React.createElement(Toolbar, {
      className: classes.toolbar
    }, React.createElement(Typography, {
      variant: "h6",
      color: "inherit",
      noWrap: true,
      className: classes.appBarTitle
    }, title()), React.createElement(IconButton, {
      color: "inherit",
      disabled: !about,
      onClick: onOpenAbout
    }, React.createElement(Tooltip, {
      title: "About device"
    }, React.createElement(Icon, null, "info"))), React.createElement(AboutDialogWrapped, {
      about: about,
      open: openAbout,
      onClose: onClose
    }), React.createElement(IconButton, {
      color: "inherit",
      "aria-label": "Theme",
      onClick: onToggleTheme
    }, React.createElement(Tooltip, {
      title: "Toggle light/dark theme"
    }, themeIcon))));
  }

}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  about: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpenAbout: PropTypes.func.isRequired,
  onToggleTheme: PropTypes.func.isRequired,
  openAbout: PropTypes.bool.isRequired,
  themeName: PropTypes.string.isRequired
};
const HeaderWrapped = withStyles(styles)(Header); //#endregion HeaderWrapped
//#region AuxConsoleWrapped

class AuxConsole extends React.Component {
  render() {
    const {
      classes,
      auxData,
      channel,
      voltageRanges,
      temperatureSensor,
      ...other
    } = this.props;
    const auxVoltageExpression = channel && channel.auxVoltage ? d3.format(".3f")(channel.auxVoltage) + "V" : SYMBOLS.NAN + "V";
    const auxVoltageRangeExpression = channel ? voltageRanges.find(x => x.value == channel.voltageRange).label + " range" : "";
    const auxTemperatureExpression = channel && channel.auxTemperature ? d3.format(".2f")(channel.auxTemperature) + SYMBOLS.DEGREE_CELSIUS : SYMBOLS.NAN + SYMBOLS.DEGREE_CELSIUS;
    const auxTemperatureSensorType = channel && temperatureSensor ? temperatureSensor : "";
    return React.createElement(Grid, {
      container: true,
      spacing: 1,
      direction: "column",
      justify: "flex-start",
      alignItems: "stretch"
    }, React.createElement(Grid, {
      item: true,
      container: true,
      xs: 12,
      sm: 12,
      md: 12
    }, React.createElement(Grid, {
      item: true,
      xs: 6,
      sm: 6,
      md: 6
    }, React.createElement(Typography, {
      gutterBottom: true,
      variant: "h6"
    }, auxVoltageExpression), React.createElement(Typography, {
      gutterBottom: true,
      component: "p"
    }, auxVoltageRangeExpression)), React.createElement(Grid, {
      item: true,
      xs: 6,
      sm: 6,
      md: 6
    }, React.createElement(SparklineWrapped, {
      data: auxData,
      xKey: "time",
      xUnit: "s",
      yKey: "voltage",
      yUnit: "V"
    }))), React.createElement(Grid, {
      item: true,
      container: true,
      xs: 12,
      sm: 12,
      md: 12
    }, React.createElement(Grid, {
      item: true,
      xs: 6,
      sm: 6,
      md: 6
    }, React.createElement(Typography, {
      gutterBottom: true,
      variant: "h6"
    }, auxTemperatureExpression), React.createElement(Typography, {
      gutterBottom: true,
      component: "p"
    }, auxTemperatureSensorType)), React.createElement(Grid, {
      item: true,
      xs: 6,
      sm: 6,
      md: 6
    }, React.createElement(SparklineWrapped, {
      data: auxData,
      xKey: "time",
      xUnit: "s",
      yKey: "temperature",
      yUnit: SYMBOLS.DEGREE_CELSIUS
    }))));
  }

}

AuxConsole.propTypes = {
  classes: PropTypes.object.isRequired,
  auxData: PropTypes.object.isRequired,
  channel: PropTypes.object.isRequired,
  voltageRanges: PropTypes.array.isRequired,
  temperatureSensor: PropTypes.string.isRequired
};
const AuxConsoleWrapped = withStyles(styles)(AuxConsole); //#endregion AuxConsoleWrapped
//#region AuxPanelWrapped

class AuxPanel extends React.Component {
  render() {
    const {
      classes,
      auxData,
      channel,
      voltageRanges,
      temperatureSensor,
      onClear,
      ...other
    } = this.props;
    const auxVoltageExpression = channel ? d3.format(".3f")(channel.auxVoltage) + "V" : SYMBOLS.NAN + "V";
    const auxVoltageRangeExpression = channel ? voltageRanges.find(x => x.value == channel.voltageRange).label + " range" : "";
    const auxTemperatureExpression = channel ? d3.format(".2f")(channel.auxTemperature) + SYMBOLS.DEGREE_CELSIUS : SYMBOLS.NAN + SYMBOLS.DEGREE_CELSIUS;
    const auxTemperatureSensorType = channel ? "PT100" : "";
    return React.createElement(Card, null, React.createElement(CardHeader //title="Aux. Readings"
    , {
      subheader: "Aux. Readings",
      action: React.createElement("div", {
        className: classes.cardControls
      }, React.createElement(Tooltip, {
        title: "Clear"
      }, React.createElement(IconButton, {
        "aria-label": "Clear",
        onClick: onClear
      }, React.createElement(Icon, {
        fontSize: "large",
        color: "action"
      }, "clear_all"))))
    }), React.createElement(CardContent, null, React.createElement(AuxConsole, {
      auxData: auxData,
      channel: channel,
      voltageRanges: voltageRanges,
      temperatureSensor: temperatureSensor
    })));
  }

}

AuxPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  auxData: PropTypes.object.isRequired,
  channel: PropTypes.object.isRequired,
  voltageRanges: PropTypes.array.isRequired,
  temperatureSensor: PropTypes.string.isRequired,
  onClear: PropTypes.func.isRequired
};
const AuxPanelWrapped = withStyles(styles)(AuxPanel); //#endregion AuxPanelWrapped
//#region CookConsoleWrapped

class CookConsole extends React.Component {
  render() {
    const {
      classes,
      channel,
      cook,
      cookIndex,
      onGoFirst,
      onGoPrevious,
      onGoNext,
      onGoLast,
      ...other
    } = this.props;
    const isIdle = channel ? channel.isIdle : false;
    const isRunning = channel ? channel.isRunning : false;
    const isRunningNoiseLevel = channel ? channel.isRunningNoiseLevel : false;
    const cooked = cook ? cook.data : null;

    if (cooked && cookIndex < 0) {
      onGoFirst();
    } else if (cooked && cookIndex > cooked.length) {
      onGoLast();
    }

    const zitem = cooked ? cooked[cookIndex] : null;
    const frequncyExpression = isRunning ? channel.lastFrequency ? d3.format(".4s")(channel.lastFrequency) + "Hz" : SYMBOLS.NAN + "Hz" : zitem ? d3.format(".4s")(zitem.frequency) + "Hz" : SYMBOLS.NAN + "Hz";
    const zModulusExpression = isRunning ? channel.lastZmod ? d3.format(".4s")(channel.lastZmod) + SYMBOLS.OHM : SYMBOLS.NAN + SYMBOLS.OHM : zitem ? d3.format(".4s")(zitem.zmod) + SYMBOLS.OHM : SYMBOLS.NAN + SYMBOLS.OHM;
    const zPhaseExpression = isRunning ? channel.lastZphase ? d3.format(".2f")(channel.lastZphase) + SYMBOLS.DEGREE : SYMBOLS.NAN + SYMBOLS.DEGREE : zitem ? d3.format(".2f")(zitem.zphase) + SYMBOLS.DEGREE : SYMBOLS.NAN + SYMBOLS.DEGREE;
    const auxVExpression = isRunning ? " " : zitem ? d3.format(".2f")(zitem.vdc) + "V" : SYMBOLS.NAN + "V";
    return React.createElement(Grid, {
      container: true,
      spacing: 2,
      direction: "row",
      justify: "flex-start",
      alignItems: "center"
    }, React.createElement(Grid, {
      item: true,
      container: true,
      spacing: 2,
      direction: "column",
      justify: "flex-start",
      alignItems: "stretch",
      xs: 12,
      sm: 6,
      md: 6
    }, React.createElement(Grid, {
      item: true,
      container: true,
      direction: "row",
      justify: "flex-start",
      alignItems: "baseline",
      xs: 12,
      sm: 12,
      md: 12
    }, React.createElement(Grid, {
      item: true,
      container: true,
      xs: 4,
      sm: 4,
      md: 4
    }, React.createElement(Grid, {
      item: true,
      container: true,
      direction: "column",
      alignItems: "flex-start"
    }, React.createElement(Typography, {
      gutterBottom: true,
      variant: "h6"
    }, frequncyExpression), React.createElement(Typography, {
      gutterBottom: true,
      variant: "h6"
    }, auxVExpression))), React.createElement(Grid, {
      item: true,
      container: true,
      xs: 8,
      sm: 8,
      md: 8
    }, React.createElement(Grid, {
      item: true,
      container: true,
      direction: "column",
      alignItems: "flex-end"
    }, React.createElement(Typography, {
      gutterBottom: true,
      variant: "h5"
    }, zModulusExpression), React.createElement(Typography, {
      gutterBottom: true,
      variant: "h5"
    }, zPhaseExpression)))), React.createElement(Divider, {
      variant: "middle"
    }), isRunning ? React.createElement(Grid, {
      item: true,
      container: true,
      direction: "row",
      justify: "flex-start",
      alignItems: "center",
      xs: 12,
      sm: 12,
      md: 12
    }, React.createElement(Grid, {
      item: true,
      container: true,
      xs: 6,
      sm: 6,
      md: 6
    }, React.createElement(Grid, {
      item: true,
      container: true
    }, React.createElement(Typography, {
      gutterBottom: true,
      variant: "h6"
    }, durationFormat(channel.elapsedTime)))), React.createElement(Grid, {
      item: true,
      container: true,
      xs: 6,
      sm: 6,
      md: 6
    }, React.createElement(Grid, {
      item: true,
      container: true,
      direction: "column",
      justify: "center",
      alignItems: "stretch"
    }, React.createElement("div", {
      className: classes.grow
    }, React.createElement(LinearProgress, {
      variant: "determinate",
      value: channel.progress
    }))))) : React.createElement(Grid, {
      item: true,
      container: true,
      direction: "row",
      justify: "space-evenly",
      alignItems: "center",
      xs: 12,
      sm: 12,
      md: 12
    }, React.createElement(IconButton, {
      "aria-label": "GoFirst",
      onClick: onGoFirst,
      disabled: !isIdle || cookIndex <= 0
    }, React.createElement(Tooltip, {
      title: "Go first"
    }, React.createElement(Icon, {
      fontSize: "default"
    }, "first_page"))), React.createElement(IconButton, {
      "aria-label": "GoPrevious",
      onClick: onGoPrevious,
      disabled: !isIdle || cookIndex <= 0
    }, React.createElement(Tooltip, {
      title: "Go previous"
    }, React.createElement(Icon, {
      fontSize: "default"
    }, "chevron_left"))), React.createElement(IconButton, {
      "aria-label": "GoNext",
      onClick: onGoNext,
      disabled: !isIdle || cookIndex < 0 || cookIndex >= cooked.length - 1
    }, React.createElement(Tooltip, {
      title: "Go next"
    }, React.createElement(Icon, {
      fontSize: "default"
    }, "chevron_right"))), React.createElement(IconButton, {
      "aria-label": "GoLast",
      onClick: onGoLast,
      disabled: !isIdle || cookIndex < 0 || cookIndex >= cooked.length - 1
    }, React.createElement(Tooltip, {
      title: "Go last"
    }, React.createElement(Icon, {
      fontSize: "default"
    }, "last_page"))))), React.createElement(Grid, {
      item: true,
      xs: 12,
      sm: 6,
      md: 6
    }, React.createElement(LissajousCurveWrapped, {
      channel: channel,
      cook: cook,
      index: cookIndex
    })));
  }

}

CookConsole.propTypes = {
  classes: PropTypes.object.isRequired,
  cookIndex: PropTypes.number.isRequired,
  channel: PropTypes.object.isRequired,
  cook: PropTypes.object.isRequired,
  onGoFirst: PropTypes.func.isRequired,
  onGoLast: PropTypes.func.isRequired,
  onGoNext: PropTypes.func.isRequired,
  onGoPrevious: PropTypes.func.isRequired
};
const CookConsoleWrapped = withStyles(styles)(CookConsole); //#endregion CookConsoleWrapped
//#region CookPanelWrapped

class CookPanel extends React.Component {
  render() {
    const {
      classes,
      channel,
      cook,
      cookIndex,
      parameters,
      currentRanges,
      openSetUp,
      openSnackbar,
      messageInfo,
      onChangeParameter,
      onClose,
      onOpenSetUp,
      onGoFirst,
      onGoPrevious,
      onGoNext,
      onGoLast,
      onStart,
      onStop,
      onDownload,
      ...other
    } = this.props;
    const isIdle = channel ? channel.isIdle : false;
    const isRunning = channel ? channel.isRunning : false;
    const isRunningNoiseLevel = channel ? channel.isRunningNoiseLevel : false;
    const isTooHot = channel ? channel.isTooHot : false;
    const isFailed = channel ? channel.isFailed : false;
    const notYetReady = channel ? channel.notYetReady : false;
    const notYetCalibrated = channel ? channel.notYetCalibrated : false;
    const started = cook && cook.started && cook.started.moment ? cook.started.moment : null;
    const stateExpression = isRunning ? "Measuring @ " + d3.format(".4s")(channel.stepFrequency) + "Hz" : isRunningNoiseLevel ? "Measuring noise level..." : isTooHot ? "Heat sink is very hot..." : isFailed ? "Something wrong, check cables..." : notYetReady ? "Not yet ready, unstable Vac..." : notYetCalibrated ? "Not yet calibrated..." : cook && cook.data.length > 0 ? "Cooked, " + started.fromNow() : channel ? "Ready" : "Loading...";
    return React.createElement(Card, null, React.createElement(CardHeader, {
      subheader: stateExpression,
      action: React.createElement("div", {
        className: classes.cardControls
      }, React.createElement(IconButton, {
        "aria-label": "Start",
        onClick: onOpenSetUp,
        disabled: !isIdle,
        color: "primary"
      }, React.createElement(Tooltip, {
        title: "Start"
      }, React.createElement(Icon, {
        fontSize: "large"
      }, "play_arrow"))), React.createElement(SetUpDialogWrapped, {
        open: openSetUp,
        parameters: parameters,
        currentRanges: currentRanges,
        onClose: onClose,
        onStart: onStart,
        onChange: onChangeParameter
      }), React.createElement(IconButton, {
        "aria-label": "Stop",
        onClick: onStop,
        disabled: !isRunning,
        color: "secondary"
      }, React.createElement(Tooltip, {
        title: "Stop"
      }, React.createElement(Icon, {
        fontSize: "large"
      }, "stop"))), React.createElement(IconButton, {
        "aria-label": "Download",
        onClick: onDownload,
        disabled: !isIdle || !cook || cook.data.length < 1,
        color: "default"
      }, React.createElement(Tooltip, {
        title: "Save as CSV"
      }, React.createElement(ArrowDownBoxIcon, {
        fontSize: "large"
      }))), React.createElement(Snackbar, {
        key: messageInfo.key,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left"
        },
        open: openSnackbar,
        autoHideDuration: 3000,
        onClose: onClose,
        ContentProps: {
          "aria-describedby": "message-id"
        },
        message: React.createElement("span", {
          id: "message-id"
        }, messageInfo.message),
        action: [React.createElement(IconButton, {
          key: "close",
          "aria-label": "Close",
          color: "inherit",
          className: classes.close,
          onClick: onClose
        }, React.createElement(Icon, null, "close"))]
      }))
    }), React.createElement(CardContent, null, React.createElement(CookConsoleWrapped, {
      cookIndex: cookIndex,
      channel: channel,
      cook: cook,
      onGoFirst: onGoFirst,
      onGoLast: onGoLast,
      onGoNext: onGoNext,
      onGoPrevious: onGoPrevious
    })));
  }

}

CookPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  cookIndex: PropTypes.number.isRequired,
  channel: PropTypes.object.isRequired,
  cook: PropTypes.object.isRequired,
  messageInfo: PropTypes.object.isRequired,
  parameters: PropTypes.object.isRequired,
  currentRanges: PropTypes.array.isRequired,
  onChangeParameter: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onGoFirst: PropTypes.func.isRequired,
  onGoLast: PropTypes.func.isRequired,
  onGoNext: PropTypes.func.isRequired,
  onGoPrevious: PropTypes.func.isRequired,
  onOpenSetUp: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  openSetUp: PropTypes.bool.isRequired,
  openSnackbar: PropTypes.bool.isRequired
};
const CookPanelWrapped = withStyles(styles)(CookPanel); //#endregion CookPanelWrapped
//#region NyquistPanelWrapped

class NyquistPanel extends React.Component {
  render() {
    const {
      classes,
      cook,
      ...other
    } = this.props;
    const cooked = cook ? cook.data : null;
    return cooked && cooked.length > 0 && React.createElement(Card, null, React.createElement(CardContent, {
      className: classes.cardChart
    }, React.createElement(Recharts.ResponsiveContainer, {
      width: "100%",
      height: 300
    }, React.createElement(Recharts.ScatterChart, {
      margin: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
      }
    }, React.createElement(Recharts.CartesianGrid, null), React.createElement(Recharts.XAxis, {
      type: "number",
      dataKey: "zreal",
      name: "Zreal",
      unit: "\u2126",
      tickFormatter: d3.format(".3s"),
      domain: ["auto", "auto"]
    }), React.createElement(Recharts.YAxis, {
      type: "number",
      dataKey: "zimag",
      name: "Zimag",
      unit: "\u2126",
      tickFormatter: tick => d3.format(".3s")(-1 * tick),
      domain: ["auto", "auto"],
      reversed: true
    }), React.createElement(Recharts.Tooltip, {
      cursor: {
        strokeDasharray: "3 3"
      },
      content: React.createElement(RenderChartTooltip, null)
    }), React.createElement(Recharts.Scatter, {
      data: cooked,
      type: "monotone",
      line: false,
      className: classes.scatterPlotPrimary
    })))));
  }

}

NyquistPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  cook: PropTypes.object.isRequired
};
const NyquistPanelWrapped = withStyles(styles)(NyquistPanel); //#endregion NyquistPanelWrapped
//#region BodePanelWrapped

class BodePanel extends React.Component {
  render() {
    const {
      classes,
      cook,
      ...other
    } = this.props;
    const cooked = cook ? cook.data : null;
    return cooked && cooked.length > 0 && React.createElement(Card, null, React.createElement(CardContent, {
      className: classes.cardChart
    }, React.createElement(Recharts.ResponsiveContainer, {
      width: "100%",
      height: 300
    }, React.createElement(Recharts.ScatterChart, {
      margin: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
      }
    }, React.createElement(Recharts.CartesianGrid, null), React.createElement(Recharts.XAxis, {
      type: "number",
      dataKey: "frequency",
      name: "Frequency",
      unit: "Hz",
      tickFormatter: d3.format(".2s"),
      scale: "log",
      domain: ["auto", "auto"],
      interval: "preserveStartEnd"
    }), React.createElement(Recharts.YAxis, {
      yAxisId: "left",
      type: "number",
      dataKey: "zmod",
      name: "Zmod",
      unit: "\u2126",
      tickFormatter: d3.format(".3s"),
      domain: ["auto", "auto"]
    }), React.createElement(Recharts.YAxis, {
      yAxisId: "right",
      type: "number",
      dataKey: "zphase",
      name: "Zphase",
      unit: "\xB0",
      tickFormatter: d3.format(".2f"),
      domain: ["auto", "auto"],
      orientation: "right"
    }), React.createElement(Recharts.Tooltip, {
      cursor: {
        strokeDasharray: "3 3"
      },
      content: React.createElement(RenderChartTooltip, null)
    }), React.createElement(Recharts.Scatter, {
      yAxisId: "left",
      data: cooked,
      type: "monotone",
      line: false,
      className: classes.scatterPlotPrimary
    }), React.createElement(Recharts.Scatter, {
      yAxisId: "right",
      data: cooked,
      type: "monotone",
      line: false,
      className: classes.scatterPlotSecondary
    })))));
  }

}

BodePanel.propTypes = {
  classes: PropTypes.object.isRequired,
  cook: PropTypes.object.isRequired
};
const BodePanelWrapped = withStyles(styles)(BodePanel); //#endregion BodePanelWrapped
//#region ZTablePanelWrapped

class ZTablePanel extends React.Component {
  render() {
    const {
      classes,
      cook,
      currentRanges,
      scientific,
      ...other
    } = this.props;
    const cooked = cook ? cook.data : null;
    const started = cook && cook.started ? cook.started.moment : null;
    const titleExpression = started ? "Impedance data, measured at " + started.format("HH:mm:ss") + " on " + started.format("YYYY-MM-DD") : "No data";
    return cooked && cooked.length > 0 && React.createElement(ExpansionPanel, null, React.createElement(ExpansionPanelSummary, {
      expandIcon: React.createElement(Icon, null, "expand_more")
    }, React.createElement(Typography, {
      className: classes.heading
    }, titleExpression)), React.createElement(ExpansionPanelDetails, null, React.createElement(Paper, {
      className: classes.tableContainer
    }, React.createElement(Table, {
      className: classes.table,
      id: "cook-table",
      key: "cook-table"
    }, React.createElement(TableHead, null, React.createElement(TableRow, {
      key: "thead"
    }, React.createElement(TableCell, {
      align: "right",
      className: classes.tableCell
    }, "Pt"), React.createElement(TableCell, {
      align: "right",
      className: classes.tableCell
    }, "Time (s)"), React.createElement(TableCell, {
      align: "right",
      className: classes.tableCell
    }, "Freq (Hz)"), React.createElement(TableCell, {
      align: "right",
      className: classes.tableCell
    }, "Zreal (", SYMBOLS.OHM, ")"), React.createElement(TableCell, {
      align: "right",
      className: classes.tableCell
    }, "Zimag (", SYMBOLS.OHM, ")"), React.createElement(TableCell, {
      align: "right",
      className: classes.tableCell
    }, "Zmod (", SYMBOLS.OHM, ")"), React.createElement(TableCell, {
      align: "right",
      className: classes.tableCell
    }, "Zphase (", SYMBOLS.DEGREE, ")"), React.createElement(TableCell, {
      align: "right",
      className: classes.tableCell
    }, "Idc (A)"), React.createElement(TableCell, {
      align: "right",
      className: classes.tableCell
    }, "Vdc (V)"), React.createElement(TableCell, {
      align: "right",
      className: classes.tableCell
    }, "Temp (", SYMBOLS.DEGREE_CELSIUS, ")"), React.createElement(TableCell, {
      align: "right",
      className: classes.tableCell
    }, "IRange"))), React.createElement(TableBody, null, cooked.map((row, index) => React.createElement(TableRow, {
      key: index.toString()
    }, React.createElement(TableCell, {
      component: "th",
      scope: "row"
    }, row.pt), React.createElement(TableCell, {
      align: "right",
      className: classes.tableCell
    }, row.time), React.createElement(TableCell, {
      align: "right",
      className: classes.tableCell
    }, scientific ? d3.format("e")(row.frequency) : d3.format(".6s")(row.frequency)), React.createElement(TableCell, {
      align: "right",
      className: classes.tableCell
    }, scientific ? d3.format("e")(row.zreal) : d3.format(".6s")(row.zreal)), React.createElement(TableCell, {
      align: "right",
      className: classes.tableCell
    }, scientific ? d3.format("e")(row.zimag) : d3.format(".6s")(row.zimag)), React.createElement(TableCell, {
      align: "right",
      className: classes.tableCell
    }, scientific ? d3.format("e")(row.zmod) : d3.format(".6s")(row.zmod)), React.createElement(TableCell, {
      align: "right",
      className: classes.tableCell
    }, d3.format(".3f")(row.zphase)), React.createElement(TableCell, {
      align: "right",
      className: classes.tableCell
    }, scientific ? d3.format("e")(row.idc) : d3.format(".6s")(row.idc)), React.createElement(TableCell, {
      align: "right",
      className: classes.tableCell
    }, d3.format(".3f")(row.vdc)), React.createElement(TableCell, {
      align: "right",
      className: classes.tableCell
    }, d3.format(".3f")(row.temperature)), React.createElement(TableCell, {
      align: "right",
      className: classes.tableCell
    }, currentRanges.find(x => x.value == row.currentRange).label))))))));
  }

}

ZTablePanel.propTypes = {
  classes: PropTypes.object.isRequired,
  cook: PropTypes.object.isRequired,
  currentRanges: PropTypes.array.isRequired,
  scientific: PropTypes.bool
};
ZTablePanel.defaultProps = {
  scientific: false
};
const ZTablePanelWrapped = withStyles(styles)(ZTablePanel); //#endregion ZTablePanelWrapped
// eslint-disable-next-line no-console

console.log(`%c
    
    ███████╗██╗██╗   ██╗███████╗██╗      █████╗ ██████╗ 
    ╚══███╔╝██║██║   ██║██╔════╝██║     ██╔══██╗██╔══██╗
      ███╔╝ ██║██║   ██║█████╗  ██║     ███████║██████╔╝
     ███╔╝  ██║╚██╗ ██╔╝██╔══╝  ██║     ██╔══██║██╔══██╗
    ███████╗██║ ╚████╔╝ ███████╗███████╗██║  ██║██████╔╝
    ╚══════╝╚═╝  ╚═══╝  ╚══════╝╚══════╝╚═╝  ╚═╝╚═════╝ 
    
    ZiveLab-Channels
`, "font-family:monospace;color:#1976d2;font-size:12px;");

class Index extends React.Component {
  constructor(props) {
    var _this2;

    super(props);
    _this2 = this;

    _defineProperty(this, "queue", []);

    _defineProperty(this, "controller", new AbortController());

    _defineProperty(this, "processQueue", () => {
      if (this.queue.length > 0) {
        this.setState({
          messageInfo: this.queue.shift(),
          openSnackbar: true
        });
      }
    });

    _defineProperty(this, "handleChangeParameter", (event, name) => {
      const key = Object.keys(parameterLabels).find(key => key == name);
      const parameter = parameterLabels[key];
      let value = event.target.value;

      if (value < parameter.min) {
        value = parameter.min;
      } else if (value > parameter.max) {
        value = parameter.max;
      }

      if (parameter == parameterLabels.initialFrequency) {
        this.setState({
          parameters: { ...this.state.parameters,
            initialFrequency: value
          }
        });
      } else if (parameter == parameterLabels.finalFrequency) {
        this.setState({
          parameters: { ...this.state.parameters,
            finalFrequency: value
          }
        });
      } else if (parameter == parameterLabels.density) {
        this.setState({
          parameters: { ...this.state.parameters,
            density: value
          }
        });
      } else if (parameter == parameterLabels.iteration) {
        this.setState({
          parameters: { ...this.state.parameters,
            iteration: value
          }
        });
      } else if (parameter == parameterLabels.currentRange) {
        this.setState({
          parameters: { ...this.state.parameters,
            currentRange: value
          }
        });
      } else if (parameter == parameterLabels.maxInitialDelay) {
        this.setState({
          parameters: { ...this.state.parameters,
            maxInitialDelay: value
          }
        });
      }
    });

    _defineProperty(this, "handleClearAuxData", () => {
      this.setState({
        auxData: []
      });
    });

    _defineProperty(this, "handleClose", () => {
      this.setState({
        openAbout: false,
        openSetUp: false,
        openSnackbar: false
      });
    });

    _defineProperty(this, "handleOpenAbout", () => {
      this.setState({
        openAbout: true
      });
    });

    _defineProperty(this, "handleOpenSetUp", () => {
      this.setState({
        openSetUp: true
      });
    });

    _defineProperty(this, "handleGoFirst", () => {
      const index = 0;
      this.setState({
        cookIndex: index
      });
      if (this.state.cook && this.state.cook.data && index < this.state.cook.data.length && !this.state.cook.data[index].samples) this.loadSamplesAsync(index);
    });

    _defineProperty(this, "handleGoNext", () => {
      const index = this.state.cookIndex + 1;
      this.setState({
        cookIndex: index
      });
      if (this.state.cook && this.state.cook.data && index < this.state.cook.data.length && !this.state.cook.data[index].samples) this.loadSamplesAsync(index);
    });

    _defineProperty(this, "handleGoLast", () => {
      const index = this.state.cook.data.length - 1;
      this.setState({
        cookIndex: index
      });

      if (this.state.cook && this.state.cook.data && index < this.state.cook.data.length && !this.state.cook.data[index].samples) {
        this.loadSamplesAsync(index);
      }
    });

    _defineProperty(this, "handleGoPrevious", () => {
      const index = this.state.cookIndex - 1;
      this.setState({
        cookIndex: index
      });
      if (this.state.cook && this.state.cook.data && index < this.state.cook.data.length && !this.state.cook.data[index].samples) this.loadSamplesAsync(index);
    });

    _defineProperty(this, "handleSnackBar", message => {
      this.queue.push({
        message,
        key: new Date().getTime()
      });

      if (this.state.openSnackbar) {
        this.setState({
          openSnackbar: false
        });
      } else {
        this.processQueue();
      }

      this.setState({
        openSnackbar: true
      });
    });

    _defineProperty(this, "handleStart",
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      yield _this2.startExpAsync();

      _this2.setState({
        openSetUp: false
      });
    }));

    _defineProperty(this, "handleStop",
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      yield _this2.stopExpAsync();
    }));

    _defineProperty(this, "handleDownload", () => {
      this.setState({
        scientific: true
      });
    });

    _defineProperty(this, "handleToggleTheme", () => {
      const themeName = this.state.themeName == "dark" ? "light" : "dark";
      this.setState({
        themeName
      });
    });

    _defineProperty(this, "loadAboutAsync",
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      try {
        const aboutFetch = yield fetch(aboutURL, {
          signal: _this2.controller.signal
        });
        const aboutJson = yield aboutFetch.json();

        if (aboutJson) {
          aboutJson.hostName = aboutJson.hostName || "Untitled";
          aboutJson.configureIPv4 = aboutJson.configureIPv4 || "Using DHCP";
          aboutJson.maxPowerRating = aboutJson.maxPowerRating || "40W";
          const voltageRanges = aboutJson.voltageRanges.split("/").map((range, index) => {
            return {
              value: index,
              label: range
            };
          });
          const currentRanges = aboutJson.currentRanges.split("/").map((range, index) => {
            return {
              value: index,
              label: range
            };
          });
          aboutJson.currentRanges = currentRanges[0].label + "/" + currentRanges[1].label + "/.../" + currentRanges[currentRanges.length - 1].label;
          const temperatureSensor = aboutJson.temperatureSensor || "PT100";

          _this2.setState({
            about: aboutJson,
            voltageRanges,
            currentRanges,
            temperatureSensor
          });
        }
      } catch (e) {
        console.log(e);
      }
    }));

    _defineProperty(this, "loadChannelAsync",
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      try {
        const channelFetch = yield fetch(channelURL, {
          signal: _this2.controller.signal
        });
        const channelJson = yield channelFetch.json();

        if (channelJson) {
          const state = Object.keys(states).find(key => states[key] == channelJson.state);
          channelJson.received = Date.now();
          channelJson.isIdle = state == states.Idle || state == states.NotYetCalibrated;
          channelJson.isRunning = state == states.Running || state == states.Finished || state == states.Stopped;
          channelJson.isRunningNoiseLevel = state == states.RunningNoiseLevel;
          channelJson.isTooHot = state === states.TooHotFET;
          channelJson.isFailed = state === states.Failed;
          channelJson.notYetReady = state === states.NotYetReady;
          channelJson.notYetCalibrated = state == states.NotYetCalibrated;

          if (state == states.Running && _this2.state.channel && _this2.state.channel.isIdle) {
            _this2.handleSnackBar("Started");
          } else if (state == states.Finished) {
            _this2.handleSnackBar("Successfully finished");
          } else if (state == states.Stopped) {
            _this2.handleSnackBar("Manually stopped");
          } // Update state: channel and auxData


          const newAuxItem = {
            time: (new Date().getTime() - launched) / 1000,
            // [sec]
            voltage: channelJson.auxVoltage && channelJson.auxVoltage.toFixed(3),
            temperature: channelJson.auxTemperature && channelJson.auxTemperature.toFixed(3)
          };

          if (_this2.state.auxData.length < 200) {
            _this2.setState({
              channel: channelJson,
              auxData: [..._this2.state.auxData, newAuxItem]
            });
          } else {
            const [first, ...rest] = _this2.state.auxData;

            _this2.setState({
              channel: channelJson,
              auxData: [...rest, newAuxItem]
            });
          } // If lastStarted does not equals to cook.started, update cook.


          if (channelJson.lastStarted) {
            const lastTicks = channelJson.lastStarted.ticks;
            const lastCount = channelJson.lastStarted.count;

            if (!_this2.state.cook || _this2.state.cook.started.ticks != lastTicks || _this2.state.cook.started.count != lastCount) {
              _this2.loadCookAsync();
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    }));

    _defineProperty(this, "loadCookAsync",
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      try {
        const cookFetch = yield fetch(cookURL, {
          signal: _this2.controller.signal
        });
        const cookJson = yield cookFetch.json();

        if (cookJson) {
          cookJson.started.moment = moment(cookJson.started.ticks - dateTimeOffset);
          cookJson.data = cookJson.data.filter(function (item) {
            return item.frequency !== 0;
          });
          cookJson.parameters.currentRange = cookJson.parameters.currentRange - 1; // 0 = Auto

          _this2.setState({
            cook: cookJson,
            parameters: { ...cookJson.parameters
            }
          });
        }
      } catch (e) {
        console.log(e);
      }
    }));

    _defineProperty(this, "loadSamplesAsync",
    /*#__PURE__*/
    function () {
      var _ref7 = _asyncToGenerator(function* (index) {
        try {
          const samplesFetch = yield fetch(samplesURL(index), {
            signal: _this2.controller.signal
          });
          const samplesJson = yield samplesFetch.json();

          if (samplesJson && _this2.state.cook && _this2.state.cook.data && index >= 0 && index < _this2.state.cook.data.length) {
            const data = _this2.state.cook.data.map((item, j) => {
              if (j == index) {
                item.samples = samplesJson;
              }

              return item;
            });

            _this2.setState({
              cook: { ..._this2.state.cook,
                data: data
              }
            });
          }
        } catch (e) {
          console.log(e);
        }
      });

      return function (_x) {
        return _ref7.apply(this, arguments);
      };
    }());

    _defineProperty(this, "startExpAsync",
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      if (isDemo) return;

      try {
        const ticks = new Date().getTime() + dateTimeOffset; // miliiseconds since 0000-01-01

        const payload = new URLSearchParams();
        payload.append("initialFrequency", _this2.state.parameters.initialFrequency);
        payload.append("finalFrequency", _this2.state.parameters.finalFrequency);
        payload.append("density", _this2.state.parameters.density);
        payload.append("iteration", _this2.state.parameters.iteration);
        payload.append("currentRange", _this2.state.parameters.currentRange + 1); // 0 = "Auto"

        payload.append("maxInitialDelay", _this2.state.parameters.maxInitialDelay);
        payload.append("skip", 1);
        payload.append("cycles", 0);
        payload.append("started", ticks);
        const settings = {
          method: "POST",
          headers: {
            "Content-Length": payload.toString().length.toString()
          },
          body: payload.toString(),
          signal: _this2.controller.signal
        };
        const response = yield fetch(startURL, settings);

        if (response.ok) {
          _this2.setState({
            cookIndex: -1
          });
        }
      } catch (e) {
        console.log(e);
      }
    }));

    _defineProperty(this, "stopExpAsync",
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      if (isDemo) return;

      try {
        const settings = {
          method: "POST",
          headers: {
            "Content-Length": 0
          },
          signal: _this2.controller.signal
        };
        const response = yield fetch(stopURL, settings);

        if (response.ok) {//console.log("Manually Stopped");
        }
      } catch (e) {
        console.log(e);
      }
    }));

    _defineProperty(this, "saveCookedAsCSV", () => {
      if (this.state.about && this.state.about.zimSerialNumber) {
        const tblID = "cook-table";
        const fileName = this.state.about.zimSerialNumber + "_cooked_" + this.state.cook.started.ticks;
        exportTableToCsv(tblID, fileName);
      }

      this.setState({
        scientific: false
      });
    });

    _defineProperty(this, "componentDidMount",
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      yield _this2.loadAboutAsync();
      yield _this2.loadChannelAsync();
      let timer = setInterval(
      /*#__PURE__*/
      _asyncToGenerator(function* () {
        yield _this2.loadChannelAsync();
      }), 3000);

      _this2.setState({
        timer
      });
    }));

    this.state = {
      themeName: "light",
      overwrites: {},
      openAbout: false,
      openSetUp: false,
      openSnackbar: false,
      messageInfo: {},
      about: null,
      channel: null,
      cook: null,
      parameters: defaultParameters,
      cookIndex: -1,
      auxData: [],
      timer: null,
      voltageRanges: defaultVoltageRanges,
      currentRanges: defaultCurrentRanges,
      temperatureSensor: "PT100",
      scientific: false
    };
  }

  //#endregion Event handlers
  componentDidMount() {
    this.loadAboutAsync();
    this.loadChannelAsync();
    this.interval = setInterval(this.loadChannelAsync, 1000);
  } //#region Fetch


  componentDidUpdate(prevProps, prevState) {
    if (prevState.scientific !== this.state.scientific && this.state.scientific) {
      this.saveCookedAsCSV();
    }
  }

  componentWillUnmount() {
    this.controller.abort();
    clearInterval(this.state.timer);
  }

  render() {
    const {
      classes
    } = this.props;
    const muiTheme = getTheme(this.state.themeName);
    {
      /* Binding functions */
    }
    this.handleChangeParameter = this.handleChangeParameter.bind(this);
    this.handleClearAuxData = this.handleClearAuxData.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpenAbout = this.handleOpenAbout.bind(this);
    this.handleOpenSetUp = this.handleOpenSetUp.bind(this);
    this.handleGoFirst = this.handleGoFirst.bind(this);
    this.handleGoNext = this.handleGoNext.bind(this);
    this.handleGoLast = this.handleGoLast.bind(this);
    this.handleGoPrevious = this.handleGoPrevious.bind(this);
    this.handleSnackBar = this.handleSnackBar.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.handleToggleTheme = this.handleToggleTheme.bind(this);
    this.loadAboutAsync = this.loadAboutAsync.bind(this);
    this.loadChannelAsync = this.loadChannelAsync.bind(this);
    this.loadCookAsync = this.loadCookAsync.bind(this);
    this.loadSamplesAsync = this.loadSamplesAsync.bind(this);
    this.processQueue = this.processQueue.bind(this);
    return React.createElement(MuiThemeProvider, {
      theme: muiTheme
    }, React.createElement(CssBaseline, null), React.createElement(HeaderWrapped, {
      about: this.state.about,
      onClose: this.handleClose,
      onOpenAbout: this.handleOpenAbout,
      onToggleTheme: this.handleToggleTheme,
      openAbout: this.state.openAbout,
      themeName: this.state.themeName
    }), React.createElement("main", {
      className: classes.layout
    }, React.createElement("div", {
      className: classes.appBarSpacer
    }), React.createElement(Grid, {
      container: true,
      className: classes.gridContainer,
      spacing: 5,
      layout: "row",
      alignItems: "stretch"
    }, React.createElement(Grid, {
      item: true,
      key: "AuxCard",
      xs: 12,
      sm: 12,
      md: 4
    }, React.createElement(AuxPanelWrapped, {
      auxData: this.state.auxData,
      channel: this.state.channel,
      voltageRanges: this.state.voltageRanges,
      temperatureSensor: this.state.temperatureSensor,
      onClear: this.handleClearAuxData
    })), React.createElement(Grid, {
      item: true,
      key: "CookCard",
      xs: 12,
      sm: 12,
      md: 8
    }, React.createElement(CookPanelWrapped, {
      cookIndex: this.state.cookIndex,
      channel: this.state.channel,
      cook: this.state.cook,
      messageInfo: this.state.messageInfo,
      onChangeParameter: this.handleChangeParameter,
      onClose: this.handleClose,
      onGoFirst: this.handleGoFirst,
      onGoLast: this.handleGoLast,
      onGoNext: this.handleGoNext,
      onGoPrevious: this.handleGoPrevious,
      onOpenSetUp: this.handleOpenSetUp,
      onStart: this.handleStart,
      onStop: this.handleStop,
      onDownload: this.handleDownload,
      openSetUp: this.state.openSetUp,
      openSnackbar: this.state.openSnackbar,
      parameters: this.state.parameters,
      currentRanges: this.state.currentRanges
    })), React.createElement(Grid, {
      item: true,
      key: "CookNyquistCard",
      xs: 12,
      sm: 12,
      md: 6
    }, React.createElement(NyquistPanelWrapped, {
      cook: this.state.cook
    })), React.createElement(Grid, {
      item: true,
      key: "CookBodeCard",
      xs: 12,
      sm: 12,
      md: 6
    }, React.createElement(BodePanelWrapped, {
      cook: this.state.cook
    })), React.createElement(Grid, {
      item: true,
      key: "CookTable",
      xs: 12,
      sm: 12,
      md: 12
    }, React.createElement(ZTablePanelWrapped, {
      cook: this.state.cook,
      currentRanges: this.state.currentRanges,
      scientific: this.state.scientific
    })))));
  }

}

const App = withStyles(styles)(Index);
ReactDOM.render(React.createElement(App, null), document.getElementById("root"));