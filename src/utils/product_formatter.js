const productFormatter = item => ({
	id: item.id,
	imgUrl: item.image_url,
	label: item.name,
	description: item.description,
	price: item.price,
	url: `/products/${item.id}`,
});

const formatterCarousel = product => ({
	label: product.name,
	description: product.description,
	img: product.image_url,
});

export { formatterCarousel, productFormatter };
