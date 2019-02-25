import axios from '../utils/axios';
import { useState, useEffect } from 'react';

const useFetchOrders = userInfo => {
	const [orders, setOrders] = useState([]);
	const [isLoad, setLoad] = useState(false);
	const fetchOrders = uid => {
		return new Promise((resolve, reject) => {
			setLoad(true);
			axios
				.get(`/orders?id=${uid}`)
				.then(({ data }) => {
					resolve(data.data);
				})
				.catch(error => {
					reject(error);
				})
				.finally(() => setLoad(false));
		});
	};
	useEffect(() => {
		fetchOrders(userInfo.uid).then(orders => setOrders(orders));
	}, []);

	return { orders, isLoad };
};

export default useFetchOrders;
