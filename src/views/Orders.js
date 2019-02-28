import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import usePayment from '../hooks/usePayment';
import Model from 'react-responsive-modal';
import useFetchOrders from '../hooks/useFetchOrders';

const mapStates = ({ user }) => ({
	user,
});

const Orders = ({ user, history }) => {
	const { userInfo, isLogin } = user;
	const [isOpen, setOpen] = useState(false);
	const {
		setOrderId,
		setTotalPrice,
		setCardInfo,
		cardInfo,
		payment,
	} = usePayment(history);

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
							{orders.map((order, index) => {
								const total = order.product_ids.reduce(
									(prev, curr) => prev + curr.price * curr.value,
									0,
								);

								return (
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
												<ul style={{ listStyleType: 'none' }}>
													<li>
														<b>รอการชำระ</b>
													</li>
													<li>
														<button
															className="btn btn-success"
															onClick={() => {
																setOpen(!isOpen);
																setOrderId(order.id);
																setTotalPrice(total);
															}}
														>
															<i className="fa fa-buy" />
															ชำระเงิน {total} ฿
														</button>
													</li>
												</ul>
											) : (
												<div>
													{order.status === 'paid' && <b>ชำระแล้ว</b>}
													{order.status === 'delivery' && (
														<b>กำลังอยู่ระหว่างจัดส่ง</b>
													)}
													{order.status === 'deliveryed' && <b>จัดส่งแล้ว</b>}
												</div>
											)}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				)}
			</div>
			<Model
				style={{ marginTop: '50px' }}
				open={isOpen}
				onClose={() => setOpen(!isOpen)}
				center
			>
				<div style={{ margin: '2%' }}>
					<h3>ข้อมูลการชำระเงิน</h3>
					<div class="input-group mb-3">
						<div class="input-group-prepend">
							<span class="input-group-text" id="basic-addon1">
								Card Number
							</span>
						</div>
						<input
							type="text"
							class="form-control"
							placeholder="Enter card number"
							aria-label="Card number"
							aria-describedby="basic-addon1"
							value={cardInfo.cardNum}
							onChange={e => setCardInfo.setCardNum(e.target.value)}
						/>
					</div>
					<div class="input-group mb-3">
						<div class="input-group-prepend">
							<span class="input-group-text" id="basic-addon1">
								Card Holder
							</span>
						</div>
						<input
							type="text"
							class="form-control"
							placeholder="Enter card holder name"
							aria-label="Name"
							aria-describedby="basic-addon1"
							value={cardInfo.holder}
							onChange={e => setCardInfo.setHolder(e.target.value)}
						/>
					</div>
					<div class="input-group mb-3">
						<div class="input-group-prepend">
							<span class="input-group-text" id="basic-addon1">
								CCV
							</span>
						</div>
						<input
							type="text"
							class="form-control"
							placeholder="Enter CCV"
							aria-label="CCV"
							aria-describedby="basic-addon1"
							value={cardInfo.sec}
							onChange={e => setCardInfo.setSec(e.target.value)}
						/>
					</div>
					<div class="input-group mb-3">
						<div class="input-group-prepend">
							<span class="input-group-text" id="basic-addon1">
								Expiry month
							</span>
						</div>
						<input
							type="number"
							min="1"
							max="12"
							class="form-control"
							placeholder="Enter month"
							aria-label="Month"
							aria-describedby="basic-addon1"
							value={cardInfo.month}
							onChange={e => setCardInfo.setMonth(e.target.value)}
						/>
						<div class="input-group-prepend">
							<span class="input-group-text" id="basic-addon1">
								Expiry Year
							</span>
						</div>
						<input
							type="text"
							class="form-control"
							placeholder="Enter Year"
							aria-label="Year"
							aria-describedby="basic-addon1"
							value={cardInfo.year}
							onChange={e => setCardInfo.setYear(e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<button
							className="btn btn-success"
							onClick={() => {
								payment();
								setOpen(!isOpen);
							}}
						>
							ชำระเงิน
						</button>
						<button
							className="btn btn-secondary"
							onClick={() => setOpen(!isOpen)}
							style={{ float: 'right' }}
						>
							ยกเลิก
						</button>
					</div>
				</div>
			</Model>
		</div>
	);
};

export default connect(mapStates)(Orders);
