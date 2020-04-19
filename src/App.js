import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid'

// Custom Components
import UserForm from './components/UserForm';
import Header from './components/Header'

class App extends Component {
  render() {
    return (
      <Grid container direction='column'>
        <Grid item>
            <Header />
        </Grid>

        <Grid item container>
          <Grid item xs={1} sm={2} />

          <Grid item xs={12}>
            <UserForm />
          </Grid>

          <Grid item xs={1} sm={2} />
        </Grid>
      </Grid>
    );
  }
}

export default App;
