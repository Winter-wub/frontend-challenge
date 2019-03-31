import Cookies from 'universal-cookie';
const cookie = new Cookies();

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
			cookie.remove('username');
			cookie.remove('password');
			return {
				...state,
				userInfo: {},
				isLogin: false,
			};
		default:
			return state;
	}
};

export default userReducer;
