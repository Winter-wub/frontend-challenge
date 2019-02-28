const env = process.env.NODE_ENV;
const api = {
	URL:
		env === 'development'
			? 'http://localhost:5000'
			: 'https://api-shop.bebebee.be',
};

window.Omise.setPublicKey('pkey_test_5f1ww1annj0f10en08t');

export { api };
