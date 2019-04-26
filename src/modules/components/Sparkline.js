import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { Scatter } from "react-chartjs-2";
import { format } from "d3-format";

// functions
// eslint-disable-next-line
import { hexToRgbA, palette } from "../utils/colors";

const styles = theme => ({
  canvas: {
    width: "100%",
    height: 70
  }
});

class Sparkline extends React.Component {
  render() {
    const { classes, dataSet, xKey, xUnit, yKey, yUnit } = this.props;
    const plot =
      dataSet &&
      dataSet.map(item => {
        return { x: item[xKey], y: item[yKey] };
      });
    const data = {
      labels: ["Aux"],
      datasets: [
        {
          fill: true,
          showLine: true,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: plot
        }
      ]
    };
    const options = {
      responsive: true,
      legend: {
        display: false
      },
      title: {
        display: false
      },
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: false
            },
            ticks: {
              callback: function(value) {
                return format(".3")(value) + xUnit;
              },
              display: false
            },
            gridLines: {
              display: false,
              color: "#aaa",
              zeroLineColor: "#aaa"
            }
          }
        ],
        yAxes: [
          {
            scaleLabel: {
              display: false
            },
            ticks: {
              callback: function(value) {
                return format(".0")(value) + yUnit;
              },
              display: false
            },
            gridLines: {
              display: false,
              color: "#aaa",
              zeroLineColor: "#aaa"
            }
          }
        ]
      }
    };

    if (!dataSet) {
      return <div className={classes.canvas} />;
    }
    return (
      <div className={classes.canvas}>
        <Scatter data={data} options={options} height={null} width={null} />
      </div>
    );
  }
}

Sparkline.propTypes = {
  classes: PropTypes.object.isRequired,
  dataSet: PropTypes.array.isRequired,
  xKey: PropTypes.string.isRequired,
  xUnit: PropTypes.string.isRequired,
  yKey: PropTypes.string.isRequired,
  yUnit: PropTypes.string.isRequired
};

export default withStyles(styles)(Sparkline);
