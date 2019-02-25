import { useEffect, useState } from 'react';
import axios from '../utils/axios';

const useFetchProducts = (type = 'shirt', limit = 5) => {
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
			return [];
		}
	};

	useEffect(() => {
		setLoad(true);
		fetchProduct(type, page, limit).then(products => {
			setProducts(products);
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
