// @flow

import React from 'react';
import Moment from 'react-moment';
import '../../styles/animations.css';

import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import BugReport from '@material-ui/icons/BugReport';
import ReportProblem from '@material-ui/icons/ReportProblem';
import HourglassFull from '@material-ui/icons/HourglassFull';
import Block from '@material-ui/icons/Block';

import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import classNames from 'classnames/bind';

type Props = {
  name: string,
  release: ?number,
  version: ?string,
  status: number,
  finishTime: ?Date,
  classes: ?any
};

function ApplicationReleaseEnvironment(props: Props) {
  return (
    <>
      {props.status === 1 &&
        getTemplate(
          props,
          'Not deployed',
          <Block
            className={classNames(props.classes.state, props.classes.stateNew)}
          />
        )}
      {props.status === 2 &&
        getTemplate(
          props,
          'In progress',
          <HourglassFull
            className={classNames(
              props.classes.state,
              props.classes.stateInProgress,
              'rotate'
            )}
          />
        )}
      {props.status === 4 &&
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
      {props.status === 8 &&
        getTemplate(
          props,
          'Partially succeeded',
          <ReportProblem
            className={classNames(
              props.classes.state,
              props.classes.statePartial
            )}
          />
        )}
      {props.status === 16 &&
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
      {props.status !== 1 &&
        props.status !== 2 &&
        props.status !== 4 &&
        props.status !== 8 &&
        props.status !== 16 &&
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
    </>
  );
}

function getTemplate(props: Props, status: string, icon: any) {
  const hastFinishDate =
    props.finishTime && new Date(props.finishTime).getFullYear() > 2000;
  return (
    <div className={props.classes.root}>
      <div className={props.classes.title}>
        <Tooltip title={props.name}>
          <div>{props.name}</div>
        </Tooltip>
      </div>
      <Grid container>
        <Grid item md={12} lg={4}>
          <Tooltip title={status}>{icon}</Tooltip>
        </Grid>
        <Hidden smDown>
          <Grid item md={12} lg={8} className={props.classes.version}>
            {props.release}
            <br />
            {props.version}
          </Grid>
        </Hidden>
      </Grid>
      {hastFinishDate && (
        <div className={props.classes.date}>
          <Moment format="DD/MM/YYYY HH:mm">{props.finishTime}</Moment>
          <br />(<Moment fromNow>{props.finishTime}</Moment>)
        </div>
      )}
    </div>
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
  date: { fontSize: 12 },
  image: {
    fontSize: '40px'
  },
  version: {
    textAlign: 'left',
    fontSize: 12,
    marginTop: 5
  }
};

export default withStyles(styles)(ApplicationReleaseEnvironment);
