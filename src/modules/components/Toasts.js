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

class Toasts extends React.Component {
  render() {
    const { classes, messageInfo, open, onClose, onExited } = this.props;
    return (
      <Snackbar
        key={messageInfo.key}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        autoHideDuration={1000}
        onClose={onClose}
        onExited={onExited}
        ContentProps={{ "aria-describedby": "alert-message" }}
        message={<span id="message-id">{messageInfo.message}</span>}
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
      />
    );
  }
}

Toasts.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  messageInfo: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onExited: PropTypes.func.isRequired
};

export default withStyles(styles)(Toasts);
