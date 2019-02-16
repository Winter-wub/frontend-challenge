import React from 'react';

const Product = ({ history, match }) => {
	console.log(match.params);
	if (!match.params) {
		console.log('push');
		history.push('/store');
	}

	return (
		<div>
			<h1>Products</h1>
		</div>
	);
};

export default Product;
