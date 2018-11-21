// @flow

import React from 'react';
import Moment from 'react-moment';

import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import BugReport from '@material-ui/icons/BugReport';
import ReportProblem from '@material-ui/icons/ReportProblem';
import HourglassFull from '@material-ui/icons/HourglassFull';
import Block from '@material-ui/icons/Block';
import Cancel from '@material-ui/icons/Cancel';

import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import classNames from 'classnames/bind';

type Props = {
  name: string,
  status: ?number,
  result: ?number,
  finishTime: ?Date,
  classes: ?any
};

function ApplicationBuild(props: Props) {
  return (
    <div className={props.classes.root}>
      {props.status !== 1 &&
        props.status !== 2 &&
        getTemplate(
          props,
          'New',
          <Block
            className={classNames(props.classes.state, props.classes.stateNew)}
          />
        )}
      {props.status === 1 &&
        getTemplate(
          props,
          'In progress',
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
          'Succeeded',
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
          'PartiallySucceeded',
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
          'Failed',
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
          'Canceled',
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
          'Unknown',
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
  const hastFinishDate =
    props.finishTime && new Date(props.finishTime).getFullYear() > 2000;
  return (
    <>
      <div className={props.classes.title}>
        <Tooltip title={props.name}>
          <div>{props.name}</div>
        </Tooltip>
      </div>
      <div>
        <Tooltip title={status}>{icon}</Tooltip>
      </div>
      {hastFinishDate && (
        <div className={props.classes.date}>
          <Moment format="DD/MM/YYYY HH:mm">{props.finishTime}</Moment>
          <br />(<Moment fromNow>{props.finishTime}</Moment>)
        </div>
      )}
    </>
  );
}

const styles = {
  root: {
    flexGrow: 1,
    boxShadow: 'inset 0px 0px 1px 1px #aaa',
    borderRadius: '20px',
    backgroundColor: '#eee',
    padding: '10px',
    textAlign: 'center'
  },
  state: {
    fontSize: '40px'
  },
  stateInProgress: {
    color: 'blue'
  },
  stateNew: {
    color: 'gray'
  },
  stateSucceeded: {
    color: 'green'
  },
  statePartial: {
    color: 'orange'
  },
  stateFailed: {
    color: 'red'
  },
  stateCanceled: {
    color: 'purple'
  },
  stateUnknown: {
    color: 'pink'
  },
  title: {
    fontSize: 14,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  date: {
    fontSize: 12
  }
};

export default withStyles(styles)(ApplicationBuild);
