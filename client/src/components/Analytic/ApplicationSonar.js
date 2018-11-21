// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames/bind';

import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ReportProblem from '@material-ui/icons/ReportProblem';
import Block from '@material-ui/icons/Block';
import Hidden from '@material-ui/core/Hidden';

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
    <div className={props.classes.state}>
      <Tooltip title={status}>{icon}</Tooltip>
    </div>
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
    default:
      image = null;
  }
  return (
    <div className={props.classes.root}>
      <Grid container>
        <Grid item xs={12} lg={3}>
          {image}
        </Grid>
        <Grid container item xs={12} lg={9}>
          <Grid item xs={12} lg={6}>
            <Chip
              label="Blocker"
              color={props.issues.blocker > 0 ? 'primary' : 'default'}
              avatar={
                <Avatar className={props.classes.chip}>
                  {props.issues.blocker}
                </Avatar>
              }
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Chip
              label="Critical"
              avatar={
                <Avatar className={props.classes.chip}>
                  {props.issues.critical}
                </Avatar>
              }
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Chip
              label="Major"
              avatar={
                <Avatar className={props.classes.chip}>
                  {props.issues.major}
                </Avatar>
              }
            />
          </Grid>
          <Hidden smDown>
            <Grid item xs={12} lg={6}>
              <Chip
                label="Minor"
                avatar={
                  <Avatar className={props.classes.chip}>
                    {props.issues.minor}
                  </Avatar>
                }
              />
            </Grid>
          </Hidden>
          <Hidden smDown>
            <Grid item xs={12} lg={6}>
              <Chip
                label="Info"
                avatar={
                  <Avatar className={props.classes.chip}>
                    {props.issues.info}
                  </Avatar>
                }
              />
            </Grid>
          </Hidden>
        </Grid>
      </Grid>
    </div>
  );
}

const styles = {
  root: {
    flexGrow: 1,
    boxShadow: 'inset 0px 0px 1px 1px #aaa',
    borderRadius: '20px',
    backgroundColor: '#eee',
    padding: '10px'
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '10px'
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
  },
  chip: {
    fontSize: '14px'
  }
};

export default withStyles(styles)(ApplicationSonar);
