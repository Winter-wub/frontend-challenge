const env = process.env.NODE_ENV;

const api = {
	URL:
		env === 'development'
			? 'http://localhost:5000'
			: 'https://api-shop.bebebee.be',
};

export { api };
