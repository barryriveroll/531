import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { css } from "emotion";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Selector from "../components/Selector";
import CoreTable from "../components/CoreTable";
import AssistTable from "../components/AssistTable";
import API from "../utils/API";

const classes = {
  mainDiv: css`
    padding: 10px;
    text-align: center;
    background: linear-gradient(#99a1ad, #40393e);
    height: 100%;
  `,
  paper: css`
    background-color: #dad6d4 !important;
    padding: 6px;
    margin-bottom: 12px;
    color: #07243a !important;
  `,
  reduceBtn: css`
    float: left;
    padding: 0px;
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
    background-color: #2d3c4c47;
    padding: 4px 6px;
    border-radius: 4px;
  `,
  inputSize: css`
    font-size: 24px;
  `
};

var saveTimer = null;

class Tracker extends Component {
  state = {
    month: 1,
    week: 1,
    day: 1,
    coreLift: "Bench Press",
    coreActual: [0, 0, 0],
    assistance1Name: "Dumbbell Chest Press",
    assistance2Name: "Dumbbell Row",
    assistance1Numbers: [0, 0, 0, 0, 0],
    assistance2Numbers: [0, 0, 0, 0, 0],
    maxValue: 100
  };

  componentDidMount() {
    this.updateNumbers();
  }

  updateNumbers = () => {
    API.getWorkoutsByMonth(
      this.state.month,
      this.state.week,
      this.state.day,
      this.props.user
    ).then(res => {
      let coreActual = [0, 0, 0];
      let coreMax = 0;
      let assist1Actual = [0, 0, 0, 0, 0];
      let assist2Actual = [0, 0, 0, 0, 0];

      if (res.data.length) {
        coreActual = res.data[0].coreActual;
        coreMax = res.data[0].coreMax;
        assist1Actual = res.data[0].assist1Actual;
        assist2Actual = res.data[0].assist2Actual;
      }

      this.setState({
        coreActual,
        maxValue: coreMax,
        assistance1Numbers: assist1Actual,
        assistance2Numbers: assist2Actual
      });
    });
  };

  handleClickSelector = (timeframe, operator) => {
    let newValue = this.state[timeframe.toLowerCase()];
    newValue = eval(newValue + operator + "1");
    let newLift = this.state.coreLift;
    let newAssist1 = this.state.assistance1Name;
    let newAssist2 = this.state.assistance2Name;
    if (timeframe === "Day") {
      switch (newValue) {
        case 1:
          newLift = "Bench Press";
          newAssist1 = "Dumbbell Chest Press";
          newAssist2 = "Dumbbell Row";
          break;
        case 2:
          newLift = "Squat";
          newAssist1 = "Leg Press";
          newAssist2 = "Leg Curl";
          break;
        case 3:
          newLift = "Shoulder Press";
          newAssist1 = "Dips";
          newAssist2 = "Pull-ups";
          break;
        case 4:
          newLift = "Deadlift";
          newAssist1 = "Good Mornings";
          newAssist2 = "Hanging Leg Raise";
          break;
      }
    }

    this.setState(
      {
        [timeframe.toLowerCase()]: newValue,
        coreLift: newLift,
        assistance1Name: newAssist1,
        assistance2Name: newAssist2
      },
      () => {
        this.updateNumbers();
      }
    );
  };

  changeMax = event => {
    clearTimeout(saveTimer);
    this.setState({ maxValue: event.target.value });
    saveTimer = setTimeout(() => {
      this.autoSave();
    }, 500);
  };

  autoSave = () => {
    const dataToSave = {
      user: this.props.user,
      month: this.state.month,
      week: this.state.week,
      day: this.state.day,
      coreMax: this.state.maxValue,
      coreActual: this.state.coreActual,
      assist1Actual: this.state.assistance1Numbers,
      assist2Actual: this.state.assistance2Numbers
    };

    API.saveData(dataToSave).then(res => console.log(res));
  };

  changeAssistValues = event => {
    clearTimeout(saveTimer);
    const { value, name, id } = event.target;
    let newAssistValues = [...this.state[name]];
    newAssistValues[id] = value;
    this.setState({ [name]: newAssistValues });
    saveTimer = setTimeout(() => {
      this.autoSave();
    }, 500);
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
              <div style={{ display: "grid", textAlign: "left" }}>
                <Typography
                  style={{ marginBottom: -6, textAlign: "left" }}
                  variant="overline"
                >
                  Core Lift
                </Typography>
                <Typography variant="h4">{this.state.coreLift}</Typography>
              </div>
              <TextField
                id="filled-adornment-weight"
                style={{ width: 112, fontSize: 30 }}
                variant="filled"
                type="number"
                onChange={this.changeMax}
                value={this.state.maxValue}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">lbs</InputAdornment>
                  )
                }}
                inputProps={{
                  step: 5,
                  style: { fontSize: 30, padding: "10px 12px 10px" }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <CoreTable
                coreValues={this.state.coreActual}
                week={this.state.week}
                maxWeight={this.state.maxValue}
                changeValues={this.changeAssistValues}
                coreName={"coreActual"}
              />
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid className={classes.liftHeader} item xs={12}>
              <div style={{ display: "grid", textAlign: "left" }}>
                <Typography
                  style={{ marginBottom: -6, textAlign: "left" }}
                  variant="overline"
                >
                  Assistance #1
                </Typography>
                <Typography variant="h5">
                  {this.state.assistance1Name}
                </Typography>
              </div>
            </Grid>

            <Grid item xs={12}>
              <AssistTable
                weightValues={this.state.assistance1Numbers}
                maxWeight={this.state.maxValue}
                assistName="assistance1Numbers"
                changeAssistValues={this.changeAssistValues}
              />
            </Grid>
          </Grid>
          <Grid style={{ marginTop: 6 }} container>
            <Grid className={classes.liftHeader} item xs={12}>
              <div style={{ display: "grid", textAlign: "left" }}>
                <Typography
                  style={{ marginBottom: -6, textAlign: "left" }}
                  variant="overline"
                >
                  Assistance #2
                </Typography>
                <Typography variant="h5">
                  {this.state.assistance2Name}
                </Typography>
              </div>
            </Grid>

            <Grid item xs={12}>
              <AssistTable
                weightValues={this.state.assistance2Numbers}
                maxWeight={this.state.maxValue}
                assistName="assistance2Numbers"
                changeAssistValues={this.changeAssistValues}
              />
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default Tracker;
