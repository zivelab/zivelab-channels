import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { format } from "d3-format";

// controls
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

// components
import CookConsole from "./CookConsole";
import DownloadButton from "./DownloadButton";
import StartExpButton from "./StartExpButton";
import StopExpButton from "./StopExpButton";

const styles = theme => ({
  cardControls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1)
  }
});

// Special characters
const frequencySign = "Hz";

//#region CookPanelWrapped
class CookPanel extends React.Component {
  render() {
    const {
      classes,
      channel,
      cook,
      cookIndex,
      parameters,
      onGoFirst,
      onGoPrevious,
      onGoNext,
      onGoLast,
      onStart,
      onStop,
      onDownload,
      onChange,
      currentRanges
    } = this.props;
    const ready = channel ? channel.isIdle : false;
    const running = channel ? channel.isRunning : false;
    const measuringNoiseLevel = channel ? channel.isRunningNoiseLevel : false;
    const tooHot = channel ? channel.isTooHot : false;
    const somethingWrong = channel ? channel.isFailed : false;
    const notYetReady = channel ? channel.notYetReady : false;
    const notYetCalibrated = channel ? channel.notYetCalibrated : false;
    const started =
      cook && cook.started && cook.started.moment ? cook.started.moment : null;
    const stateExpression = running
      ? "Measuring @ " + format(".4s")(channel.stepFrequency) + frequencySign
      : measuringNoiseLevel
      ? "Measuring noise level..."
      : tooHot
      ? "Heat sink is very hot..."
      : somethingWrong
      ? "Something wrong, check cables..."
      : notYetReady
      ? "Not yet ready, unstable Vac..."
      : notYetCalibrated
      ? "Not yet calibrated..."
      : cook && cook.data.length > 0
      ? "Cooked, " + started.fromNow()      
      : channel
      ? "Ready"
      : "Loading...";
    return (
      <Card>
        <CardHeader
          subheader={stateExpression}
          action={
            <div className={classes.cardControls}>
              <StartExpButton
                disabled={!ready}
                parameters={parameters}
                onStart={onStart}
                onChange={onChange}
                currentRanges={currentRanges}
              />
              <StopExpButton disabled={!running} onStop={onStop} />
              <DownloadButton
                disabled={!ready || !cook || cook.data.length < 1}
                onDownload={onDownload}
              />
            </div>
          }
        />
        <CardContent>
          <CookConsole
            cookIndex={cookIndex}
            channel={channel}
            cook={cook}
            onGoFirst={onGoFirst}
            onGoLast={onGoLast}
            onGoNext={onGoNext}
            onGoPrevious={onGoPrevious}
          />
        </CardContent>
      </Card>
    );
  }
}
CookPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  channel: PropTypes.object,
  cook: PropTypes.object,
  cookIndex: PropTypes.number.isRequired,
  parameters: PropTypes.object.isRequired,
  currentRanges: PropTypes.array,
  onGoFirst: PropTypes.func.isRequired,
  onGoLast: PropTypes.func.isRequired,
  onGoNext: PropTypes.func.isRequired,
  onGoPrevious: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};
export default withStyles(styles)(CookPanel);
