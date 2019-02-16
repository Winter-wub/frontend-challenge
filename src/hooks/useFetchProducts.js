import { useEffect, useState } from 'react';
import axios from '../utils/axios';

const useFetchProducts = (format = 'default', type = 'shirt', limit = 5) => {
	const [products, setProducts] = useState([]);
	const [isLoad, setLoad] = useState(false);
	const [page, setPage] = useState(1);

	const fetchProduct = async (type = 'shirt', page = 1, limit = 2) => {
		try {
			const { data } = await axios.get(
				`/products?type=${type}&page=${page}&limit=${limit}`,
			);
			return data.data;
		} catch (error) {
			console.log(error);
		}
	};

	const productFormatter = item => ({
		id: item.id,
		imgUrl: item.image_url,
		label: item.name,
		description: item.description,
		price: item.price,
		url: `/products/${item.id}`,
	});

	const formatterCarousel = product => ({
		label: product.name,
		description: product.description,
		img: product.image_url,
	});

	useEffect(() => {
		setLoad(true);
		fetchProduct(type, page, limit).then(products => {
			if (format === 'default') {
				setProducts(products);
			} else if (format === 'carousal') {
				const carousalItems = products.map(item => formatterCarousel(item));
				setProducts(carousalItems);
			} else if (format === 'items') {
				const items = products.map(item => productFormatter(item));
				setProducts(items);
			}
			setLoad(false);
		});
	}, [page]);

	return {
		products,
		isLoad,
		page,
		setPage,
	};
};

export default useFetchProducts;
