import React, { Component } from 'react';
import Application from './Application.js';
import arraySort from 'array-sort';
import * as qs from 'query-string';

class Analytic extends Component {
  state = {
    applications: null,
    isLoading: true,
    error: null
  };

  async componentDidMount() {
    await this.loadApplications();
    this.interval = setInterval(
      async () => this.loadApplications(),
      5 * 60 * 1000
    );
  }

  async componentWillUnmount() {
    clearInterval(this.interval);
  }

  async loadApplications() {
    this.setState({ isLoading: true });

    const queryStrings = qs.parse(this.props.location.search);
    const apps = queryStrings.apps;

    try {
      const response = await fetch('/azdev/projects');
      let json = await response.json();

      if (apps) {
        json = json.filter(value => apps.indexOf(value.code) !== -1);
      }

      arraySort(json, 'code');
      this.setState({ applications: json, isLoading: false });
    } catch (error) {
      this.setState({
        error,
        isLoading: false
      });
    }
  }

  render() {
    if (this.state.isLoading) {
      return <p>Loading ...</p>;
    }
    if (this.state.error) {
      return <p>Error: {this.state.error.message}</p>;
    }
    return (
      <>
        {this.state.applications.map(application => (
          <Application
            key={application.id}
            id={application.id}
            code={application.code}
          />
        ))}
      </>
    );
  }
}

export default Analytic;
