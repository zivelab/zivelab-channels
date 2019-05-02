import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { format } from "d3-format";

//controls
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Icon from "@material-ui/core/Icon";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";

// constants
import { SYMBOLS } from "../constants";

const styles = theme => ({
  tableContainer: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    fontFamily: theme.typography.fontFamily,
    width: "100%"
  },
  tableRow: {
    cursor: "pointer"
  },
  tableCell: {
    flex: 1
  }
});

class ZTablePanel extends React.Component {
  render() {
    const { classes, cook, currentRanges, scientific } = this.props;
    const cooked = cook ? cook.data : null;
    const started = cook && cook.started ? cook.started.moment : null;
    const titleExpression = started
      ? "Impedance data, measured at " +
        started.format("HH:mm:ss") +
        " on " +
        started.format("YYYY-MM-DD")
      : "No data";
    return (
      cooked &&
      cooked.length > 0 && (
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
            <Typography className={classes.heading}>
              {titleExpression}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Paper className={classes.tableContainer}>
              <Table className={classes.table} id="cook-table" key="cook-table">
                <TableHead>
                  <TableRow key="thead">
                    <TableCell align="right" className={classes.tableCell}>
                      Pt
                    </TableCell>
                    <TableCell align="right" className={classes.tableCell}>
                      Time (s)
                    </TableCell>
                    <TableCell align="right" className={classes.tableCell}>
                      Freq (Hz)
                    </TableCell>
                    <TableCell align="right" className={classes.tableCell}>
                      Zreal ({SYMBOLS.OHM})
                    </TableCell>
                    <TableCell align="right" className={classes.tableCell}>
                      Zimag ({SYMBOLS.OHM})
                    </TableCell>
                    <TableCell align="right" className={classes.tableCell}>
                      Zmod ({SYMBOLS.OHM})
                    </TableCell>
                    <TableCell align="right" className={classes.tableCell}>
                      Zphase ({SYMBOLS.DEGREE})
                    </TableCell>
                    <TableCell align="right" className={classes.tableCell}>
                      Idc (A)
                    </TableCell>
                    <TableCell align="right" className={classes.tableCell}>
                      Vdc (V)
                    </TableCell>
                    <TableCell align="right" className={classes.tableCell}>
                      Temp ({SYMBOLS.DEGREE_CELSIUS})
                    </TableCell>
                    <TableCell align="right" className={classes.tableCell}>
                      IRange
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cooked.map((row, index) => (
                    <TableRow key={index.toString()}>
                      <TableCell component="th" scope="row">
                        {row.pt}
                      </TableCell>
                      <TableCell align="right" className={classes.tableCell}>
                        {row.time}
                      </TableCell>
                      <TableCell align="right" className={classes.tableCell}>
                        {scientific
                          ? format("e")(row.frequency)
                          : format(".6s")(row.frequency)}
                      </TableCell>
                      <TableCell align="right" className={classes.tableCell}>
                        {scientific
                          ? format("e")(row.zreal)
                          : format(".6s")(row.zreal)}
                      </TableCell>
                      <TableCell align="right" className={classes.tableCell}>
                        {scientific
                          ? format("e")(row.zimag)
                          : format(".6s")(row.zimag)}
                      </TableCell>
                      <TableCell align="right" className={classes.tableCell}>
                        {scientific
                          ? format("e")(row.zmod)
                          : format(".6s")(row.zmod)}
                      </TableCell>
                      <TableCell align="right" className={classes.tableCell}>
                        {format(".3f")(row.zphase)}
                      </TableCell>
                      <TableCell align="right" className={classes.tableCell}>
                        {scientific
                          ? format("e")(row.idc)
                          : format(".6s")(row.idc)}
                      </TableCell>
                      <TableCell align="right" className={classes.tableCell}>
                        {format(".3f")(row.vdc)}
                      </TableCell>
                      <TableCell align="right" className={classes.tableCell}>
                        {format(".3f")(row.temperature)}
                      </TableCell>
                      <TableCell align="right" className={classes.tableCell}>
                        {
                          currentRanges.find(x => x.value === row.currentRange)
                            .label
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    );
  }
}

ZTablePanel.propTypes = {
  classes: PropTypes.object.isRequired,
  cook: PropTypes.object,
  currentRanges: PropTypes.array,
  scientific: PropTypes.bool
};

ZTablePanel.defaultProps = {
  scientific: false
};

export default withStyles(styles)(ZTablePanel);
