import React from "react";
import PropTypes from "prop-types";

// controls
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

// Icons
import ArrowDownBoxIcon from "../icons/ArrowDownBox";

class DownloadButton extends React.Component {
  render() {
    const { disabled, onDownload } = this.props;
    return (
      <IconButton
        aria-label="Download"
        onClick={onDownload}
        disabled={disabled}
        color="default"
      >
        <Tooltip title="Save as CSV">
          <ArrowDownBoxIcon fontSize="large" />
        </Tooltip>
      </IconButton>
    );
  }
}

DownloadButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onDownload: PropTypes.func.isRequired
};

export default DownloadButton;
