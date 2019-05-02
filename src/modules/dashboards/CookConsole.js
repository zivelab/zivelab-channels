import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { format } from "d3-format";
import moment from "moment";

// controls
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

// components
import LissajousCurve from "./LissajousCurve";

// constants
import { SYMBOLS } from "../constants";

const styles = theme => ({
  linearProgress: {
    flexGrow: 1
  }
});

function durationFormat(durationAsSeconds) {
  return moment.utc(durationAsSeconds * 1000).format("HH:mm:ss");
}

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
      onGoLast
    } = this.props;
    const isIdle = channel ? channel.isIdle : false;
    const isRunning = channel ? channel.isRunning : false;
    const cooked = cook ? cook.data : null;
    const zitem = cooked ? cooked[cookIndex] : null;

    const frequncyExpression = isRunning
      ? channel.lastFrequency
        ? format(".4s")(channel.lastFrequency) + "Hz"
        : SYMBOLS.NAN + "Hz"
      : zitem
      ? format(".4s")(zitem.frequency) + "Hz"
      : SYMBOLS.NAN + "Hz";
    const zModulusExpression = isRunning
      ? channel.lastZmod
        ? format(".4s")(channel.lastZmod) + SYMBOLS.OHM
        : SYMBOLS.NAN + SYMBOLS.OHM
      : zitem
      ? format(".4s")(zitem.zmod) + SYMBOLS.OHM
      : SYMBOLS.NAN + SYMBOLS.OHM;
    const zPhaseExpression = isRunning
      ? channel.lastZphase
        ? format(".2f")(channel.lastZphase) + SYMBOLS.DEGREE
        : SYMBOLS.NAN + SYMBOLS.DEGREE
      : zitem
      ? format(".2f")(zitem.zphase) + SYMBOLS.DEGREE
      : SYMBOLS.NAN + SYMBOLS.DEGREE;
    const auxVExpression = isRunning
      ? " "
      : zitem
      ? format(".2f")(zitem.vdc) + "V"
      : SYMBOLS.NAN + "V";
    return (
      <React.Fragment>
        <Grid
          container
          spacing={16}
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid
            item
            container
            spacing={16}
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            xs={12}
            sm={6}
            md={6}
          >
            <Grid
              item
              container
              direction="row"
              justify="flex-start"
              alignItems="baseline"
              xs={12}
              sm={12}
              md={12}
            >
              <Grid item container xs={4} sm={4} md={4}>
                <Grid item container direction="column" alignItems="flex-start">
                  <Typography gutterBottom variant="h6">
                    {frequncyExpression}
                  </Typography>
                  <Typography gutterBottom variant="h6">
                    {auxVExpression}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container xs={8} sm={8} md={8}>
                <Grid item container direction="column" alignItems="flex-end">
                  <Typography gutterBottom variant="h5">
                    {zModulusExpression}
                  </Typography>
                  <Typography gutterBottom variant="h5">
                    {zPhaseExpression}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Divider variant="middle" />
            {isRunning ? (
              <Grid
                item
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                xs={12}
                sm={12}
                md={12}
              >
                <Grid item container xs={6} sm={6} md={6}>
                  <Grid item container>
                    <Typography gutterBottom variant="h6">
                      {durationFormat(channel.elapsedTime)}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item container xs={6} sm={6} md={6}>
                  <Grid
                    item
                    container
                    direction="column"
                    justify="center"
                    alignItems="stretch"
                  >
                    <div className={classes.linearProgress}>
                      <LinearProgress
                        variant="determinate"
                        value={channel.progress}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Grid
                item
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
                xs={12}
                sm={12}
                md={12}
              >
                <IconButton
                  aria-label="GoFirst"
                  onClick={onGoFirst}
                  disabled={!isIdle || cookIndex <= 0}
                >
                  <Tooltip title="Go first">
                    <Icon fontSize="default">first_page</Icon>
                  </Tooltip>
                </IconButton>

                <IconButton
                  aria-label="GoPrevious"
                  onClick={onGoPrevious}
                  disabled={!isIdle || cookIndex <= 0}
                >
                  <Tooltip title="Go previous">
                    <Icon fontSize="default">chevron_left</Icon>
                  </Tooltip>
                </IconButton>

                <IconButton
                  aria-label="GoNext"
                  onClick={onGoNext}
                  disabled={
                    !isIdle ||
                    cookIndex < 0 ||
                    (cooked && cookIndex >= cooked.length - 1)
                  }
                >
                  <Tooltip title="Go next">
                    <Icon fontSize="default">chevron_right</Icon>
                  </Tooltip>
                </IconButton>

                <IconButton
                  aria-label="GoLast"
                  onClick={onGoLast}
                  disabled={
                    !isIdle ||
                    cookIndex < 0 ||
                    (cooked && cookIndex >= cooked.length - 1)
                  }
                >
                  <Tooltip title="Go last">
                    <Icon fontSize="default">last_page</Icon>
                  </Tooltip>
                </IconButton>
              </Grid>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <LissajousCurve channel={channel} cook={cook} index={cookIndex} />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}
CookConsole.propTypes = {
  classes: PropTypes.object.isRequired,
  channel: PropTypes.object,
  cook: PropTypes.object,
  cookIndex: PropTypes.number.isRequired,
  onGoFirst: PropTypes.func.isRequired,
  onGoLast: PropTypes.func.isRequired,
  onGoNext: PropTypes.func.isRequired,
  onGoPrevious: PropTypes.func.isRequired
};

export default withStyles(styles)(CookConsole);
