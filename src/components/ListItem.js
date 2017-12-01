import  React, {  Component } from 'react';
import buyIcon from '../icons/buy-blue.svg';
import buyIconWhite from '../icons/buy-white.svg';
import coin from '../icons/coin.svg';
import * as API from '../actions/'


import '../css/ListItem.css'
class ListItem extends Component {

	constructor(props) {
		super(props)
		this.state = { hover: false }

	}


	handleMouseEnter() {
		this.setState({
			hover: true
		})
		
	}


	handleMouseLeave() {
		this.setState({
			hover: false
		})
		
	}

	handleClick(id, price, name) {
		console.log(id)
		this.props.dispatch(API.openModal(name))
		this.props.dispatch(API.redeemProduct(id, price, name))

	}

	render () {
		const {_id, name, cost, category, img} = this.props.data


		let srcset = img.hdUrl + '  2x, ' + img.url  + ' 1x' 
		

		return (
			<div className={this.state.hover && this.props.difference >= 0 ? 'card-hover-state' : 'card' }  onMouseEnter = { () => {this.handleMouseEnter()}} onMouseLeave = { () => {this.handleMouseLeave()}}  >
			  <div className="card-image">
			    <figure className="image">
			    
			    <picture>
			       
			       <source srcSet={srcset} />
			       <img src={img.url} alt={img}  />
			    </picture>
			     
			      
			
			    </figure>
			  </div>

			  {/* don't show icons for the dummy data */}
			  <div className={_id  ? '' : 'is-hidden'}>
			  { this.props.difference >= 0
			  ? <div className="redeemable"><img src={buyIcon} alt="redeemable" width="50" height="50"/></div>
			  : <div className="non-redeemable"><div className="inner">you need {this.props.difference * -1} <img src={coin} alt="coin" width="25" height="25"/></div></div>
			}
				</div>
			  <div className="divider"></div>
			  
			  <div className="container item-data">
			      <p className="title is-4" onClick = { () => {this.props.dispatch(API.filterByCategory(category))}}>{category}</p>
			       <p className="title is-5">{name}</p>

			        
			  </div>

			  <div className={this.state.hover && this.props.difference >= 0  ? 'card-overlay' : 'is-hidden' }>
			  <div className="overlay-redeemable"><img src={buyIconWhite} alt="redeemable" width="50" height="50"/></div>
			  <div className="overlay-title text-is-centered">
			  {cost} <img src={coin} alt="coin" width="36" height="36"/>
			  <button  onClick = { () => {this.handleClick(_id, cost, name)}}>Redeem Now</button> 
			  </div>

			  
			  </div>
			    


			
			</div>
		)
	
	}
}

export default ListItem