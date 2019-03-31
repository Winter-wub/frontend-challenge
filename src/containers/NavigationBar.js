import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Checkout from '../containers/Checkout';
import Cart from '../containers/Cart';
import { connect } from 'react-redux';
import firebaseLib from 'firebase';

const mapStates = ({ cart, user }) => ({
	cart,
	user,
});
const signOutAction = () => dispatch => {
	firebaseLib
		.auth()
		.signOut()
		.then(() => {
			return dispatch({
				type: 'DELETE_USER',
			});
		});
};

const signInWithCurrentData = () => dispatch => {
	const userInfo = firebaseLib.auth().currentUser;
	if (userInfo) {
		return dispatch({
			...userInfo,
		});
	} else {
		return dispatch();
	}
};
const mapDispatch = dispatch => ({
	removeCart: index =>
		dispatch({ type: 'REMOVE_ITEM_CART', params: { index } }),
	removeUserData: () => dispatch(signOutAction()),
	saveUserData: () => dispatch(signInWithCurrentData()),
});

const NavagationBar = ({ user, cart, saveUserData, removeUserData }) => {
	const { items } = cart;
	const { isLogin } = user;

	useEffect(() => {
		const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
			if (user && !user.isLogin) {
				saveUserData(user);
			}
		});
		return () => {
			unregisterAuthObserver();
		};
	}, []);
	return (
		<React.Fragment>
			<nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<Link to="/">
						<div className="navbar-brand">Frontend Challenge</div>
					</Link>
					<ul className="navbar-nav">
						<li className="nav-item">
							<NavLink
								className="nav-link"
								activeClassName="active"
								exact
								to="/"
							>
								Home
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className="nav-link"
								activeClassName="active"
								exact
								to="/products"
							>
								Store
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className="nav-link"
								activeClassName="active"
								exact
								to="/about"
							>
								About
							</NavLink>
						</li>
						{isLogin ? (
							<li className="nav-item dropdown">
								<button
									className="btn btn-outline-primary nav-link dropdown-toggle"
									id="navbarDropdown"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									Account
								</button>
								<div className="dropdown-menu" aria-labelledby="navbarDropdown">
									<NavLink className="dropdown-item" to="/profile">
										Settings
									</NavLink>
									<button
										className="dropdown-item"
										onClick={() => {
											removeUserData();
											window.location.reload();
										}}
									>
										Logout
									</button>
								</div>
							</li>
						) : (
							<li className="nav-item">
								<NavLink
									className="btn btn-outline-primary nav-link "
									activeClassName="active"
									to="/profile"
									exact
								>
									Login
								</NavLink>
							</li>
						)}
						{isLogin && (
							<li className="nav-item">
								<NavLink
									className="nav-link"
									activeClassName="active"
									to="/orders"
									exact
								>
									Orders
								</NavLink>
							</li>
						)}
					</ul>
				</div>
				<div className="nav-item">
					<button
						className="navbar-toggler "
						type="button"
						data-toggle="collapse"
						data-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
				</div>
				<div className="nav-item">
					<Cart />
				</div>
				{items.length >= 1 && isLogin && (
					<div className="nav-item">
						<Checkout
							productsCart={items}
							userId={user.userInfo.uid}
							className="btn btn-success"
						>
							<i className="fa fa-money" /> Checkout
						</Checkout>
					</div>
				)}
			</nav>
		</React.Fragment>
	);
};

export default connect(
	mapStates,
	mapDispatch,
)(NavagationBar);
