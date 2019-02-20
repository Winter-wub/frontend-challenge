import React from 'react';
import { connect } from 'react-redux';
import useFetchProducts from '../hooks/useFetchProducts';
import { productFormatter } from '../utils/product_formatter';
import Card from '../components/card';
import { NavLink } from 'react-router-dom';

const mapStates = ({ cart }) => ({
	cart,
});
const mapDispatchs = dispatch => ({
	addItem: item =>
		dispatch({ type: 'ADD_ITEM_CART', params: { cart: { ...item } } }),
});

const Catagories = ({ addItem, cart }) => {
	const { isLoad, products, page, setPage } = useFetchProducts('items');

	return (
		<div>
			<h1>Store</h1>
			<div className="container bg-white" style={{ borderRadius: '20px' }}>
				<div
					className="d-flex justify-content-center sticky-top"
					style={{
						paddingTop: '60px',
					}}
				>
					<div className="input-group mb-3" style={{ marginRight: '2px' }}>
						<input
							type="text"
							className="form-control"
							placeholder="Search"
							aria-label="Search-Item"
							aria-describedby="button-addon2"
						/>
						<div className="input-group-append">
							<button
								className="btn btn-secondary"
								type="button"
								id="button-addon2"
							>
								<i className="fa fa-search" aria-hidden="true" />
							</button>
						</div>
						{cart.items.length >= 1 && (
							<button
								to="/checkout"
								className="btn btn-success"
								style={{ marginLeft: '2px' }}
							>
								<i className="fa fa-money" /> Checkout
							</button>
						)}
					</div>
				</div>
				<div className="showcase" style={{ paddingLeft: '30px' }}>
					{isLoad ? (
						<div className="spinner-border text-primary" role="status">
							<span className="sr-only">Loading...</span>
						</div>
					) : (
						<div className="row">
							{products.length <= 0 ? (
								<div className="col">
									<span role="img">หมดแล้วจ้า</span>
								</div>
							) : (
								products.map(rawProduct => {
									const product = productFormatter(rawProduct);

									return (
										<Card
											label={product.label}
											imgUrl={product.imgUrl}
											key={product.id}
											link={product.url}
										>
											<p className="card-text">{product.description}</p>
											<NavLink
												to={product.url}
												className="btn btn-outline-primary"
												style={{ margin: '15px' }}
											>
												{product.price} ฿
											</NavLink>
											<button
												className="btn btn-outline-warning"
												style={{ margin: '15px' }}
												onClick={() => {
													addItem({ ...rawProduct, value: 1 });
												}}
											>
												<i className="fa fa-plus" aria-hidden="true" /> Cart
											</button>
										</Card>
									);
								})
							)}
						</div>
					)}
				</div>

				<ul className="pageController">
					<li style={{ display: 'inline-block', margin: '1%' }}>
						<button
							className="btn btn-secondary"
							onClick={() => setPage(page - 1)}
							disabled={isLoad || page === 1}
						>
							<i className="fa fa-chevron-left" /> Previous
						</button>
					</li>
					<li style={{ display: 'inline-block', margin: '1%' }}>
						{<p>{page}</p>}
					</li>

					<li style={{ display: 'inline-block', margin: '1%' }}>
						<button
							className="btn btn-primary"
							onClick={() => setPage(page + 1)}
							disabled={isLoad || products.length <= 0}
						>
							Next <i className="fa fa-chevron-right" />
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default connect(
	mapStates,
	mapDispatchs,
)(Catagories);
