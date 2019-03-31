const initState = {
	userInfo: {
		uid: '',
	},
	isLogin: false,
};

const userReducer = (state = initState, action) => {
	switch (action.type) {
		case 'TOGGLE_LOGIN_STATE':
			return {
				...state,
				isLogin: !state.isLogin,
			};
		case 'STORE_USER':
			return {
				...state,
				userInfo: action.data,
				isLogin: true,
			};
		case 'DELETE_USER':
			return {
				...state,
				userInfo: { uid: '' },
				isLogin: false,
			};
		default:
			return state;
	}
};

export default userReducer;
