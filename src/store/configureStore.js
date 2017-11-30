import promiseMiddleware from 'redux-promise-middleware';
import {createStore, applyMiddleware} from 'redux' 
import aeroFilter from '../reducers/index'


const middleware = applyMiddleware( promiseMiddleware() )

export default function configureStore() {
	const store = createStore(
	aeroFilter,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	middleware
	)

	return store;
} 

