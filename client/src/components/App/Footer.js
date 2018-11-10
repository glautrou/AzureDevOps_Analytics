// @flow

import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

type Props = {};

function Footer(props: Props) {
  return (
    <Grid container spacing={24}>
      <Grid item xs={12}>
        Copyright
      </Grid>
    </Grid>
  );
}

export default Footer;
