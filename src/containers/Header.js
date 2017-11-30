import  React, {  Component } from 'react';

import { connect } from 'react-redux';

import * as API from '../actions/'


import NavBar from '../components/NavBar'

function mapStateToProps(state) {
  return { 
  		user: state.userData,
  		userLoading: state.userLoading,
  		points: state.points
  	};
}

class Header extends Component {
	constructor(props){
		super(props)
		this.state = { clickCount : 1 }
	}
	awardPoints() {
		let {dispatch} = this.props
		this.setState({ clickCount: this.state.clickCount + 1 })

		if ( this.state.clickCount % 5 === 0) {
			dispatch(API.awardPoints([1000, 5000, 7500][Math.floor(Math.random() * 3) + 1  ]))
		}
	}


	render () {
		return (
			<NavBar username={this.props.user.name} points={this.props.points} that={this}/>
		)
	}
}


export default connect(mapStateToProps)(Header)