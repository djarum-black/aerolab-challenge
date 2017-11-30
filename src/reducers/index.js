


let dummyItem =  {
      _id: '',
      name: '▄▄▄▄▄▄▄▄▄',
      cost: 200,
      category: '▄▄▄▄▄▄▄▄▄',
      img: {
        url: 'placeholder.jpg'
      }
    }




const paginatedDemo = Array(32).fill(dummyItem)


const initialState = {
	isLoading: false,
	filter: 'recent',
	page: 1,
	products: {},
	filteredProducts: [],
	paginatedProducts: [],
	userData : {},
	points: 2000,
	userLoading: false,
	showModal: false,
	apiMessage: '',
	modalTitle: '',
	showTerminal: false,
	questions: '',
	triviaMode: false,
	messages: [{user: 'ugur', message: 'hello and welcome - type <span class="important">help</span> for available commands'}]
}

const aeroFilter = (state = initialState, action) => {
	switch(action.type) {
		case 'LOAD_DUMMY_DATA' : {
			return {...state, paginatedProducts: paginatedDemo}
		}

		case 'FETCH_PRODUCTS_PENDING': {
			return {...state}
			
		}
		case 'FETCH_PRODUCTS_FULFILLED': {
			return {...state, products: action.payload.data, filteredProducts:action.payload.data,  paginatedProducts: Object.values(action.payload.data).slice(0,16), isLoading: false}
			
		}

		case 'FETCH_USER_PENDING': {
			return {...state, userLoading: true}
			
		}

		case 'FETCH_USER_FULFILLED': {
			return {...state, userData: action.payload.data, points: action.payload.data.points, userLoading: false}
			
		}

		case 'FETCH_QUESTIONS_FULFILLED': {
			return {...state, questions: action.payload.data.results, triviaMode: true}
			
		}
		case 'REDEEM_PRODUCT_PENDING': {
			console.log(action)
			return {...state}
			
		}

		case 'REDEEM_PRODUCT_FULFILLED': {
			
			return {...state, apiMessage: action.payload.data.message }
			
		}

		case 'AWARD_POINTS_FULFILLED': {
			console.log(action.payload.data)
			return {...state, points: action.payload.data["New Points"]}
			
		}
		case 'OPEN_MODAL': {
			return {...state, showModal: true, modalTitle: action.title}
			
		}


		case 'CLOSE_MODAL': {
			return {...state, showModal: false, apiMessage: ''}
			
		}

		case 'TOGGLE_TERMINAL': {
			return {...state, showTerminal: !state.showTerminal}
			
		}

		case 'CLEAR_TERMINAL': {
			return {...state, messages: []}
			
		}

		case 'TOGGLE_GAME_MODE': {
			return {...state, triviaMode: !state.triviaMode}
		}


		case 'NEXT_PAGE': {
			return {...state, page: state.page+1, paginatedProducts: state.filteredProducts.concat().slice(state.page * 16, 16 + state.page * 16 )}
			
		}
		case 'PREV_PAGE': {
			return {...state, page: state.page-1, paginatedProducts: state.filteredProducts.concat().slice((state.page - 2) * 16, 16 + (state.page - 2) * 16 )}
			
		}


		case 'FILTER_BY_CATEGORY': {
			console.log(action, action.category, state.filteredProducts )
			let tempFiltered = state.filteredProducts.concat().filter(product => product.category === action.cat)
			return {...state, filter: 'lowest', filteredProducts: tempFiltered, paginatedProducts : tempFiltered.slice(0,16), page: 1 }
			
		}


		case 'SORT_PRODUCTS': {
			if(action.criteria === 'LOWEST_PRICE') {
				console.log("lowest")
				let tempFiltered = state.filteredProducts.concat().sort(function(a,b) { return parseFloat(a.cost) - parseFloat(b.cost) })
				return {...state, filter: 'lowest', filteredProducts: tempFiltered, paginatedProducts : tempFiltered.slice(0,16), page: 1 }
				
			}

			if(action.criteria === 'HIGHEST_PRICE') {
				console.log("highest")
				let tempFiltered = state.filteredProducts.concat().sort(function(a,b) { return parseFloat(b.cost) - parseFloat(a.cost) })
				return {...state, filter: 'highest', filteredProducts: tempFiltered , paginatedProducts : tempFiltered.slice(0,16), page: 1  }
				
			}

			if(action.criteria === 'RECENT') {
				console.log("recent")
				let tempFiltered = state.products.concat()
				return {...state, filter: 'recent', filteredProducts: tempFiltered , paginatedProducts : tempFiltered.slice(0,16), page: 1  }
				
			}
				return state


		}


		case 'PROCESS_COMMAND': {

			let tempMessages = state.messages.concat()
			let newPoints = state.userData.points


			tempMessages.push({user: action.user, message: action.message})






			return {...state, messages: tempMessages, points: newPoints } 

		}

		default:
			return state
	}
}

export default aeroFilter