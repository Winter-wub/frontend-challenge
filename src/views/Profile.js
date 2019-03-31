import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import firebase from '../utils/firebase';
import firebaseLib from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const mapStates = ({ user }) => ({
	user,
});

const mapDispatchs = dispatch => ({
	saveUserData: userInfo =>
		dispatch({
			type: 'STORE_USER',
			data: userInfo,
		}),
	toggleLoginState: () => dispatch({ type: 'TOGGLE_LOGIN_STATE' }),
});

const MenuList = ({ index, userInfo, updateUserInfoAction }) => {
	const [isEdit, setEdit] = useState(false);
	const [name, setName] = useState(userInfo.displayName);
	switch (index) {
		case 0:
			return (
				<div className="col">
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text" id="basic-addon1">
								Name
							</span>
						</div>
						<input
							type="text"
							className="form-control"
							placeholder="name"
							aria-label="name"
							aria-describedby="basic-addon1"
							value={name}
							onChange={e => setName(e.target.value)}
							disabled={!isEdit}
						/>
					</div>
					{/* <div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text" id="basic-addon1">
								Address
							</span>
						</div>
						<textarea
							className="form-control"
							rows="2"
							value={address}
							disabled={!isEdit}
							style={{ resize: 'none' }}
							onChange={e => setAddress(e.target.value)}
						/>
					</div> */}
					{isEdit ? (
						<button
							className="btn btn-primary"
							onClick={() => setEdit(!isEdit)}
						>
							Update
						</button>
					) : (
						<button
							className="btn btn-outline-primary"
							onClick={() => setEdit(!isEdit)}
						>
							Edit
						</button>
					)}
				</div>
			);
		case 1: {
			return <div className="col" />;
		}
		default: {
			return (
				<div className="col">
					<h1>Error</h1>
				</div>
			);
		}
	}
};

const Profile = ({ user, saveUserData, history }) => {
	const authConfig = {
		// Popup signin flow rather than redirect flow.
		signInFlow: 'popup',
		// Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
		signInSuccessUrl: '/profile',
		// We will display Google and Facebook as auth providers.
		signInOptions: [
			firebaseLib.auth.EmailAuthProvider.PROVIDER_ID,
			firebaseLib.auth.PhoneAuthProvider.PROVIDER_ID,
		],
		callbacks: {
			// Avoid redirects after sign-in.
			signInSuccessWithAuthResult: () => false,
		},
	};

	useEffect(() => {
		const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
			if (user) {
				saveUserData(user);
			}
		});
		return () => {
			unregisterAuthObserver();
		};
	}, []);

	return (
		<div>
			<h1>Profile</h1>
			<div
				className="container bg-white"
				style={{
					borderRadius: '20px',
					paddingTop: '50px',
					paddingBottom: '50px',
				}}
			>
				{user.isLogin ? (
					<MenuList index={0} userInfo={user.userInfo} />
				) : (
					<StyledFirebaseAuth
						uiConfig={authConfig}
						firebaseAuth={firebase.auth()}
					/>
				)}
			</div>
		</div>
	);
};

export default connect(
	mapStates,
	mapDispatchs,
)(Profile);
