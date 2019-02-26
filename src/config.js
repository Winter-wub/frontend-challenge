const env = process.env.NODE_ENV;
window.Omise.setPublicKey('pkey_test_5f1ww1annj0f10en08t');
const api = {
	URL:
		env === 'development'
			? 'http://localhost:5000'
			: 'https://api-shop.bebebee.be',
};

export { api };
