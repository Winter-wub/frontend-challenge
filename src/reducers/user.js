const initState = {
	userInfo: {},
	isLogin: false,
};

const userReducer = (state = initState, action) => {
	switch (action.type) {
		case 'TOGGLE_LOGIN_STATE':
			return {
				...state,
				isLogin: !state.isLogin,
			};
		case 'STORE_USERS':
			return {
				...state,
				userInfo: {
					...action.params.userInfo,
				},
			};
		case 'DELETE_USERS':
			return {
				...state,
				userInfo: {},
			};
		default:
			return state;
	}
};

export default userReducer;
