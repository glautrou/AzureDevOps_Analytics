// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  footer: {
    backgroundColor: '#3f51b5',
    padding: theme.spacing.unit * 2,
    textAlign: 'center'
  }
});

type Props = { classes: any };

function Footer(props: Props) {
  return (
    <footer className={props.classes.footer}>
      <div>Azure DevOps Analytics- Copyright</div>
    </footer>
  );
}

export default withStyles(styles)(Footer);
