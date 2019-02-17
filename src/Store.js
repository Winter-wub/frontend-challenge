import React from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	rootReducer,
	/* preloadedState, */ composeEnhancers(applyMiddleware(reduxThunk)),
);

const Store = App => () => (
	<Provider store={store}>
		<App />
	</Provider>
);

export default Store;
