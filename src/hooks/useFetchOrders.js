import firebase from '../utils/firebase';
import usePagination from 'use-firestore-pagination';

const firestore = firebase.firestore();
const collectionRef = firestore.collection('orders');

const useFetchOrders = userInfo => {
	const { loading: isLoad, items, loadMore, hasMore } = usePagination(
		collectionRef.where('user_id', '==', userInfo.uid).orderBy('created_at'),
		{ limit: 5 },
	);

	const orders = items.map(item => ({
		id: item.id,
		...item.data(),
	}));

	return { orders, isLoad, loadMore, hasMore };
};

export default useFetchOrders;
