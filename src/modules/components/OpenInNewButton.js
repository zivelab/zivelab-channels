import React from "react";
import PropTypes from "prop-types";

// controls
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

// Icons
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

// functions
import { isEmpty } from "../utils/object";

class AboutButton extends React.Component {
  handleClick = () => {
    const url = "http://" + this.props.about.ipAddress;
    window.open(url, "_blank");
  };

  render() {
    const { about } = this.props;
    return (
      !isEmpty(about) && (
        <React.Fragment key="section-to-open-in-new">
          <Tooltip title="Open in new" enterDelay={300}>
            <IconButton
              color="inherit"
              onClick={this.handleClick}
              aria-label="open-in-new"
            >
              <OpenInNewIcon />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      )
    );
  }
}

AboutButton.propTypes = {
  about: PropTypes.object.isRequired
};

export default AboutButton;
