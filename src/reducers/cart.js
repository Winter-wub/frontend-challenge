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
			const currentCart = state.items.filter(
				item => item.id !== action.params.id,
			);
			return {
				...state,
				items: currentCart,
			};

		default:
			return state;
	}
};

export default cartReducer;
