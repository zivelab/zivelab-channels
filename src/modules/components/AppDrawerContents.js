import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

// controls
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";

// Components
import AppDrawerDeviceItems from "./AppDrawerDeviceItems";
import AppDrawerGeneralItems from "./AppDrawerGeneralItems";
import FabAddDevice from "./FabAddDevice";

// functions
import { getLocalIPAddress, getFullRange, isZiveDevice } from "../utils/net";
import { timeoutPromise } from "../utils/promise";
import { getCookie } from "../utils/helpers";

class AppDrawerContents extends React.Component {
  state = {
    myIP: null,
    myDevices: [],
    remoteDevices: [],
    knownDevice: "",

    scanDevices: false,
    isLocalScan: false,
    isRemoteScan: false,
    scanCompleted: 0,
    scanTotal: 0
  };

  controller = new AbortController();

  handleLocalClick = async () => {
    await this.findDevices(true);
  };

  handleRemoteClick = async () => {
    await this.findDevices(false);
  };

  handleAddKnownDevice = async ip => {
    this.setState({ knownDevice: ip });
    await this.scanKnownDevice(ip);
  };

  scanKnownDevice = async ip => {
    await this.loadDescriptionAsync(ip, true);
  };

  findDevices = async isLocal => {
    try {
      const message = isLocal
        ? "Scanning local devices..."
        : "Scanning remote devices...";
      this.props.sendMessage(message);

      if (!isLocal && !this.state.myIP) {
        await this.getLocalIPAddressAsync();
      }
      const baseIP = isLocal ? "169.254.17.1" : this.state.myIP;
      const scanDevices = getFullRange(baseIP, isLocal);
      this.setState({
        isLocalScan: isLocal,
        isRemoteScan: !isLocal,
        scanCompleted: 0,
        scanTotal: scanDevices.length
      });
      scanDevices.map(async ip => {
        await this.loadDescriptionAsync(ip);
      });
    } catch (e) {
      //console.log(e);
    }
  };

  getLocalIPAddressAsync = async () => {
    try {
      const ip = await getLocalIPAddress();
      if (ip) {
        const knownDevice =
          ip
            .split(".")
            .slice(0, 3)
            .join(".") + ".15";
        this.setState({
          myIP: ip,
          knownDevice: knownDevice
        });
      }
    } catch (e) {
      //console.log(e);
    }
  };

  loadDescriptionAsync = async (ip, showMessage = false) => {
    // ip should be a valid IP address.
    const isLocal = ip.split(".").slice(0, 1)[0] === "169";
    const devices = isLocal ? "myDevices" : "remoteDevices";
    try {
      // [TODO] We really want to '/description', but we will do later
      const descriptionURL = "http://" + ip + "/about";
      const descriptionRequest = new Request(descriptionURL, {
        cache: "no-cache"
      });
      const descriptionFetch = await timeoutPromise(
        1000,
        fetch(descriptionRequest, {
          signal: this.controller.signal
        })
      );
      const descriptionJson = await descriptionFetch.json();
      if (descriptionJson) {
        if (!isZiveDevice(descriptionJson.macAddress)) return;
        const validDevice = {
          name: descriptionJson.hostName || "Untitled",
          model: descriptionJson.model,
          serialNumber: descriptionJson.serialNumber,
          ipAddress: descriptionJson.ipAddress,
          macAddress: descriptionJson.macAddress
        };
        if (
          this.state[devices].filter(device => device.ipAddress === ip)
            .length <= 0
        ) {
          this.setState({
            [devices]: [...this.state[devices], validDevice]
          });
        }
      }
    } catch (e) {
      this.setState({
        [devices]: this.state[devices].filter(device => {
          return device.ipAddress !== ip;
        })
      });
      if (showMessage) {
        const message = "Can't find device.";
        this.props.sendMessage(message);
      }
    } finally {
      this.setState({ scanCompleted: this.state.scanCompleted + 1 });
    }
  };

  componentDidMount = () => {
    this.getLocalIPAddressAsync();

    // find last devices from cookie
    const lastMyDevices = getCookie("myDevices");
    if (lastMyDevices.length > 0) {
      const target = JSON.parse(lastMyDevices).map(device => {
        return device.ipAddress;
      });
      target.map(async ip => await this.loadDescriptionAsync(ip, false));
    }
    const lastRemoteDevices = getCookie("remoteDevices");
    if (lastRemoteDevices.length > 0) {
      const target = JSON.parse(lastRemoteDevices).map(device => {
        return device.ipAddress;
      });
      target.map(async ip => await this.loadDescriptionAsync(ip, false));
    }
  };

  componentWillUnmount() {
    this.controller.abort();
  }

  render() {
    const { notified } = this.props;
    const { myIP, myDevices, remoteDevices, knownDevice } = this.state;
    const { isLocalScan, isRemoteScan, scanCompleted, scanTotal } = this.state;

    // progress in scanning
    const isScanning = scanTotal > 0 && scanCompleted < scanTotal;
    return (
      <React.Fragment key="section-to-list-nav-contents">
        <List>
          <Divider key="nav-getting-started-divider1" />
          <AppDrawerGeneralItems />
          <Divider key="nav-my-devices-divider" />
          <AppDrawerDeviceItems
            myIP={myIP}
            devices={myDevices}
            onScan={this.handleLocalClick}
            isScanning={isLocalScan}
            scanCompleted={scanCompleted}
            scanTotal={scanTotal}
          />
          <Divider key="nav-remote-devices-divider" />
          <AppDrawerDeviceItems
            remote
            myIP={myIP}
            devices={remoteDevices}
            onScan={this.handleRemoteClick}
            isScanning={isRemoteScan}
            scanCompleted={scanCompleted}
            scanTotal={scanTotal}
          />
          <Divider key="nav-last-divider" />
        </List>
        <FabAddDevice
          knownDevice={knownDevice}
          onClick={this.handleAddKnownDevice}
          disabled={isScanning}
          moveUp={notified}
        />
      </React.Fragment>
    );
  }
}

AppDrawerContents.propTypes = {
  notified: PropTypes.bool.isRequired,
  sendMessage: PropTypes.func.isRequired
};

export default withRouter(AppDrawerContents);
