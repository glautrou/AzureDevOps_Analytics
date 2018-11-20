// @flow

import React from 'react';
import ApplicationReleaseEnvironment from './ApplicationReleaseEnvironment.js';
import Moment from 'react-moment';

import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import BugReport from '@material-ui/icons/BugReport';
import ReportProblem from '@material-ui/icons/ReportProblem';
import HourglassFull from '@material-ui/icons/HourglassFull';
import Block from '@material-ui/icons/Block';
import Cancel from '@material-ui/icons/Cancel';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import classNames from 'classnames/bind';

type Props = {
  name: string,
  environments: any[]
};

function ApplicationRelease(props: Props) {
  console.log(props.environments);
  return (
    <GridList cols={4}>
      {props.environments.map(i => (
        <GridListTile key={i.name} cols={1}>
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
  state: {
    fontSize: '40px'
  }
};

export default withStyles(styles)(ApplicationRelease);
