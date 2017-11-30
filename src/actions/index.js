import axios from 'axios'



export const bearer_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTE3NTRjNGQwZjZiYTAwOGI3YTU5MDkiLCJpYXQiOjE1MTE0Nzg0Njh9.oXb6gEGi-AckEnP-BnMwNFMnKtkjQ0KKgZ9jCZZe_jU"


export function fetchProducts() {
  return {
    type: "FETCH_PRODUCTS",
    payload: axios.get('https://aerolab-challenge.now.sh/products', {
							headers: { Authorization: bearer_token }
	} )

  }
}

export function fetchUser(){
  return {
    type: "FETCH_USER",
    payload: axios.get('https://aerolab-challenge.now.sh/user/me', {
							headers: { Authorization: bearer_token }
	} )

  }
}


export function fetchQuestions(){
  return {
    type: "FETCH_QUESTIONS",
    payload: axios.get('https://opentdb.com/api.php?amount=50&type=multiple')

  }
}


export function nextPage() {
	return {
		type: "NEXT_PAGE"
	}
}

export function prevPage() {
	return {
		type: "PREV_PAGE"
	}
}

export function sortProducts(criteria) {
	return {
		type: "SORT_PRODUCTS",
		criteria: criteria
	}
}

export function openModal(title) {
	return {
		type: "OPEN_MODAL",
		title: title
	}
}



export function redeemProduct(id, price, name){
  return {
    type: "REDEEM_PRODUCT",
    price: price,
    name: name,
    payload: axios.post('https://aerolab-challenge.now.sh/redeem',{'productId': id}, {
    							headers: { Authorization: bearer_token }
	} )

  }
}

export function awardPoints(points){
  return {
    type: "AWARD_POINTS",
    payload: axios.post('https://aerolab-challenge.now.sh/user/points',{'amount': points}, {
    							headers: { Authorization: bearer_token }
	} )

  }
}

export function closeModal() {
	return {
		type: "CLOSE_MODAL"
	}
}





export function loadDummyData() {
	return {
		type: "LOAD_DUMMY_DATA"
	}
}


export function toggleTerminal() {
	return {
		type: "TOGGLE_TERMINAL"
	}
}

export function clearTerminal() {
	return {
		type: "CLEAR_TERMINAL"
	}
}




export function processCommand(user, message) {
	return {
		type: "PROCESS_COMMAND",
		user: user,
		message: message
	}
}

export function toggleGameMode() {
	return {
		type: "TOGGLE_GAME_MODE"
	}
}



export function filterByCategory(cat) {
	return {
		type: "FILTER_BY_CATEGORY",
		cat: cat
	}
}




