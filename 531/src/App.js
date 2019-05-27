import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { css } from "emotion";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import Selector from "./components/Selector";
import CoreTable from "./components/CoreTable";

const classes = {
  mainDiv: css`
    padding: 10px;
    text-align: center;
  `,
  paper: css`
    background-color: #dedede !important;
    padding: 6px;
    margin-bottom: 12px;
  `,
  reduceBtn: css`
    float: left;
  `,
  selectorDiv: css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  liftHeader: css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  `
};

class App extends Component {
  state = {
    month: 1,
    week: 1,
    day: 1,
    coreLift: "Bench Press",
    maxValue: 100
  };

  handleClickSelector = (timeframe, operator) => {
    let newValue = this.state[timeframe.toLowerCase()];
    newValue = eval(newValue + operator + "1");
    let newLift = this.state.coreLift;

    if (timeframe === "Day") {
      switch (newValue) {
        case 0:
          newValue = 1;
          break;
        case 1:
          newLift = "Bench Press";
          break;
        case 2:
          newLift = "Squat";
          break;
        case 3:
          newLift = "Shoulder Press";
          break;
        case 4:
          newLift = "Deadlift";
          break;
        case 5:
          newValue = 4;
          break;
      }
    } else if (timeframe === "Week") {
      switch (newValue) {
        case 0:
          newValue = 1;
          break;
        case 5:
          newValue = 4;
          break;
      }
    } else if (timeframe === "Month") {
      switch (newValue) {
        case 0:
          newValue = 1;
          break;
        case 13:
          newValue = 12;
          break;
      }
    }

    this.setState({ [timeframe.toLowerCase()]: newValue, coreLift: newLift });
  };

  changeMax = event => {
    this.setState({ maxValue: event.target.value });
  };

  render() {
    return (
      <div className={classes.mainDiv}>
        <Paper className={classes.paper}>
          <Grid container justify="space-evenly">
            <Grid item sm={4}>
              <Selector
                timeframe="Month"
                buttonColor="lightblue"
                value={this.state.month}
                clickHandler={this.handleClickSelector}
              />
            </Grid>
            <Grid item sm={4}>
              <Selector
                timeframe="Week"
                buttonColor="pink"
                value={this.state.week}
                clickHandler={this.handleClickSelector}
              />
            </Grid>
            <Grid item sm={4}>
              <Selector
                timeframe="Day"
                buttonColor="lightgreen"
                value={this.state.day}
                clickHandler={this.handleClickSelector}
              />
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid className={classes.liftHeader} item xs={12}>
              <Typography variant="h4">{this.state.coreLift}</Typography>
              <TextField
                id="filled-adornment-weight"
                style={{ width: 120, fontSize: 30 }}
                variant="filled"
                label="1RM"
                type="number"
                onChange={this.changeMax}
                value={this.state.maxValue}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">lbs</InputAdornment>
                  )
                }}
                inputProps={{ step: 5 }}
              />
            </Grid>
            <Grid item xs={12}>
              <CoreTable
                week={this.state.week}
                maxWeight={this.state.maxValue}
              />
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default App;
