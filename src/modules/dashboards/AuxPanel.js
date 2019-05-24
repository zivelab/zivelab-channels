import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

// controls
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

// components
import AuxConsole from "./AuxConsole";

// Icons
import ClearAllIcon from "@material-ui/icons/ClearAll";

const styles = theme => ({
  cardControls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1)
  }
});

class AuxPanel extends React.Component {
  render() {
    const {
      classes,
      auxData,
      channel,
      onClear,
      voltageRanges,
      temperatureSensor
    } = this.props;
    return (
      <Card>
        <CardHeader
          //title="Aux. Readings"
          subheader="Aux. Readings"
          action={
            <div className={classes.cardControls}>
              <IconButton aria-label="Clear" onClick={onClear}>
                <Tooltip title="Clear">
                  <ClearAllIcon fontSize="large" />
                </Tooltip>
              </IconButton>
            </div>
          }
        />
        <CardContent>
          <AuxConsole
            auxData={auxData}
            channel={channel}
            voltageRanges={voltageRanges}
            temperatureSensor={temperatureSensor}
          />
        </CardContent>
      </Card>
    );
  }
}
AuxPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  auxData: PropTypes.array,
  channel: PropTypes.object,
  onClear: PropTypes.func,
  voltageRanges: PropTypes.array,
  temperatureSensor: PropTypes.string
};

export default withStyles(styles)(AuxPanel);
