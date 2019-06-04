import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { css } from "emotion";
import Table from "rc-table";

const classes = {
  reduceBtn: css`
    float: left;
  `,
  selectorDiv: css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  col: css`
    text-align: left;
  `,
  input: css`
    width: 60px;
    text-align: center;
  `
};

function findGoalWeight(setNum, weekNum, maxWeight) {
  let newGoal = 0;

  switch (weekNum) {
    case 1:
      switch (setNum) {
        case 1:
          newGoal = maxWeight * 0.65;
          newGoal = newGoal.toFixed(0);
          break;
        case 2:
          newGoal = maxWeight * 0.75;
          newGoal = newGoal.toFixed(0);
          break;
        case 3:
          newGoal = maxWeight * 0.85;
          newGoal = newGoal.toFixed(0);
          break;
      }
      break;
    case 2:
      switch (setNum) {
        case 1:
          newGoal = maxWeight * 0.7;
          newGoal = newGoal.toFixed(0);
          break;
        case 2:
          newGoal = maxWeight * 0.8;
          newGoal = newGoal.toFixed(0);
          break;
        case 3:
          newGoal = maxWeight * 0.9;
          newGoal = newGoal.toFixed(0);
          break;
      }
      break;
    case 3:
      switch (setNum) {
        case 1:
          newGoal = maxWeight * 0.75;
          newGoal = newGoal.toFixed(0);
          break;
        case 2:
          newGoal = maxWeight * 0.85;
          newGoal = newGoal.toFixed(0);
          break;
        case 3:
          newGoal = maxWeight * 0.95;
          newGoal = newGoal.toFixed(0);
          break;
      }
      break;
    case 4:
      switch (setNum) {
        case 1:
          newGoal = maxWeight * 0.4;
          newGoal = newGoal.toFixed(0);
          break;
        case 2:
          newGoal = maxWeight * 0.5;
          newGoal = newGoal.toFixed(0);
          break;
        case 3:
          newGoal = maxWeight * 0.6;
          newGoal = newGoal.toFixed(0);
          break;
      }
      break;
  }

  while (newGoal % 5 !== 0) {
    newGoal++;
  }

  return newGoal;
}

function findReps(setNum, weekNum) {
  let reps = 5;
  let percentReps;
  switch (weekNum) {
    case 1:
      switch (setNum) {
        case 1:
          percentReps = " x 65%";
          break;
        case 2:
          percentReps = " x 75%";
          break;
        case 3:
          percentReps = " x 85%";
          break;
      }
      break;
    case 2:
      reps = 3;
      switch (setNum) {
        case 1:
          percentReps = " x 70%";
          break;
        case 2:
          percentReps = " x 80%";

          break;
        case 3:
          percentReps = " x 90%";

          break;
      }
      break;
    case 3:
      switch (setNum) {
        case 1:
          percentReps = " x 75%";
          break;
        case 2:
          reps = 3;
          percentReps = " x 85%";
          break;
        case 3:
          reps = 1;
          percentReps = " x 95%";
          break;
      }
      break;
    case 4:
      switch (setNum) {
        case 1:
          percentReps = " x 40%";
          break;
        case 2:
          percentReps = " x 50%";
          break;
        case 3:
          percentReps = " x 60%";
          break;
      }
      break;
  }

  return reps + percentReps;
}

function CoreTable(props) {
  const columns = [
    {
      title: "Set",
      dataIndex: "set",
      key: "set",
      width: 200,
      className: classes.col
    },
    {
      title: "Reps",
      dataIndex: "reps",
      key: "reps",
      width: 200
    },
    {
      title: "Goal",
      dataIndex: "goal",
      key: "goal",
      width: 100
    },
    {
      title: "Actual",
      dataIndex: "actual",
      key: "actual",
      width: 100
    }
  ];

  const data = [
    {
      set: "Set 1",
      reps: findReps(1, props.week),
      goal: findGoalWeight(1, props.week, props.maxWeight),
      actual: (
        <input
          type="number"
          step="5"
          name={props.coreName}
          id="0"
          onChange={props.changeValues}
          value={props.coreValues[0]}
          className={classes.input}
        />
      ),
      key: "1"
    },
    {
      set: "Set 2",
      reps: findReps(2, props.week),
      goal: findGoalWeight(2, props.week, props.maxWeight),
      actual: (
        <input
          type="number"
          step="5"
          name={props.coreName}
          id="1"
          onChange={props.changeValues}
          value={props.coreValues[1]}
          className={classes.input}
        />
      ),
      key: "2"
    },
    {
      set: "Set 3",
      reps: findReps(3, props.week),
      goal: findGoalWeight(3, props.week, props.maxWeight),
      actual: (
        <input
          type="number"
          step="5"
          name={props.coreName}
          id="2"
          onChange={props.changeValues}
          value={props.coreValues[2]}
          className={classes.input}
        />
      ),
      key: "3"
    }
  ];

  return (
    <>
      <Table columns={columns} data={data} />
    </>
  );
}

export default CoreTable;
