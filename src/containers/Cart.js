import React, { useState } from 'react';
import { connect } from 'react-redux';
import Popover from 'react-tiny-popover';
import Checkout from '../containers/Checkout';

const mapStates = ({ cart, user }) => ({
	cart,
	user,
});

const mapDispatch = dispatch => ({
	removeCart: index =>
		dispatch({ type: 'REMOVE_ITEM_CART', params: { index } }),
});

const Cart = ({ cart, removeCart, user }) => {
	const { items } = cart;
	const [isPopoverOpen, setPopover] = useState(false);
	const { isLogin } = user;
	return (
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
								<tr>
									<td>
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
									</td>
								</tr>
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
	);
};

export default connect(
	mapStates,
	mapDispatch,
)(Cart);
