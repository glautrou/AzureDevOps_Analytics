// @flow

import React from 'react';
import ApplicationReleaseEnvironment from './ApplicationReleaseEnvironment.js';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

type Props = {
  name: string,
  environments: any[],
  hasManyReleases: boolean
};

function ApplicationRelease(props: Props) {
  return (
    <Grid container>
      {props.hasManyReleases && (
        <Grid item xs={12}>
          {props.name}
        </Grid>
      )}

      {props.environments.map(i => (
        <Grid item xs={3} key={i.name} className={props.classes.root}>
          <ApplicationReleaseEnvironment key={i.name} {...i} />
        </Grid>
      ))}
    </Grid>
  );
}

const styles = {
  root: {
    //boxShadow: 'inset 0px 0px 1px 1px #aaa'
  }
};

export default withStyles(styles)(ApplicationRelease);
