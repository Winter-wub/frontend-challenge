import { useEffect, useState } from 'react';
import axios from '../utils/axios';
const useNewProducts = (format = 'default') => {
	const [products, setProducts] = useState([]);
	const [isNewProductsLoad, setisLoad] = useState(false);
	const fetchProducts = async () => {
		try {
			const { data: response } = await axios.get(
				'/products?type=all&page=1&limit=3',
			);

			return response.data;
		} catch (error) {
			console.log(error);
			return [];
		}
	};
	const formatterCarousel = product => {
		return {
			label: product.name,
			description: product.description,
			img: product.image_url,
		};
	};

	useEffect(() => {
		setisLoad(true);
		fetchProducts().then(products => {
			if (format === 'carousal') {
				const carousalItem = products.map(item => formatterCarousel(item));
				setProducts(carousalItem);
			} else {
				setProducts(products);
			}
			setisLoad(false);
		});
	}, []);

	return {
		products,
		isNewProductsLoad,
	};
};

export default useNewProducts;
