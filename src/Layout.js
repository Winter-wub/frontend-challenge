import React from 'react';

const withLayout = (NavagationBar, Content, Footer) => {
	return () => {
		return (
			<React.Fragment>
				<NavagationBar />
				<div className="App">
					<Content />
					<Footer />
				</div>
			</React.Fragment>
		);
	};
};

export default withLayout;
