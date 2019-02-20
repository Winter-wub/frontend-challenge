import { Link, NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Checkout from '../containers/Checkout';
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken';
import axios from '../utils/axios';
import Popover from 'react-tiny-popover';
import { connect } from 'react-redux';
const cookies = new Cookies();

const storeUserAction = userLoginInfo => dispatch => {
	axios.post('/login/', userLoginInfo).then(({ data }) => {
		const { data: userInfo } = data;
		return dispatch({
			type: 'STORE_USER',
			data: userInfo,
		});
	});
};

const mapStates = ({ cart, user }) => ({
	cart,
	user,
});

const mapDispatch = dispatch => ({
	removeCart: index =>
		dispatch({ type: 'REMOVE_ITEM_CART', params: { index } }),
	saveUserData: userInfo => dispatch(storeUserAction(userInfo)),
	removeUserData: () => dispatch({ type: 'DELETE_USER' }),
});

const NavagationBar = ({
	user,
	cart,
	removeCart,
	saveUserData,
	removeUserData,
}) => {
	const [isPopoverOpen, setPopover] = useState(false);
	const [isLoadUserInfo, setLoadUserInfo] = useState(false);
	const { items } = cart;
	const { isLogin } = user;
	const fetchUserInfoFromCookies = () => {
		setLoadUserInfo(true);
		if (cookies.get('username') && cookies.get('password')) {
			const username = cookies.get('username');
			const rawPassword = cookies.get('password');
			const { password } = jwt.verify(rawPassword, '8');
			setLoadUserInfo(false);

			return { username, password };
		} else {
			setLoadUserInfo(false);

			return null;
		}
	};

	console.log(user.userInfo.uid);
	useEffect(() => {
		const userInfo = fetchUserInfoFromCookies();
		if (userInfo) {
			saveUserData(userInfo);
		}
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
						{isLoadUserInfo ? (
							<div className="spinner-border text-primary" role="status">
								<span className="sr-only">Loading...</span>
							</div>
						) : isLogin ? (
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
										onClick={() => removeUserData()}
									>
										Logout
									</button>
								</div>
							</li>
						) : (
							<li className="nav-tem">
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
					<Popover
						width={40}
						isOpen={isPopoverOpen}
						position="buttom"
						padding={10}
						disableReposition
						onClickOutside={() => setPopover(!isPopoverOpen)}
						content={
							<div
								style={{
									width: '300px',
									position: 'fixed',
									marginTop: '50px',
									zIndex: '9999',
								}}
							>
								{items.length <= 0 ? (
									<div
										className="jumbotron bg-dark"
										style={{ borderBottomRightRadius: '25px' }}
									>
										<p className="lead" style={{ color: 'white' }}>
											ยังไม่ได้เพิ่มอะไรเข้ามาเลย
											<span role="img" aria-label="empty">
												🤷‍♂️
											</span>
										</p>
									</div>
								) : (
									<table
										className="table table-dark"
										style={{ borderBottomRightRadius: '25px' }}
									>
										<thead>
											<tr>
												<th scope="col" />
												<th scope="col">สินค้า</th>
												<th scope="col">จำนวน</th>
												<th scope="col" />
											</tr>
										</thead>
										<tbody>
											{items.map((item, index) => (
												<tr key={index} style={{ margin: '2%' }}>
													<td>
														<img
															src={item.image_url}
															alt={item.name}
															style={{
																width: '65px',
																borderRadius: '20%',
																margin: '2%',
															}}
														/>
													</td>
													<td>
														<b>{item.name}</b>
													</td>
													<td>{item.value}</td>
													<td>
														<button
															className="btn btn-danger"
															style={{ margin: '2%' }}
															onClick={() => removeCart(index)}
														>
															<i className="fa fa-trash" aria-hidden="true" />
														</button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								)}
							</div>
						}
					>
						<button
							style={{ marginRight: '20px' }}
							className="btn btn-outline-primary"
							onClick={() => setPopover(!isPopoverOpen)}
						>
							<i className="fa fa-shopping-cart" aria-hidden="true" /> Cart (
							{items.length})
						</button>
					</Popover>
					{items.length >= 1 && (
						<button
							to="/checkout"
							className="btn btn-success"
							onClick={() =>
								Checkout(items.map(({ id }) => id), user.userInfo.uid)
							}
						>
							<i className="fa fa-money" /> Checkout
						</button>
					)}
				</div>
			</nav>
		</React.Fragment>
	);
};

export default connect(
	mapStates,
	mapDispatch,
)(NavagationBar);
