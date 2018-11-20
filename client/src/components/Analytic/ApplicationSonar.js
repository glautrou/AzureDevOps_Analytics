// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames/bind';

import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import BugReport from '@material-ui/icons/BugReport';
import ReportProblem from '@material-ui/icons/ReportProblem';
import HourglassFull from '@material-ui/icons/HourglassFull';
import Block from '@material-ui/icons/Block';
import Cancel from '@material-ui/icons/Cancel';

type Props = {
  qualityGate: string,
  issues: {
    blocker: number,
    critical: number,
    major: number,
    minor: number,
    info: number
  },
  classes: ?any
};

function getTemplate(props: Props, status: string, icon: any) {
  return (
    <Typography variant="h5" component="h2" className={props.classes.state}>
      <Tooltip title={status}>{icon}</Tooltip>
    </Typography>
  );
}

function ApplicationSonar(props: Props) {
  let image = '';
  switch (props.qualityGate) {
    case 'OK':
      image = getTemplate(
        props,
        'OK',
        <ThumbUp
          className={classNames(props.classes.state, props.classes.stateOk)}
        />
      );
      break;
    case 'WARN':
      image = getTemplate(
        props,
        'WARN',
        <ReportProblem
          className={classNames(props.classes.state, props.classes.stateWarn)}
        />
      );
      break;
    case 'ERROR':
      image = getTemplate(
        props,
        'ERROR',
        <ThumbDown
          className={classNames(props.classes.state, props.classes.stateError)}
        />
      );
      break;
    case 'NONE':
      image = getTemplate(
        props,
        'NONE',
        <Block
          className={classNames(props.classes.state, props.classes.stateNone)}
        />
      );
      break;
  }
  return (
    <div className={props.classes.root}>
      <Grid container>
        <Grid item xs={6}>
          {image}
        </Grid>
        <Grid container item xs={6}>
          <Grid item xs={6}>
            Blocker :
          </Grid>
          <Grid item xs={6}>
            {props.issues.blocker}
          </Grid>
          <Grid item xs={6}>
            Critical :
          </Grid>
          <Grid item xs={6}>
            {props.issues.critical}
          </Grid>
          <Grid item xs={6}>
            Major :
          </Grid>
          <Grid item xs={6}>
            {props.issues.major}
          </Grid>
          <Grid item xs={6}>
            Minor :
          </Grid>
          <Grid item xs={6}>
            {props.issues.minor}
          </Grid>
          <Grid item xs={6}>
            Info :
          </Grid>
          <Grid item xs={6}>
            {props.issues.info}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

const styles = {
  root: {
    flexGrow: 1,
    border: '1px solid gray'
  },
  state: {
    fontSize: '40px',
    textAlign: 'center',
    height: '100%',
    verticalAlign: 'middle'
  },
  stateNone: {
    color: 'gray'
  },
  stateOk: {
    color: 'green'
  },
  stateWarn: {
    color: 'orange'
  },
  stateError: {
    color: 'red'
  }
};

export default withStyles(styles)(ApplicationSonar);
