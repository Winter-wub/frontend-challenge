import _ from 'lodash';
const initState = {
	items: [],
};

const cartReducer = (state = initState, action) => {
	switch (action.type) {
		case 'ADD_ITEM_CART':
			return {
				...state,
				items: [...state.items, action.params.cart],
			};
		case 'REMOVE_ITEM_CART':
			const currentCart = _.cloneDeep(state.items);
			currentCart.splice(action.params.index, 1);

			return {
				...state,
				items: currentCart,
			};

		default:
			return state;
	}
};

export default cartReducer;
