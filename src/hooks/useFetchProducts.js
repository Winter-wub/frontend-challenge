import firebase from '../utils/firebase';
import usePagination from 'use-firestore-pagination';
const firestore = firebase.firestore();
const collectionRef = firestore.collection('products');

const useFetchProducts = (type = 'shirt', limit = 10) => {
	let query = {};
	if (type === 'all') {
		query = collectionRef.orderBy('created_at');
	} else {
		query = collectionRef.where('type', '==', type).orderBy('created_at');
	}
	const {
		loading: isLoad,
		loadingMore: isLoadMore,
		hasMore,
		items,
		loadMore,
	} = usePagination(query, { limit });

	const products = items.map(doc => ({
		id: doc.id,
		...doc.data(),
	}));

	return {
		products,
		isLoad,
		loadMore,
		isLoadMore,
		hasMore,
	};
};

export default useFetchProducts;
