import React from 'react';
import axios from '../utils/axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const createOrder = (productIds, userId) => {
	const promiseCreateOrders = productIds.map(
		id =>
			new Promise((resolve, reject) => {
				axios
					.post('/order/', { user_id: userId, product_id: id })
					.then(({ data }) => resolve({ ...data.data }))
					.catch(error => reject(error));
			}),
	);
	Promise.all(promiseCreateOrders).then(data => console.log(data));
};

const CheckOutComponent = (productIds, userId) => {
	const CheckOut = withReactContent(Swal);

	CheckOut.fire({
		title: 'Confrimation Checkout',
		html: <div>TEST</div>,
		showCancelButton: true,
		confirmButtonText: 'สั่งซื้อ',
	}).then(result => {
		if (result.value) {
			createOrder(productIds, userId);
		}
	});
};

export default CheckOutComponent;
