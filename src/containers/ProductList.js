import  React, {  Component } from 'react';
import { connect } from 'react-redux';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ProductsFilter from '../components/ProductsFilter'
import Modal from '../components/Modal'
import ListItem from '../components/ListItem'
import * as API from '../actions/'






function mapStateToProps(state) {
  return { 
  		products: state.products, 
  		paginatedProducts: state.paginatedProducts, 
  		filteredProducts: state.filteredProducts,  
  		isLoading: state.isLoading, 
  		page: state.page,
  		points: state.points,
  		showModal: state.showModal,
  		apiMessage: state.apiMessage,
  		modalTitle: state.modalTitle,
  		filter: state.filter
  	};
}

class ProductList extends Component {


	nextPage() {
		
		this.props.dispatch(API.nextPage())
	}

	prevPage() {
		
		this.props.dispatch(API.prevPage())
	}

	sortProducts(criteria) {
		
		this.props.dispatch(API.sortProducts(criteria))
	}

	closeModal() {
		this.props.dispatch(API.fetchUser())
		this.props.dispatch(API.closeModal())
	}

	toggleTerminal() {

		this.props.dispatch(API.toggleTerminal())
		console.log(document.getElementById("terminalInput"))
		setTimeout(function() { document.getElementById("terminalInput").focus() }, 1000);

	}


	render () {
		let { paginatedProducts, filteredProducts, isLoading, page, showModal, apiMessage, modalTitle, filter} = this.props

		let startingNumber = (page - 1) * 16 +1

		let numberOfItems = paginatedProducts.length


		if(isLoading) {
			return (
				<section className="product-list">
				<div className="columns is-mobile">
				  <div className="column is-2 is-offset-5">
				  	<img src="https://loading.io/spinners/fidget-spinner/index.fidget-spinner.svg" alt="spinner"/>
				  </div>
				</div>

				</section>
				)
		}

		else {

		return (
			<section className="product-list">


			

	
			<div className="container  product-container">

			<ProductsFilter that={this} startingNumber={startingNumber} numberOfItems={numberOfItems}
				page={page} totalNumOfItems={filteredProducts.length} showFilters={true} activeFilter={filter} />

			<div className="h-divider"></div>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
			
			
				{ 
					paginatedProducts.map((value, index) => {
								return (
									<ListItem key={index} data={value} difference={this.props.points-value.cost} dispatch={this.props.dispatch} />
										
								)
							})
				}
			     </ReactCSSTransitionGroup>
			</div>

				<ProductsFilter that={this} startingNumber={startingNumber} numberOfItems={numberOfItems}
					page={page} totalNumOfItems={filteredProducts.length} showFilters={false} />
			
				<Modal showModal={showModal} that={this} apiMessage={apiMessage} modalTitle={modalTitle} />

				<br/><br/><span onClick = {() => this.toggleTerminal() } > don't like images?</span>
			</section>
		)
	}
	}
}

export default connect(mapStateToProps)(ProductList)