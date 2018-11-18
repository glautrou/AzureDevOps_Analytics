// @flow

import React, { Component } from "react";
import ApplicationBuild from "./ApplicationBuild";

import arraySort from "array-sort";

import Card from "@material-ui/core/Card";
// import CardActions from '@material-ui/core/CardActions';
import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";

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
    isLoading: true,
    error: null
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const response = await fetch(`/azdev/builds/${this.props.code}`);
      const json = await response.json();
      arraySort(json.builds, "name");
      this.setState({ builds: json.builds, isLoading: false });
    } catch (error) {
      this.setState({
        error,
        isLoading: false
      });
    }
  }

  // handleClick = e => {
  //   this.saySomething("element clicked");
  // };

  getBuildColour = build => {
    switch (build.status) {
      case 1:
        //In progress
        return "blue";
        break;
      case 2:
        //Completed
        //check completion state
        switch (build.result) {
          case 2:
            //Succeeded
            return "green";
            break;
          case 4:
            //PartiallySucceeded
            return "orange";
            break;
          case 8:
            //Failed
            return "red";
            break;
          case 32:
            //Canceled
            return "gray";
            break;
          default:
            return "gray";
        }
        break;
      default:
        return "gray";
    }
  };

  getBuildStatus2 = build => {
    switch (build.status) {
      case 1:
        //In progress
        return "blue";
        break;
      case 2:
        //Completed
        //check completion state
        switch (build.result) {
          case 2:
            //Succeeded
            return "green";
            break;
          case 4:
            //PartiallySucceeded
            return "orange";
            break;
          case 8:
            //Failed
            return "red";
            break;
          case 32:
            //Canceled
            return "gray";
            break;
          default:
            return "gray";
        }
        break;
      default:
        return "gray";
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
          this.state.builds &&
          this.state.builds.map(build => (
            <ApplicationBuild
              key={build.id}
              name={build.name}
              status={build.status}
              result={build.result}
              finishTime={build.finishTime}
            />
          ))}
      </div>
    );
  }
}

export default Application;
