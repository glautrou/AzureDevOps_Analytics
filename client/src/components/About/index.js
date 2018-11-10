// @flow

import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

// function test(x: ?number): string {
//   if (x) {
//     return x;
//   }
//   return "default string";
// }

type Props = { applicationName: string, author: string };

//const About = () => <h2>About</h2>;

function About(props: Props) {
  return (
    <Grid container spacing={24}>
      <Grid item xs={6}>
        {props.applicationName}
      </Grid>
      <Grid item xs={6}>
        {props.author}
      </Grid>
    </Grid>
  );
}

export default About;
