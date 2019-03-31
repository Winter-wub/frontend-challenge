import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import useDebounceCallback from 'use-debounce/lib/callback';
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
	const { isLoad, products, loadMore, isLoadMore, hasMore } = useFetchProducts(
		'all',
	);
	const [loadMoreDelay] = useDebounceCallback(() => {
		loadMore();
	}, 400);
	const handleScroll = event => {
		const windowHeight =
			'innerHeight' in window
				? window.innerHeight
				: document.documentElement.offsetHeight;
		const body = document.body;
		const html = document.documentElement;
		const docHeight = Math.max(
			body.scrollHeight,
			body.offsetHeight,
			html.clientHeight,
			html.scrollHeight,
			html.offsetHeight,
		);
		const windowBottom = windowHeight + window.pageXOffset;

		if (windowBottom >= docHeight) {
		} else {
			!hasMore && loadMoreDelay();
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);
	return (
		<div>
			<h1>Store</h1>
			<div className="container bg-white" style={{ borderRadius: '20px' }}>
				<div
					className="d-flex justify-content-center sticky-top"
					style={{
						paddingTop: '60px',
						zIndex: '999',
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
					</div>
				</div>
				<div className="showcase" style={{ paddingLeft: '30px' }}>
					<div className="row">
						{isLoad ? (
							<div className="col">
								<div className="spinner-border text-primary" role="status">
									<span className="sr-only">Loading...</span>
								</div>
							</div>
						) : (
							products
								.filter(rawProduct => rawProduct.in_stock > 0)
								.map(rawProduct => {
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

					{isLoadMore && hasMore && (
						<div className="col">
							<div className="spinner-border text-primary" role="status">
								<span className="sr-only">Loading...</span>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default connect(
	mapStates,
	mapDispatchs,
)(Catagories);
