import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

// controls
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

// Icons
import InfoIcon from "@material-ui/icons/Info";

// components
import AboutDialog from "./AboutDialog";

// functions
import { isEmpty } from "../utils/object";

const styles = theme => ({});

class AboutButton extends React.Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const { about } = this.props;
    const { open } = this.state;

    if (!isEmpty(about)) {
      return (
        <React.Fragment>
          <Tooltip title="Show about" enterDelay={300}>
            <IconButton
              color="inherit"
              onClick={this.handleClick}
              aria-label="about"
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>
          <AboutDialog about={about} open={open} onClose={this.handleClose} />
        </React.Fragment>
      );
    } else {
      return <React.Fragment />;
    }
  }
}

AboutButton.propTypes = {
  classes: PropTypes.object.isRequired,
  about: PropTypes.object.isRequired
};

export default withStyles(styles)(AboutButton);
