import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

// Components
import AppDrawerNavDevice from "./AppDrawerNavDevice";

class AppDrawerDeviceItems extends React.Component {
  render() {
    const {
      remote,
      myIP,
      devices,
      onScan,
      isScanning,
      scanCompleted,
      scanTotal
    } = this.props;
    const path = remote ? "/remote-device" : "/my-device";
    const openImmediately = this.props.location.pathname.indexOf(path) >= 0;
    return (
      <AppDrawerNavDevice
        remote={remote}
        openImmediately={openImmediately}
        myIP={myIP}
        devices={devices}
        onScan={onScan}
        isScanning={isScanning}
        scanCompleted={scanCompleted}
        scanTotal={scanTotal}
      />
    );
  }
}

AppDrawerDeviceItems.defaultProps = {
  remote: false
};

AppDrawerDeviceItems.propTypes = {
  remote: PropTypes.bool,
  myIP: PropTypes.string,
  devices: PropTypes.array.isRequired,
  onScan: PropTypes.func,
  isScanning: PropTypes.bool,
  scanCompleted: PropTypes.number,
  scanTotal: PropTypes.number
};

export default withRouter(AppDrawerDeviceItems);
