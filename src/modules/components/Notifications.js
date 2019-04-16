import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  snackbar: {
    position: "absolute"
  },
  snackbarContent: {
    width: 360
  },
  close: {
    padding: theme.spacing.unit / 2
  }
});

class Notifications extends React.Component {
  render() {
    const { classes, messageInfo, open, onClose, onExited } = this.props;
    return (
      <React.Fragment key="section-to-display-message">
        <Snackbar
          key={messageInfo.key}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={open}
          autoHideDuration={3000}
          onClose={onClose}
          onExited={onExited}
          ContentProps={{
            "aria-describedby": "alert-message",
            className: classes.snackbarContent
          }}
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
          className={classes.snackbar}
        />
      </React.Fragment>
    );
  }
}

Notifications.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  messageInfo: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onExited: PropTypes.func.isRequired
};

export default withStyles(styles)(Notifications);
