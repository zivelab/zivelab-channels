import React from "react";
import PropTypes from "prop-types";

// controls
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

// Icons
import InfoIcon from "@material-ui/icons/Info";

// components
import AboutDialog from "./AboutDialog";

// functions
import { isEmpty } from "../utils/object";

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

    return (
      !isEmpty(about) && (
        <React.Fragment key="section-to-show-about">
          <Tooltip title="Show about" enterDelay={300}>
            <IconButton
              color="inherit"
              onClick={this.handleClick}
              aria-label="about"
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>
          <AboutDialog open={open} about={about} onClose={this.handleClose} />
        </React.Fragment>
      )
    );
  }
}

AboutButton.propTypes = {
  about: PropTypes.object.isRequired
};

export default AboutButton;
