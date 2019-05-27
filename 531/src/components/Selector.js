import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { css } from "emotion";

import ArrowLeft from "@material-ui/icons/ArrowLeft";
import ArrowRight from "@material-ui/icons/ArrowRight";
import IconButton from "@material-ui/core/IconButton";

const classes = {
  reduceBtn: css`
    float: left;
  `,
  selectorDiv: css`
    display: flex;
    align-items: center;
    justify-content: center;
  `
};

function Selector(props) {
  return (
    <>
      <Typography variant="body1">{props.timeframe}</Typography>
      <div className={classes.selectorDiv}>
        <IconButton
          className={classes.reduceBtn}
          style={{ backgroundColor: props.buttonColor }}
          size="small"
          onClick={() => props.clickHandler(props.timeframe, "-")}
        >
          <ArrowLeft fontSize="inherit" />
        </IconButton>
        <Typography style={{ float: "left" }} variant="h2">
          {props.value}
        </Typography>
        <IconButton
          className={classes.reduceBtn}
          style={{ backgroundColor: props.buttonColor }}
          size="small"
          onClick={() => props.clickHandler(props.timeframe, "+")}
        >
          <ArrowRight fontSize="inherit" />
        </IconButton>
      </div>
    </>
  );
}

export default Selector;
