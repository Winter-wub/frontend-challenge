import React, { useEffect } from 'react';
import carousel from '../components/carousel';
import useNewProducts from '../hooks/useNewProducts';

const Home = ({ history }) => {
	const { isNewProductsLoad, products } = useNewProducts('carousal');
	useEffect(() => {
		history.push('/products');
	}, [history]);
	return (
		<div className="container-fluid">
			<h1>Home</h1>
			<div className="newItems">
				{isNewProductsLoad ? (
					<div className="spinner-border text-primary" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				) : (
					carousel(products)
				)}
			</div>
			<div className="customerMenu" />
		</div>
	);
};

export default Home;
