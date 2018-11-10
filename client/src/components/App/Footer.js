// @flow

import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  footer: {
    backgroundColor: "#3f51b5",
    padding: theme.spacing.unit * 2
  }
});

type Props = { classes: any };

function Footer(props: Props) {
  return (
    <footer className={props.classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        Azure DevOps Analytics
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        Copyright
      </Typography>
    </footer>
  );
}

export default withStyles(styles)(Footer);
