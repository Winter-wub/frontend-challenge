import { useEffect, useState } from 'react';
import firebase from '../utils/firebase';
const firestore = firebase.firestore();
const collectionRef = firestore.collection('products');

const useProduct = id => {
	const [product, setProduct] = useState(null);
	const [isLoad, setLoad] = useState(true);
	const fetchProduct = async id => {
		setLoad(true);
		try {
			const product = await collectionRef.doc(id).get();
			return {
				id: product.id,
				...product.data(),
			};
		} catch (error) {
			console.log(error);
			return {};
		}
	};

	useEffect(() => {
		fetchProduct(id).then(product => {
			setProduct(product);
			setLoad(false);
		});
	}, []);
	return {
		isLoad,
		product,
	};
};

export default useProduct;
