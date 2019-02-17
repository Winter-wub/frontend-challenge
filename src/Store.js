import React from 'react';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	rootReducer,
	/* preloadedState, */ composeEnhancers(),
);

const Store = App => () => (
	<Provider store={store}>
		<App />
	</Provider>
);

export default Store;
