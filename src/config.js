const env = process.env.NODE_ENV;
const api = {
	URL: env === 'development' ? 'http://localhost:5000' : 'http://13.56.249.230:2020',
};

window.Omise.setPublicKey('pkey_test_5f1ww1annj0f10en08t');

export { api };
