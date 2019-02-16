import { combineReducers } from 'redux';
const initState = {
	cart: [],
};

const cartReducer = (state = initState, action) => {
	switch (action.type) {
		case 'ADD_ITEM_CART':
			return {
				...state,
				cart: [...state.cart, action.params.cart],
			};
		case 'REMOVE_ITEM_CART':
			const currentCart = state.cart.filter(
				item => item.id !== action.params.id,
			);
			return {
				...state,
				cart: currentCart,
			};

		default:
			return state;
	}
};

export default combineReducers({
	cart: cartReducer,
});
