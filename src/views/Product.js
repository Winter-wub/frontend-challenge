import React, { useState } from 'react';
import { connect } from 'react-redux';
import useProduct from '../hooks/useProduct';

const mapStates = ({ cart }) => ({
	cart: cart,
});

const mapDispatchs = dispatch => ({
	addItem: item =>
		dispatch({ type: 'ADD_ITEM_CART', params: { cart: { ...item } } }),
});

const Product = ({ match, cart, addItem, history }) => {
	const [value, setValue] = useState(1);
	const { isLoad, product } = useProduct(match.params.id);

	return (
		<div>
			<h1>Products</h1>
			{isLoad ? (
				<div className="spinner-border text-primary" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			) : (
				<div>
					<button
						className="btn btn-secondary"
						onClick={() => {
							history.goBack();
						}}
					>
						<i className="fa fa-chevron-left" /> Back
					</button>
					<div
						className="d-flex justify-content-center"
						style={{ margin: '1%' }}
					>
						<div className="card" style={{ width: '25rem' }}>
							<img
								className="card-img-top"
								src={product.image_url}
								alt={match.params.id}
							/>
							<div className="card-body">
								<h5 className="card-title">{product.name}</h5>

								<div className="input-group mb-3">
									<div className="input-group-prepend">
										<label className="input-group-text">
											฿{product.price * value}
										</label>
									</div>
									<input
										type="number"
										max={product.in_stock}
										min={1}
										className="form-control"
										aria-label="value"
										aria-describedby="button-addon2"
										value={value}
										onChange={e => setValue(e.target.value)}
										onBlur={() => {
											value < 1 && setValue(1);
											value > product.in_stock && setValue(product.in_stock);
										}}
									/>
									<div className="input-group-append">
										<button
											className="btn btn-outline-warning"
											onClick={() => {
												addItem({ ...product, value });
											}}
										>
											<i className="fa fa-plus" aria-hidden="true" /> Cart
										</button>
										<button
											className="btn btn-outline-success"
											onClick={() => {
												addItem({ ...product, value });
												history.push('/checkout');
											}}
										>
											Checkout
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div
						className="d-flex justify-content-center"
						style={{ margin: '1%' }}
					>
						<div className="card" style={{ width: '25rem' }}>
							<div className="card-body">
								<p className="card-text">{product.description}</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default connect(
	mapStates,
	mapDispatchs,
)(Product);
