import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

// controls
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  }
});

class SetUpDialog extends React.Component {
  render() {
    const {
      classes,
      parameters,
      onClose,
      onStart,
      onChange,
      currentRanges,
      ...other
    } = this.props;
    return (
      parameters && (
        <React.Fragment key="section-to-setup-dialog">
          <Dialog
            onClose={onClose}
            scroll="paper"
            aria-labelledby="dialog-parameters"
            {...other}
          >
            <DialogTitle id="dialog-parameters-title">
              Parameters to setup experiment
            </DialogTitle>
            <DialogContent>
              <TextField
                id="initialFrequency"
                label="Initial Frequency (Hz)"
                value={parameters.initialFrequency}
                type="number"
                margin="dense"
                //helperText="The starting point for frequency sweep"
                className={classes.textField}
                onChange={e => onChange(e, "initialFrequency")}
              />
              <TextField
                id="finalFrequency"
                label="Final Frequency (Hz)"
                value={parameters.finalFrequency}
                type="number"
                margin="dense"
                //helperText="The ending point for frequency sweep"
                className={classes.textField}
                onChange={e => onChange(e, "finalFrequency")}
              />
              <TextField
                id="density"
                label="Density (Pt/dec)"
                value={parameters.density}
                type="number"
                margin="dense"
                //helperText="The number of data points in each decade in frequency"
                className={classes.textField}
                onChange={e => onChange(e, "density")}
              />
              <TextField
                id="iteration"
                label="Iteration"
                value={parameters.iteration}
                type="number"
                margin="dense"
                className={classes.textField}
                onChange={e => onChange(e, "iteration")}
              />
              <TextField
                id="currentRange"
                label="Current Range"
                select
                value={parameters.currentRange}
                margin="dense"
                className={classes.textField}
                onChange={e => onChange(e, "currentRange")}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
              >
                {currentRanges.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="maxInitialDelay"
                label="Max Initial Delay (s)"
                value={parameters.maxInitialDelay}
                type="number"
                margin="dense"
                className={classes.textField}
                onChange={e => onChange(e, "maxInitialDelay")}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={onStart} color="primary">
                Start
              </Button>
              <Button onClick={onClose} color="default">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      )
    );
  }
}

SetUpDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  parameters: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,
  currentRanges: PropTypes.array
};

SetUpDialog.defaultProps = {
  currentRanges: [
    { value: 0, label: "2A" },
    { value: 1, label: "400mA" },
    { value: 2, label: "200mA" },
    { value: 3, label: "40mA" },
    { value: 4, label: "20mA" },
    { value: 5, label: "4mA" },
    { value: 6, label: "2mA" },
    { value: 7, label: "400uA" }
  ]
};

export default withStyles(styles)(SetUpDialog);
