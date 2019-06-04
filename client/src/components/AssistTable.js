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

class AssistTable extends React.Component {
  render() {
    const assistCols = [
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
        width: 100
      },

      {
        title: "Weight",
        dataIndex: "weight",
        key: "weight",
        width: 100
      }
    ];

    const assistData = [
      {
        set: "Set 1",
        sets: 5,
        reps: 12,
        weight: (
          <input
            type="number"
            step="5"
            className={classes.input}
            name={this.props.assistName}
            id="0"
            onChange={this.props.changeAssistValues}
            value={this.props.weightValues[0]}
          />
        ),
        key: "1"
      },
      {
        set: "Set 2",
        sets: 5,
        reps: 12,
        weight: (
          <input
            type="number"
            step="5"
            className={classes.input}
            name={this.props.assistName}
            id="1"
            onChange={this.props.changeAssistValues}
            value={this.props.weightValues[1]}
          />
        ),
        key: "2"
      },
      {
        set: "Set 3",
        sets: 5,
        reps: 12,
        weight: (
          <input
            type="number"
            step="5"
            className={classes.input}
            name={this.props.assistName}
            id="2"
            onChange={this.props.changeAssistValues}
            value={this.props.weightValues[2]}
          />
        ),
        key: "3"
      },
      {
        set: "Set 4",
        sets: 5,
        reps: 12,
        weight: (
          <input
            type="number"
            step="5"
            className={classes.input}
            name={this.props.assistName}
            id="3"
            onChange={this.props.changeAssistValues}
            value={this.props.weightValues[3]}
          />
        ),
        key: "4"
      },
      {
        set: "Set 5",
        sets: 5,
        reps: 12,
        weight: (
          <input
            type="number"
            step="5"
            className={classes.input}
            name={this.props.assistName}
            id="4"
            onChange={this.props.changeAssistValues}
            value={this.props.weightValues[4]}
          />
        ),
        key: "5"
      }
    ];

    return (
      <>
        <Table columns={assistCols} data={assistData} />
        {/* <Table
          columns={assistCols}
          data={this.props.weightValues.map((value, index) => ({
            set: "Set " + (index + 1),
            sets: 5,
            reps: 12,
            weight: (
              <input
                type="number"
                step="5"
                className={classes.input}
                name={this.props.assistName}
                id="0"
                onChange={this.props.changeAssistValues}
                onChange={this.props.changeAssistValues}
                value={value}
              />
            ),
            key: index + 1
          }))}
        /> */}
      </>
    );
  }
}

export default AssistTable;
