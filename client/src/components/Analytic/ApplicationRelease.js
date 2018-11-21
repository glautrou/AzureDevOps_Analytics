// @flow

import React from 'react';
import ApplicationReleaseEnvironment from './ApplicationReleaseEnvironment.js';

import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Grid from '@material-ui/core/Grid';

type Props = {
  name: string,
  environments: any[]
};

function ApplicationRelease(props: Props) {
  return (
    <Grid container>
      <Grid item xs={12}>
        {props.name}
      </Grid>
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
