// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames/bind';

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

function ApplicationSonar(props: Props) {
  let gateClass = null;
  switch (props.qualityGate) {
    case 'OK':
      gateClass = props.classes.gateOk;
      break;
    case 'WARN':
      gateClass = props.classes.gateWarn;
      break;
    case 'ERROR':
      gateClass = props.classes.gateError;
      break;
    case 'NONE':
      gateClass = props.classes.gateNone;
      break;
  }
  return (
    <div className={classNames(props.classes.root, gateClass)}>
      <Grid container>
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
    </div>
  );
}

const styles = {
  root: {
    flexGrow: 1
  },
  gateOk: {
    backgroundColor: 'green'
  },
  gateWarn: {
    backgroundColor: 'orange'
  },
  gateError: {
    backgroundColor: 'red'
  },
  gateNone: {
    backgroundColor: 'gray'
  }
};

export default withStyles(styles)(ApplicationSonar);
