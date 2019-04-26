import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Scatter } from "react-chartjs-2";
import { format } from "d3-format";

// controls
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

// functions
import { hexToRgbA, palette } from "../utils/colors";

const styles = theme => ({
  canvas: {
    width: "100%",
    height: 300
  }
});

const ohmSign = "\u2126";
const degreeSign = "\u00B0";

class BodePanel extends React.Component {
  render() {
    const { classes, cook } = this.props;
    const cooked = cook ? cook.data : null;

    const plot1 =
      cooked &&
      cooked.map(item => {
        return { x: item.frequency, y: item.zmod };
      });
    const plot2 =
      cooked &&
      cooked.map(item => {
        return { x: item.frequency, y: item.zphase };
      });
    const data = {
      labels: ["Plot1", "Plot2"],
      datasets: [
        {
          label: "Zmod",
          xAxisID: "x-axis-1",
          yAxisID: "y-axis-1",
          fill: true,
          backgroundColor: hexToRgbA(palette.line[1], 0.4),
          pointBorderColor: hexToRgbA(palette.line[1], 1.0),
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: hexToRgbA(palette.line[1], 1.0),
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 10,
          data: plot1
        },
        {
          label: "Zphase",
          xAxisID: "x-axis-1",
          yAxisID: "y-axis-2",
          fill: true,
          backgroundColor: hexToRgbA(palette.line[2], 0.4),
          pointBorderColor: hexToRgbA(palette.line[2], 1.0),
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: hexToRgbA(palette.line[2], 1.0),
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 10,
          data: plot2
        }
      ]
    };
    const xAxisLabel = "Frequency [Hz]";
    const yAxis1Label = "|Z| [" + ohmSign + "]";
    const yAxis2Label = "Phase [" + degreeSign + "]";
    const options = {
      responsive: true,
      legend: {
        display: false
      },
      title: {
        display: false,
        text: "Bode"
      },
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            id: "x-axis-1",
            type: "logarithmic",
            scaleLabel: {
              display: true,
              labelString: xAxisLabel,
              fontColor: "#aaa",
              fontStyle: "bold"
            },
            ticks: {
              callback: function(value) {
                return format(".0s")(value);
              },
              autoSkipPadding: 40,
              fontColor: "#aaa"
            },
            gridLines: {
              color: "#aaa",
              zeroLineColor: "#aaa"
            }
          }
        ],
        yAxes: [
          {
            id: "y-axis-1",
            position: "left",
            type: "logarithmic",
            scaleLabel: {
              display: true,
              labelString: yAxis1Label,
              fontColor: "#aaa",
              fontStyle: "bold"
            },
            ticks: {
              callback: function(value) {
                return format(".2s")(value);
              },
              fontColor: "#aaa",
              maxTicksLimit: 10
            },
            gridLines: {
              color: "#aaa",
              zeroLineColor: "#aaa",
              drawOnChartArea: true
            }
          },
          {
            id: "y-axis-2",
            position: "right",
            scaleLabel: {
              display: true,
              labelString: yAxis2Label,
              fontColor: "#aaa",
              fontStyle: "bold"
            },
            ticks: {
              callback: function(value) {
                return format(".3f")(value);
              },
              fontColor: "#aaa",
              maxTicksLimit: 10
            },
            gridLines: {
              color: "#aaa",
              zeroLineColor: "#aaa",
              drawOnChartArea: false
            }
          }
        ]
      }
    };
    return (
      cooked &&
      cooked.length > 0 && (
        <Card>
          {/*<CardHeader
                    subheader="Nyquist Plot"
                />*/}
          <CardContent className={classes.cardChart}>
            <div className={classes.canvas}>
              <Scatter
                data={data}
                options={options}
                height={null}
                width={null}
              />
            </div>
          </CardContent>
        </Card>
      )
    );
  }
}

BodePanel.propTypes = {
  classes: PropTypes.object.isRequired,
  channel: PropTypes.object,
  cook: PropTypes.object
};

export default withStyles(styles)(BodePanel);
