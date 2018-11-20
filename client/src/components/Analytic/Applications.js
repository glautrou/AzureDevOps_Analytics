import React, { Component } from 'react';
import Application from './Application.js';
import arraySort from 'array-sort';

class Analytic extends Component {
  state = {
    applications: null,
    isLoading: true,
    error: null
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const response = await fetch('/azdev/projects');
      const json = await response.json();
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
      <ul>
        {this.state.applications.map(application => (
          <Application
            key={application.id}
            id={application.id}
            code={application.code}
          />
        ))}
      </ul>
    );
  }
}

export default Analytic;
