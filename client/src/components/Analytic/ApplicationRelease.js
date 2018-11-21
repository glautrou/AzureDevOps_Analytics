// @flow

import React from 'react';
import ApplicationReleaseEnvironment from './ApplicationReleaseEnvironment.js';

import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

type Props = {
  name: string,
  environments: any[]
};

function ApplicationRelease(props: Props) {
  return (
    <GridList cols={4}>
      {props.environments.map(i => (
        <GridListTile key={i.name} cols={1} className={props.classes.root}>
          <ApplicationReleaseEnvironment key={i.name} {...i} />
        </GridListTile>
      ))}
    </GridList>
    // <div>
    //   <div>{props.name}</div>
    //   {props.environments.map(i => (
    //     <ApplicationReleaseEnvironment key={i.name} {...i} />
    //   ))}
    // </div>
  );
}

const styles = {
  root: {
    boxShadow: 'inset 0px 0px 1px 1px #aaa'
  }
};

export default withStyles(styles)(ApplicationRelease);
