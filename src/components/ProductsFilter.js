import  React, {  Component } from 'react';
import arrowRight from '../icons/arrow-right.svg'
import arrowLeft from '../icons/arrow-left.svg'
import '../css/ProductsFilter.css'






class ProductsFilter extends Component {



	render() {
		let { that, startingNumber, numberOfItems, page, totalNumOfItems, showFilters, activeFilter } = this.props
		
		const filters = ( 
			<div className="level-item">
			<span>Sort By:</span>

				<button id={activeFilter==='recent' ? 'active' : ''} className="filter-button" onClick= {() => that.sortProducts("RECENT")}  > recent </button>
				<button id={activeFilter==='lowest' ? 'active' : ''} className="filter-button" onClick= {() => that.sortProducts("LOWEST_PRICE")} > lowest </button>
				<button id={activeFilter==='highest' ? 'active' : ''} className="filter-button" onClick= {() => that.sortProducts("HIGHEST_PRICE")} > highest </button>
				
				
			</div>
			)

		return (
			<nav className="level is-marginless" >
				<div className="level-left">
					<div className="level-item">
						<span className="number-of-products">{startingNumber} - {numberOfItems * page} of {totalNumOfItems} products</span>
			  		</div>

			  		<div className="level-item is-hidden-touch v-divider">
			  		 </div>

			  		 {showFilters ?  filters  : "" }


			  	</div>

			  	<div className="level-right">

			  		<div className="level-item">
			  			{
			  				page > 1 
			  				? <img  src={arrowLeft}  onClick= {() => that.prevPage()}  alt="previous page"/>
			  				: ""

			  			}

			  			{
			  				page * 16 < totalNumOfItems 
			  				? <img src={arrowRight}   onClick= {() => that.nextPage()} alt="next page"/>
			  				: ""

			  			}
			  			
			  		</div>
			  	</div>
			</nav>
			)
		}
	}




export default ProductsFilter