import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken';
const cookies = new Cookies();

const useFetchuserFromCookie = saveUserDataDispatch => {
	const [isLoadUserInfo, setLoadUserInfo] = useState(false);

	const fetchUserInfoFromCookies = () => {
		setLoadUserInfo(true);
		if (cookies.get('username') && cookies.get('password')) {
			const username = cookies.get('username');
			const rawPassword = cookies.get('password');
			const { password } = jwt.verify(rawPassword, '8');
			setLoadUserInfo(false);

			return { username, password };
		} else {
			setLoadUserInfo(false);

			return null;
		}
	};

	useEffect(() => {
		const userInfo = fetchUserInfoFromCookies();
		if (userInfo) {
			saveUserDataDispatch(userInfo);
		}
	}, [saveUserDataDispatch]);

	return {
		isLoadUserInfo,
	};
};

export default useFetchuserFromCookie;
