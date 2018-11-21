// @flow

import React, { Component } from 'react';
import ApplicationBuild from './ApplicationBuild';
import ApplicationRelease from './ApplicationRelease';
import ApplicationSonar from './ApplicationSonar';

import arraySort from 'array-sort';

import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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
        <Grid container item xs={5} className={this.props.gridList}>
          {/* <div className={this.props.root}> */}
          {this.state.builds.map(build => (
            <Grid item key={build.id} xs={3}>
              <ApplicationBuild
                name={build.name}
                status={build.status}
                result={build.result}
                finishTime={build.finishTime}
              />
            </Grid>
          ))}
          {/* </div> */}
        </Grid>
      );
    } else {
      return null;
    }
  };

  renderReleases = (key: string) => {
    if (this.state.releases) {
      const hasManyReleases = this.state.releases.length > 1;
      return (
        <Grid container item xs={5} className={this.props.gridList}>
          {this.state.releases.map(release => (
            <ApplicationRelease
              key={release.name}
              name={release.name}
              environments={release.environments}
              hasManyReleases={hasManyReleases}
            />
          ))}
        </Grid>
      );
    } else {
      return null;
    }
  };

  renderSonar = (key: string) => {
    if (this.state.sonar) {
      return (
        <Grid key={key} item xs={2}>
          <ApplicationSonar {...this.state.sonar} />
        </Grid>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <div className={this.props.classes.root}>
        <div className={this.props.classes.title}>
          <div className={this.props.classes.titleWrap}>{this.props.code}</div>
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
            <Grid container spacing={40}>
              {this.renderBuilds('0')}
              {this.renderReleases('1')}
              {this.renderSonar('2')}
            </Grid>
          )}
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    marginBottom: 20
  },
  title: {
    width: '100%',
    background: '#ddd',
    marginBottom: 10
  },
  titleWrap: {
    width: '90%',
    margin: '0 auto',
    padding: '10px 0'
  }
});

export default withStyles(styles)(Application);
