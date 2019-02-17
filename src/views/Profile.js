import React from 'react';
import { connect } from 'react-redux';

const mapStates = ({ user }) => ({
	user,
});

const mapDispatchs = dispatch => ({
	saveUserData: userInfo =>
		dispatch({
			type: 'STORE_USERS',
			action: {
				params: {
					...userInfo,
				},
			},
		}),
	toggleLoginState: () => dispatch({ type: 'TOGGLE_LOGIN_STATE' }),
});

const Profile = () => {
	return <div />;
};

export default connect(
	mapStates,
	mapDispatchs,
)(Profile);
