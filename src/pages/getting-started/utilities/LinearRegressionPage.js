import "../../../bootstrap";
// --- Post bootstrap -----
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import regression from "regression";
import copy from "clipboard-copy";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import AppContent from "../../../modules/components/AppContent";

import compose from "../../../modules/utils/compose";
import { changeAbout } from "../../../modules/redux/actions";
import { isEmpty } from "../../../modules/utils/object";

const styles = theme => ({
  root: {
    marginBottom: 100
  },
  content: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    padding: (0, theme.spacing.unit * 2)
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  },
  table: {
    minWidth: 700
  }
});

class LinearRegressionPage extends Component {
  state = {
    itemX: Number.NaN,
    itemY: Number.NaN,
    rows: [],
    offset: Number.NaN,
    slope: Number.NaN,
    rSquare: Number.NaN
  };

  handleChange = name => event => {
    this.setState({ [name]: Number(event.target.value) });
  };

  handleAddRow = () => {
    const row = [this.state.itemX, this.state.itemY];
    this.linearFit(row);
  };

  handleClear = () => {
    this.setState({
      rows: [],
      offset: Number.NaN,
      slope: Number.NaN,
      rSquare: Number.NaN
    });
  };

  handleCopy = async () => {
    const content = {
      Offset: this.state.offset,
      Slope: this.state.slope,
      "R-Square": this.state.rSquare
    };
    await copy(JSON.stringify(content, undefined, 3));
  };

  validRow = () => {
    const { itemX, itemY } = this.state;
    return !Number.isNaN(itemX) && !Number.isNaN(itemY);
  };

  linearFit = row => {
    const rows = [...this.state.rows, row];
    const result =
      rows.length > 1 ? regression.linear(rows, { precision: 16 }) : null;
    const offset = result ? result.equation[1] : Number.NaN;
    const slope = result ? result.equation[0] : Number.NaN;
    const rSquare = result ? result.r2 : Number.NaN;
    this.setState({
      rows: rows,
      offset: offset,
      slope: slope,
      rSquare: rSquare
    });
  };

  toPrettyString = (num, precision = null) => {
    return Number.isNaN(num)
      ? ""
      : precision
      ? num.toPrecision(precision)
      : num;
  };

  componentDidUpdate(prevProps, prevState) {
    const { reduxAbout } = prevProps;
    if (!isEmpty(reduxAbout)) {
      this.props.dispatchAbout({});
    }
  }

  componentDidMount() {
    this.setState({
      rows: []
    });
  }

  render() {
    const { classes } = this.props;
    const { itemX, itemY, rows } = this.state;
    const { offset, slope, rSquare } = this.state;
    return (
      <AppContent className={classes.root} title="Linear Regression">
        <div className={classes.content}>
          <Typography variant="h4" gutterBottom>
            Model
          </Typography>
          <p />
          <Typography
            component="h2"
            variant="h5"
            color="textSecondary"
            gutterBottom
          >
            y = &beta;0 + &beta;1 x + &epsilon;
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            where &beta;0 is the offset, &beta;1 is the slope, and &epsilon; is
            the error term.
          </Typography>
          <p />
          <Typography variant="h4" gutterBottom>
            Input Values
          </Typography>
          <p />
          <TextField
            id="new-item-x"
            key="new-item-x"
            label="Measured, x"
            className={classes.textField}
            type="number"
            value={this.toPrettyString(itemX)}
            onChange={this.handleChange("itemX")}
            margin="normal"
          />
          <TextField
            id="new-item-y"
            key="new-item-y"
            label="True, y"
            className={classes.textField}
            type="number"
            value={this.toPrettyString(itemY)}
            onChange={this.handleChange("itemY")}
            margin="normal"
          />
          <Button
            variant="contained"
            className={classes.button}
            onClick={this.handleAddRow}
            disabled={!this.validRow()}
          >
            Add
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={this.handleClear}
            disabled={rows.length < 1}
          >
            Clear List
          </Button>
          <p />
          <Typography variant="h4" gutterBottom>
            Parameters
          </Typography>
          <p />
          <TextField
            id="result-offset"
            key="result-offset"
            label="Offset"
            className={classes.textField}
            value={this.toPrettyString(offset, 6)}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            inputProps={{
              readOnly: true
            }}
          />
          <TextField
            id="result-slope"
            key="result-slope"
            label="Slope"
            className={classes.textField}
            value={this.toPrettyString(slope, 6)}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            inputProps={{
              readOnly: true
            }}
          />
          <Button
            color="primary"
            onClick={this.handleCopy}
            disabled={Number.isNaN(offset)}
          >
            Copy to Clipboard
          </Button>
          <p />
          <Typography variant="h4" gutterBottom>
            Statistics
          </Typography>
          <TextField
            id="result-dof"
            key="result-dof"
            label="Degrees of Freedom"
            className={classes.textField}
            value={rows.length > 1 ? rows.length - 2 : ""}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            inputProps={{
              readOnly: true
            }}
          />
          <TextField
            id="result-rsq"
            key="result-rsq"
            label="R-Square(COD)"
            className={classes.textField}
            value={this.toPrettyString(rSquare, 6)}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            inputProps={{
              readOnly: true
            }}
          />
          <p />
          <Typography variant="h4" gutterBottom>
            Data Set
          </Typography>
          <p />
          <Paper>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Pt</TableCell>
                  <TableCell>X</TableCell>
                  <TableCell>Y</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={(index + 1).toString()}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row[0]}</TableCell>
                    <TableCell>{row[1]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </AppContent>
    );
  }
}

LinearRegressionPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  reduxAbout: state.about
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ dispatchAbout: changeAbout }, dispatch);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(LinearRegressionPage);
