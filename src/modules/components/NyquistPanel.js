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

class NyquistPanel extends React.Component {
  render() {
    const { classes, cook } = this.props;
    const cooked = cook ? cook.data : null;

    const plot1 =
      cooked &&
      cooked.map(item => {
        return { x: item.zreal, y: -item.zimag };
      });
    const data = {
      labels: ["Scatter"],
      datasets: [
        {
          fill: true,
          backgroundColor: hexToRgbA(palette.line[0], 0.4),
          pointBorderColor: hexToRgbA(palette.line[0], 1.0),
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: hexToRgbA(palette.line[0], 1.0),
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 10,
          data: plot1
        }
      ]
    };
    const xAxisLabel = "Zreal [" + ohmSign + "]";
    const yAxisLabel = "-Zimag [" + ohmSign + "]";
    const options = {
      responsive: true,
      legend: {
        display: false
      },
      title: {
        display: false,
        text: "Nyquist"
      },
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: xAxisLabel,
              fontColor: "#aaa",
              fontStyle: "bold"
            },
            ticks: {
              callback: function(value) {
                return format(".3s")(value);
              },
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
            scaleLabel: {
              display: true,
              labelString: yAxisLabel,
              fontColor: "#aaa",
              fontStyle: "bold"
            },
            ticks: {
              callback: function(value) {
                return format(".3s")(value);
              },
              fontColor: "#aaa"
            },
            gridLines: {
              color: "#aaa",
              zeroLineColor: "#aaa"
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

NyquistPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  channel: PropTypes.object,
  cook: PropTypes.object
};

export default withStyles(styles)(NyquistPanel);
