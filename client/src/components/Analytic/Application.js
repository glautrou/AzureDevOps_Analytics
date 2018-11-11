// @flow

import React, { Component } from "react";
import Card from "@material-ui/core/Card";
// import CardActions from '@material-ui/core/CardActions';
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

type Props = { id: number, name: string };

function Application(props: Props) {
  return (
    <Card>
      <CardContent>
        <Typography>{props.name}</Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}

export default Application;
