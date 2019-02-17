import React from 'react';
import useFetchProducts from '../hooks/useFetchProducts';
import Card from '../components/card';

const Catagories = () => {
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
					<div class="input-group mb-3">
						<input
							type="text"
							class="form-control"
							placeholder="Search"
							aria-label="Search-Item"
							aria-describedby="button-addon2"
						/>
						<div class="input-group-append">
							<button
								class="btn btn-outline-secondary"
								type="button"
								id="button-addon2"
							>
								<i className="fa fa-search" aria-hidden="true" />
							</button>
						</div>
						<div />
					</div>
				</div>
				<div className="showcase ">
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
								products.map(product => {
									return <Card item={product} key={product.id} />;
								})
							)}
						</div>
					)}
				</div>

				<ul className="pageController">
					<li style={{ display: 'inline-block', margin: '1%' }}>
						{page === 1 ? (
							''
						) : (
							<button
								className="btn btn-secondary"
								onClick={() => setPage(page - 1)}
								disabled={isLoad}
							>
								Previous
							</button>
						)}
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
							Next
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Catagories;
