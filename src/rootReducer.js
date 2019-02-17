import { combineReducers } from 'redux';
import cartReducer from './reducers/cart';
import userReducer from './reducers/user';

export default combineReducers({
	cart: cartReducer,
	user: userReducer,
});
