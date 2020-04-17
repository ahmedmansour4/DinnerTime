import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';

export class ItemLinks extends Component {
	goToAddFriends = e => {
			e.preventDefault()
			this.props.goToAddFriends()
	}
  render() {
    return (
			<div>
			<MenuItem>Home</MenuItem>
			<MenuItem onClick={this.goToAddFriends}>Favorites</MenuItem>
			<MenuItem>Friends</MenuItem>
			<MenuItem >Log Out</MenuItem>
			</div>
    );
  }
}

export default ItemLinks;
