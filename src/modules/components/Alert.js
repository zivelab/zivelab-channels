import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
});

class Alert extends React.Component {
  render() {
    const { classes, message, open, onClose } = this.props;
    return (
      <Snackbar
        key="alerts"
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        ContentProps={{ "aria-describedby": "alert-message" }}
        message={<span id="message-id">{message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            size="small"
            color="inherit"
            className={classes.close}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
        open={open}
        autoHideDuration={2000}
        onClose={onClose}
      />
    );
  }
}

Alert.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default withStyles(styles)(Alert);
