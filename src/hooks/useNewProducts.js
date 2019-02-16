import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import Axios from 'axios';
const useNewProducts = (format = 'default') => {
	const [products, setProducts] = useState([]);
	const [isNewProductsLoad, setisLoad] = useState(false);
	const fetchProducts = async () => {
		try {
			const shirtRequest = () =>
				axios.get('/products?type=shirt&page=1&limit=3');
			const pantRequst = () => axios.get('/products?type=pant&page=1&limit=3');
			const [res1, res2] = await Axios.all([shirtRequest(), pantRequst()]);
			const { data: rawData1 } = res1;
			const { data: rawData2 } = res2;
			const { data: item1 } = rawData1;
			const { data: item2 } = rawData2;
			let products = [];

			item1.forEach(item => {
				products.push(item);
			});

			item2.forEach(item => {
				products.push(item);
			});

			return products;
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
