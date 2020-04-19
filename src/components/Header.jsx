import React from 'react'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';

const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1
    }
}));

const Header = () => {
    return (
        <AppBar position='static'>
            <Toolbar>
                <IconButton>
                    <RestaurantMenuIcon fontSize="large"/>
                </IconButton>
                <Typography className={useStyles.typographyStyles} variant='h5'>
                    Dinner Time
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header