import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';

const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1
    },
}));



const Header = (props) => {

	const goLogIn = (event) => {
			event.preventDefault();
			props.goLogIn();
	}

    return (
        <AppBar position='static'>
            <Toolbar>
						<Button onClick={goLogIn}>
						<Typography color="secondary" variant="h6">
								Dinner Time
						</Typography>
						</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header
