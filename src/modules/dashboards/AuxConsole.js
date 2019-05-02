import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { format } from "d3-format";

// controls
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// components
import Sparkline from "./Sparkline";

// constants
import { SYMBOLS } from "../constants";

const styles = theme => ({});

class AuxConsole extends React.Component {
  render() {
    const { auxData, channel } = this.props;
    const { voltageRanges, temperatureSensor } = this.props;
    const auxVoltageExpression =
      channel && channel.auxVoltage
        ? format(".3f")(channel.auxVoltage) + "V"
        : SYMBOLS.NAN + "V";
    const auxVoltageRangeExpression = channel
      ? voltageRanges.find(x => x.value === channel.voltageRange).label +
        " range"
      : "";
    const auxTemperatureExpression =
      channel && channel.auxTemperature
        ? format(".2f")(channel.auxTemperature) + SYMBOLS.DEGREE_CELSIUS
        : SYMBOLS.NAN + SYMBOLS.DEGREE_CELSIUS;
    const auxTemperatureSensorType =
      channel && temperatureSensor ? temperatureSensor : "";
    return (
      <Grid
        container
        spacing={16}
        direction="column"
        justify="flex-start"
        alignItems="stretch"
      >
        <Grid item container xs={12} sm={12} md={12}>
          <Grid item xs={6} sm={6} md={6}>
            <Typography gutterBottom variant="h6">
              {auxVoltageExpression}
            </Typography>
            <Typography gutterBottom component="p">
              {auxVoltageRangeExpression}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            <Sparkline
              dataSet={auxData}
              xKey="time"
              xUnit="s"
              yKey="voltage"
              yUnit="V"
            />
          </Grid>
        </Grid>
        {/*<Divider variant="middle"/>*/}
        <Grid item container xs={12} sm={12} md={12}>
          <Grid item xs={6} sm={6} md={6}>
            <Typography gutterBottom variant="h6">
              {auxTemperatureExpression}
            </Typography>
            <Typography gutterBottom component="p">
              {auxTemperatureSensorType}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            <Sparkline
              dataSet={auxData}
              xKey="time"
              xUnit="s"
              yKey="temperature"
              yUnit={SYMBOLS.DEGREE_CELSIUS}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

AuxConsole.propTypes = {
  auxData: PropTypes.array,
  channel: PropTypes.object,
  voltageRanges: PropTypes.array,
  temperatureSensor: PropTypes.string
};

export default withStyles(styles)(AuxConsole);
