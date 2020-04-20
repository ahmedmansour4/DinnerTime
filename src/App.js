import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid'

// Custom Components
import UserForm from './components/UserForm';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import 'typeface-roboto';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#328CC1',
    },
    secondary: {
      main: '#D5E7F1',
    },
  },/*
	typography: {
    fontFamily: 'Segoe UI',
  }*/
});


class App extends Component {
  render() {
    return (
      <Grid container direction='column'>
				<ThemeProvider theme={theme}>
		      <Grid item>

		      </Grid>

		      <Grid item container>
		        <Grid item xs={1} sm={2} />

		        <Grid item xs={12}>
		          <UserForm />
		        </Grid>

		        <Grid item xs={1} sm={2} />
		      </Grid>
				</ThemeProvider>
      </Grid>
    );
  }
}

export default App;
