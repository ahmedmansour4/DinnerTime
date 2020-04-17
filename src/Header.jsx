import React from 'react'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Navbar from 'react-bootstrap/Navbar'

import ItemLinks from './components/ItemLinks';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
		flexGrow: 1,
  },
  paper: {
    marginRight: theme.spacing(2),
  },
	typographyStyles: {
			flex: 1
	},
	menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const Header = (props) => {
	const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

	{/*New */}
	const goToLogOut = (event) => {
			event.preventDefault();
			props.goToLogOut();
	}

	const goHome = (event) => {
			event.preventDefault();
			props.goHome();
	}

	const getFriendList = (event) => {
			event.preventDefault();
			props.getFriendList();
	}

	const getFavorites = (event) => {
			event.preventDefault();
			props.getFavorites();
	}


  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  	}, [open]);

    return (

        <AppBar position='static'>
            <Toolbar>
							<div className={classes.root}>
								<div>
									<IconButton
										ref={anchorRef}
										aria-controls={open ? 'menu-list-grow' : undefined}
										aria-haspopup="true"
										onClick={handleToggle}
										className={classes.menuButton}
										edge="start"
										>
										<Menu />
									</IconButton>
									<Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
									  {({ TransitionProps, placement }) => (
					            <Grow
					              {...TransitionProps}
					              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
					            >
		 										<Paper>
					                <ClickAwayListener onClickAway={handleClose}>
					                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
															{/*	<ItemLinks />*/}

					                    <MenuItem onClick={goHome}>Home</MenuItem>
					                    <MenuItem onClick={getFavorites}>Favorites</MenuItem>
					                    <MenuItem onClick={getFriendList}>Friends</MenuItem>
															<MenuItem onClick={goToLogOut}>Log Out</MenuItem>

					                  </MenuList>
					                </ClickAwayListener>
					              </Paper>
					            </Grow>
					          )}
					        </Popper>
					      </div>
					    </div>
							<Typography variant="h6">
									Dinner Time
							</Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header
