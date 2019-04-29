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
import StartExpButton from "./StartExpButton";
import StopExpButton from "./StopExpButton";

const styles = theme => ({
  cardControls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing.unit
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
      onChange,
      currentRanges
    } = this.props;
    const isIdle = channel ? channel.isIdle : false;
    const isRunning = channel ? channel.isRunning : false;
    const isRunningNoiseLevel = channel ? channel.isRunningNoiseLevel : false;
    const isTooHot = channel ? channel.isTooHot : false;
    const isFailed = channel ? channel.isFailed : false;
    const started =
      cook && cook.started && cook.started.moment ? cook.started.moment : null;
    const stateExpression = isRunning
      ? "Measuring @ " + format(".2s")(channel.stepFrequency) + frequencySign
      : isRunningNoiseLevel
      ? "Measuring noise level..."
      : isTooHot
      ? "Heat sink is very hot..."
      : isFailed
      ? "Something wrong, check cables..."
      : cook && cook.data.length > 0
      ? "Cooked, " + started.fromNow()
      : channel
      ? "Idle"
      : "Loading...";
    return (
      <Card>
        <CardHeader
          subheader={stateExpression}
          action={
            <div className={classes.cardControls}>
              <StartExpButton
                disabled={!isIdle && !isFailed}
                parameters={parameters}
                onStart={onStart}
                onChange={onChange}
                currentRanges={currentRanges}
              />
              <StopExpButton disabled={!isRunning} onStop={onStop} />
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
  onChange: PropTypes.func.isRequired
};
export default withStyles(styles)(CookPanel);
