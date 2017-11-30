import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore';
import App from './App';
import * as API from './actions/'








const store =  window.store = configureStore()
store.dispatch(API.loadDummyData())


store.dispatch(API.fetchProducts())
store.dispatch(API.fetchUser())


ReactDOM.render(
	(
		<Provider store={store}>
		<App />
		</Provider>
		
		),

		document.getElementById('prerendered-html'));


registerServiceWorker();
