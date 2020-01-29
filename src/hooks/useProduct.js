import { useEffect, useState } from 'react';
import axios from '../utils/axios';
const useProduct = id => {
	const [product, setProduct] = useState(null);
	const [isLoad, setLoad] = useState(true);
	const fetchProduct = async id => {
		setLoad(true);
		try {
			const { data } = await axios.get(`/product?id=${id}`);

			return {
				...data.data,
			};
		} catch (error) {
			console.log(error);
			return [];
		}
	};

	useEffect(() => {
		fetchProduct(id).then(product => {
			setProduct(product);
			setLoad(false);
		});
	}, [id]);
	return {
		isLoad,
		product,
	};
};

export default useProduct;
