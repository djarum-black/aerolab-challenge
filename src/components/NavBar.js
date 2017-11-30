import  React, {  Component } from 'react';
import logo from '../icons/aerolab-logo.svg';
import coin from '../icons/coin.svg';

import '../css/NavBar.css'


class NavBar extends Component {
	render() {
		return (

			<div className="columns navbar">
			  <div className="column is-three-quarters">
			  	<img src={logo} className="logo" alt="logo"/>
			  </div>
			  <div className="column is-hidden-mobile" id="navbar-user-data"><span className="username">{this.props.username }</span>
			  <span className="points"><span>{this.props.points}</span><span> <img src={coin} alt="coin"/></span></span></div>
			</div>

			)
	}
}

export default NavBar


