import React from 'react'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Menu from '@material-ui/icons/Menu'

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
                    <Menu />
                </IconButton>
                <Typography className={useStyles.typographyStyles}>
                    Dinner Time
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header