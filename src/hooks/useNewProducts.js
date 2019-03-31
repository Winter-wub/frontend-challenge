import { useEffect, useState } from 'react';
import firebase from '../utils/firebase';
const db = firebase.firestore();
const collectionRef = db.collection('products');

const useNewProducts = (format = 'default') => {
	const [products, setProducts] = useState([]);
	const [isNewProductsLoad, setisLoad] = useState(false);
	const fetchProducts = async () => {
		try {
			const newProducts = [];
			const productsRef = await collectionRef
				.limit(3)
				.orderBy('created_at')
				.get();
			productsRef.forEach(ref => {
				newProducts.push({
					id: ref.id,
					...ref.data(),
				});
			});

			return newProducts;
		} catch (error) {
			console.error(error);
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
	}, [format]);

	return {
		products,
		isNewProductsLoad,
	};
};

export default useNewProducts;
