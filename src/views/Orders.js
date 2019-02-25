import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import useFetchOrders from '../hooks/useFetchOrders';

const mapStates = ({ user }) => ({
	user,
});

const Orders = ({ user, history }) => {
	const { userInfo, isLogin } = user;
	if (!isLogin) {
		history.push('/profile');
	}
	const { orders, isLoad } = useFetchOrders(userInfo);
	return (
		<div>
			<h1>Orders</h1>
			<div
				className="container bg-white"
				style={{
					borderRadius: '20px',
					paddingTop: '50px',
					paddingBottom: '50px',
				}}
			>
				{isLoad ? (
					<div className="spinner-border text-primary" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				) : (
					<table className="table">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">สินค้า</th>
								<th scope="col">สถานะ</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order, index) => (
								<tr key={index}>
									<th scope="row">{index}</th>
									<td>
										<div className="list-group">
											{order.product_ids.map((product, index) => (
												<NavLink
													to={`/products/${product.id}`}
													key={index}
													className="list-group-item list-group-item-action"
												>
													<img
														src={product.image_url}
														alt={index}
														style={{ height: '2em', width: '2em' }}
													/>
													{product.name} : {product.value}
												</NavLink>
											))}
										</div>
									</td>
									<td>
										{order.status === 'waiting' ? (
											<div>
												รอการชำระ{' '}
												<button className="btn btn-success">ชำระเงิน</button>
											</div>
										) : (
											order.status
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
};

export default connect(mapStates)(Orders);
