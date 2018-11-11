// @flow

import React, { Component } from "react";
import Card from "@material-ui/core/Card";
// import CardActions from '@material-ui/core/CardActions';
import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

type Props = { id: number, code: string };
type State = {
  builds?: ?({
    id?: ?string,
    name?: ?string,
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
      this.setState({ builds: json.builds, isLoading: false });
    } catch (error) {
      this.setState({
        error,
        isLoading: false
      });
    }
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <b>{this.props.code}</b>
          </div>
          {this.state.error && <div>Error: {this.state.error}</div>}

          {this.state.isLoading && <div>Loading...</div>}

          {!this.state.isLoading &&
            !this.state.error &&
            this.state.builds &&
            this.state.builds.map(build => (
              <div key={build.id}>&nbsp;&nbsp;&nbsp;&nbsp;{build.name}</div>
            ))}
        </div>
      </div>
    );
  }
}

export default Application;
