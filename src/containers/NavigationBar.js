import { Link, NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import Popover from 'react-tiny-popover';
import { connect } from 'react-redux';

const mapStates = ({ cart, user }) => ({
	cart,
	user,
});

const mapDispatch = dispatch => ({
	removeCart: id => dispatch({ type: 'REMOVE_ITEM_CART', params: { id } }),
});

const NavagationBar = ({ user, cart, removeCart }) => {
	const [isPopoverOpen, setPopover] = useState(false);
	const { items } = cart;
	const { isLogin } = user;
	return (
		<React.Fragment>
			<nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<Link to="/">
						<div className="navbar-brand">Navbar</div>
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
						<li className="nav-item">
							<NavLink
								className="nav-link"
								activeClassName="active"
								to="/profile"
								exact
							>
								{isLogin ? 'My Profile' : 'Login'}
							</NavLink>
						</li>
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
											{items.map(item => (
												<tr
													key={item.name + item.value}
													style={{ margin: '2%' }}
												>
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
															onClick={() => removeCart(item.id)}
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
				</div>
			</nav>
		</React.Fragment>
	);
};

export default connect(
	mapStates,
	mapDispatch,
)(NavagationBar);
