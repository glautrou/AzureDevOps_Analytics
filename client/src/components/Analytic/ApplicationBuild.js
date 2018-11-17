// @flow

import React from "react";
import Moment from "react-moment";

import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";
import BugReport from "@material-ui/icons/BugReport";
import ReportProblem from "@material-ui/icons/ReportProblem";
import HourglassFull from "@material-ui/icons/HourglassFull";
import Block from "@material-ui/icons/Block";
import Cancel from "@material-ui/icons/Cancel";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";

import classNames from "classnames/bind";

type Props = {
  name: string,
  status: ?number,
  result: ?number,
  finishTime: ?Date,
  classes: ?any
};

function ApplicationBuild(props: Props) {
  return (
    <div>
      {props.status !== 1 &&
        props.status !== 2 &&
        getTemplate(
          props,
          "New",
          <Block
            className={classNames(props.classes.state, props.classes.stateNew)}
          />
        )}
      {props.status === 1 &&
        getTemplate(
          props,
          "In progress",
          <HourglassFull
            className={classNames(
              props.classes.state,
              props.classes.stateInProgress
            )}
          />
        )}
      {props.status === 2 &&
        props.result === 2 &&
        getTemplate(
          props,
          "Succeeded",
          <ThumbUp
            className={classNames(
              props.classes.state,
              props.classes.stateSucceeded
            )}
          />
        )}
      {props.status === 2 &&
        props.result === 4 &&
        getTemplate(
          props,
          "PartiallySucceeded",
          <ReportProblem
            className={classNames(
              props.classes.state,
              props.classes.statePartial
            )}
          />
        )}
      {props.status === 2 &&
        props.result === 8 &&
        getTemplate(
          props,
          "Failed",
          <ThumbDown
            className={classNames(
              props.classes.state,
              props.classes.stateFailed
            )}
          />
        )}
      {props.status === 2 &&
        props.result === 32 &&
        getTemplate(
          props,
          "Canceled",
          <Cancel
            className={classNames(
              props.classes.state,
              props.classes.stateCanceled
            )}
          />
        )}
      {props.status === 2 &&
        props.result !== 2 &&
        props.result !== 4 &&
        props.result !== 8 &&
        props.result !== 32 &&
        getTemplate(
          props,
          "Unknown",
          <BugReport
            className={classNames(
              props.classes.state,
              props.classes.stateUnknown
            )}
          />
        )}
    </div>
  );
}

function getTemplate(props: Props, status: string, icon: any) {
  return (
    <Card className={props.classes.card}>
      <CardContent>
        <Typography
          className={props.classes.title}
          color="textSecondary"
          gutterBottom
        >
          {props.name}
        </Typography>
        <Typography variant="h5" component="h2">
          {icon}
          {status}
        </Typography>
        <Typography className={props.classes.pos} color="textSecondary">
          <Moment format="DD/MM/YYYY HH:mm">{props.finishTime}</Moment> (
          <Moment fromNow>{props.finishTime}</Moment>)
        </Typography>
      </CardContent>
    </Card>
  );
}

const styles = {
  state: {
    fontSize: "40px"
  },
  stateInProgress: {
    color: "blue"
  },
  stateNew: {
    color: "gray"
  },
  stateSucceeded: {
    color: "green"
  },
  statePartial: {
    color: "orange"
  },
  stateFailed: {
    color: "red"
  },
  stateCanceled: {
    color: "purple"
  },
  stateUnknown: {
    color: "pink"
  },
  card: {
    minWidth: 275
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

export default withStyles(styles)(ApplicationBuild);