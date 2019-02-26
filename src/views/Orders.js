import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Model from 'react-responsive-modal';
import axios from '../utils/axios';
import useFetchOrders from '../hooks/useFetchOrders';

const mapStates = ({ user }) => ({
	user,
});

const Orders = ({ user, history }) => {
	const { userInfo, isLogin } = user;
	const [orderId, setOrderId] = useState('');
	const [totalPrice, setTotalPrice] = useState(0);
	const [isOpen, setOpen] = useState(false);
	const [cardNum, setCardNum] = useState('');
	const [holder, setHolder] = useState('');
	const [month, setMonth] = useState(1);
	const [year, setYear] = useState(2020);
	const [sec, setSec] = useState('');

	if (!isLogin) {
		history.push('/profile');
	}
	const { orders, isLoad } = useFetchOrders(userInfo);

	const payment = () => {
		const swal = withReactContent(Swal);
		const card = {
			name: holder,
			number: cardNum,
			expiration_month: month,
			expiration_year: year,
			security_code: sec,
		};

		window.Omise.createToken('card', card, async (statusCode, response) => {
			try {
				if (statusCode === 200) {
					const { data: payment } = await axios.post('/payment', {
						data: {
							card_info: { ...response },
							order: { orderId, totalPrice },
						},
					});

					swal.fire('สำเร็จ', payment, 'success').then(() => {
						history.push('/products');
						history.push('/orders');
					});
				} else {
					swal.fire('ผิดพลาด', response.message, 'error').then(() => {
						history.push('/products');
						history.push('/orders');
					});
				}
			} catch (error) {
				swal.fire(
					'ผิดพลาด',
					'ไม่สามาถทำรายการได้ขณะนี้โปรดลองอีกครั้ง',
					'error',
				);
			}
		});
	};

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
							value={cardNum}
							onChange={e => setCardNum(e.target.value)}
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
							value={holder}
							onChange={e => setHolder(e.target.value)}
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
							value={sec}
							onChange={e => setSec(e.target.value)}
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
							value={month}
							onChange={e => setMonth(e.target.value)}
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
							value={year}
							onChange={e => setYear(e.target.value)}
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
