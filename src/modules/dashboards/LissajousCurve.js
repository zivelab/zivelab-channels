import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { Scatter } from "react-chartjs-2";
import { format } from "d3-format";

// functions
import { hexToRgbA, palette } from "../utils/colors";

const styles = theme => ({
  canvas: {
    width: "100%",
    height: 155
  }
});

class LissajousCurve extends React.Component {
  render() {
    const { classes, channel, cook, index } = this.props;
    const isIdle = channel ? channel.isIdle : false;
    const isRunning = channel ? channel.isRunning : false;
    const samples = isRunning
      ? channel.stepSamples
      : isIdle &&
        cook &&
        cook.data &&
        index >= 0 &&
        index < cook.data.length &&
        cook.data[index].samples &&
        cook.data[index].samples.data
      ? cook.data[index].samples.data
      : null;
    const samplesXY =
      samples &&
      samples.map(sample => {
        return { x: sample.voltage, y: sample.current };
      });
    const data = {
      labels: ["Scatter"],
      datasets: [
        {
          fill: true,
          backgroundColor: hexToRgbA(palette.line[5], 0.4),
          pointBorderColor: hexToRgbA(palette.line[5], 1),
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: hexToRgbA(palette.line[5], 1),
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          pointHitRadius: 10,
          data: samplesXY
        }
      ]
    };
    const options = {
      responsive: true,
      legend: {
        display: false
      },
      title: {
        display: false,
        text: "Lissajous, I vs V"
      },
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: false,
              labelString: "Voltage [V]",
              fontColor: "#aaa"
            },
            ticks: {
              callback: function(value) {
                return format(".1s")(value) + "V";
              },
              fontColor: "#aaa"
            },
            gridLines: {
              color: "#aaa",
              zeroLineColor: "#aaa",
              drawOnChartArea: true
            }
          }
        ],
        yAxes: [
          {
            scaleLabel: {
              display: false,
              labelString: "Current [A]",
              fontColor: "#aaa"
            },
            ticks: {
              callback: function(value) {
                return format(".1s")(value) + "A";
              },
              fontColor: "#aaa"
            },
            gridLines: {
              color: "#aaa",
              zeroLineColor: "#aaa",
              drawOnChartArea: true
            }
          }
        ]
      }
    };

    if (!samples) {
      return <div className={classes.canvas} />;
    }
    return (
      <div className={classes.canvas}>
        <Scatter data={data} options={options} height={null} width={null} />
      </div>
    );
  }
}

LissajousCurve.propTypes = {
  classes: PropTypes.object.isRequired,
  channel: PropTypes.object,
  cook: PropTypes.object,
  index: PropTypes.number
};

LissajousCurve.defaultProps = {
  index: 0
};

export default withStyles(styles)(LissajousCurve);
