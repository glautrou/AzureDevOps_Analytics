// @flow

import React, { Component } from 'react';
import ApplicationBuild from './ApplicationBuild';
import ApplicationRelease from './ApplicationRelease';
import ApplicationSonar from './ApplicationSonar';

import arraySort from 'array-sort';

import CircularProgress from '@material-ui/core/CircularProgress';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { withStyles } from '@material-ui/core/styles';

type Props = { id: number, code: string };
type State = {
  builds?: ?({
    id?: ?string,
    name: string,
    type?: ?number,
    status?: ?number,
    result?: ?number,
    finishTime?: ?Date
  }[]),
  isLoading: boolean,
  error: ?string
};

class Application extends Component<Props, State> {
  state = {
    builds: null,
    releases: null,
    sonar: null,
    isLoading: true,
    error: null
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      //builds
      const responseBuilds = await fetch(`/azdev/builds/${this.props.code}`);
      const jsonBuilds = await responseBuilds.json();
      arraySort(jsonBuilds.builds, 'name');

      //releases
      const responseReleases = await fetch(
        `/azdev/releases/${this.props.code}`
      );
      const jsonReleases = await responseReleases.json();

      //Sonar
      let sonarJson = null;
      const sonarResponse = await fetch(`/sonar/summary/${this.props.code}`);
      if (sonarResponse.status === 200) {
        sonarJson = await sonarResponse.json();
      }

      this.setState({
        builds: jsonBuilds.builds,
        releases: jsonReleases.releases,
        sonar: sonarJson,
        isLoading: false
      });
    } catch (error) {
      console.log(error);
      this.setState({
        error,
        isLoading: false
      });
    }
  }

  // handleClick = e => {
  //   this.saySomething("element clicked");
  // };

  // getBuildColour = build => {
  //   switch (build.status) {
  //     case 1:
  //       //In progress
  //       return 'blue';
  //       break;
  //     case 2:
  //       //Completed
  //       //check completion state
  //       switch (build.result) {
  //         case 2:
  //           //Succeeded
  //           return 'green';
  //           break;
  //         case 4:
  //           //PartiallySucceeded
  //           return 'orange';
  //           break;
  //         case 8:
  //           //Failed
  //           return 'red';
  //           break;
  //         case 32:
  //           //Canceled
  //           return 'gray';
  //           break;
  //         default:
  //           return 'gray';
  //       }
  //       break;
  //     default:
  //       return 'gray';
  //   }
  // };

  // getBuildStatus2 = build => {
  //   switch (build.status) {
  //     case 1:
  //       //In progress
  //       return 'blue';
  //       break;
  //     case 2:
  //       //Completed
  //       //check completion state
  //       switch (build.result) {
  //         case 2:
  //           //Succeeded
  //           return 'green';
  //           break;
  //         case 4:
  //           //PartiallySucceeded
  //           return 'orange';
  //           break;
  //         case 8:
  //           //Failed
  //           return 'red';
  //           break;
  //         case 32:
  //           //Canceled
  //           return 'gray';
  //           break;
  //         default:
  //           return 'gray';
  //       }
  //       break;
  //     default:
  //       return 'gray';
  //   }
  // };

  renderBuilds = (key: string) => {
    if (this.state.builds) {
      return (
        <GridListTile key={key} cols={5}>
          <div className={this.props.root}>
            <GridList className={this.props.gridList} cols={4}>
              {this.state.builds.map(build => (
                <GridListTile key={build.id} cols={1}>
                  <ApplicationBuild
                    name={build.name}
                    status={build.status}
                    result={build.result}
                    finishTime={build.finishTime}
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
        </GridListTile>
      );
    } else {
      return null;
    }
  };

  renderReleases = (key: string) => {
    if (this.state.releases) {
      return (
        <GridListTile key={key} cols={5}>
          <GridList className={this.props.gridList} cols={4}>
            {this.state.releases.map(release => (
              <ApplicationRelease
                name={release.name}
                environments={release.environments}
              />
            ))}
          </GridList>
        </GridListTile>
      );
    } else {
      return null;
    }
  };

  renderSonar = (key: string) => {
    if (this.state.sonar) {
      return (
        <GridListTile key={key} cols={2}>
          <ApplicationSonar {...this.state.sonar} />
        </GridListTile>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <div>
        <div>
          <b>{this.props.code}</b>
        </div>
        {this.state.error && <div>Error: {this.state.error}</div>}
        {this.state.isLoading && (
          <div>
            <CircularProgress />
          </div>
        )}
        {!this.state.isLoading &&
          !this.state.error &&
          (this.state.builds.length > 0 ||
            this.state.releases.length > 0 ||
            this.state.sonar) && (
            <GridList className={this.props.gridList} cols={12}>
              {this.renderBuilds('0')}
              {this.renderReleases('1')}
              {this.renderSonar('2')}
            </GridList>
          )}
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    /*display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper*/
  },
  gridList: {
    // width: 500,
    // height: 450
  },
  subheader: {
    width: '100%'
  }
});

export default withStyles(styles)(Application);
