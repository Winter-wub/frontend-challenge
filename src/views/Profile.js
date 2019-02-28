import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import axios from '../utils/axios';
import jwt from 'jsonwebtoken';
const cookies = new Cookies();

const mapStates = ({ user }) => ({
	user,
});

const storeUserAction = userLoginInfo => dispatch => {
	axios.post('/login', userLoginInfo).then(({ data }) => {
		const { data: userInfo } = data;
		return dispatch({
			type: 'STORE_USER',
			data: userInfo,
		});
	});
};

const mapDispatchs = dispatch => ({
	saveUserData: userInfo => dispatch(storeUserAction(userInfo)),
	toggleLoginState: () => dispatch({ type: 'TOGGLE_LOGIN_STATE' }),
});

const MenuList = ({ index, userInfo, updateUserInfoAction }) => {
	const [isEdit, setEdit] = useState(false);
	const [address, setAddress] = useState(userInfo.address);
	const [name, setName] = useState(userInfo.name);
	switch (index) {
		case 0:
			return (
				<div className="col">
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text" id="basic-addon1">
								Username
							</span>
						</div>
						<input
							type="text"
							className="form-control"
							placeholder="Username"
							aria-label="Username"
							aria-describedby="basic-addon1"
							value={userInfo.username}
							disabled
						/>
					</div>
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text" id="basic-addon1">
								Name
							</span>
						</div>
						<input
							type="text"
							className="form-control"
							placeholder="name"
							aria-label="name"
							aria-describedby="basic-addon1"
							value={name}
							onChange={e => setName(e.target.value)}
							disabled={!isEdit}
						/>
					</div>
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text" id="basic-addon1">
								Address
							</span>
						</div>
						<textarea
							className="form-control"
							rows="2"
							value={address}
							disabled={!isEdit}
							style={{ resize: 'none' }}
							onChange={e => setAddress(e.target.value)}
						/>
					</div>
					{isEdit ? (
						<button
							className="btn btn-primary"
							onClick={() => setEdit(!isEdit)}
						>
							Update
						</button>
					) : (
						<button
							className="btn btn-outline-primary"
							onClick={() => setEdit(!isEdit)}
						>
							Edit
						</button>
					)}
				</div>
			);
		case 1: {
			return <div className="col" />;
		}
		default: {
			return (
				<div className="col">
					<h1>Error</h1>
				</div>
			);
		}
	}
};

const Profile = ({ user, saveUserData, history }) => {
	const { isLogin, userInfo } = user;
	const [loginInfo, setLoginInfo] = useState(null);
	const [isLoadUserInfo, setLoadUseInfo] = useState(false);
	const [menuNum, setMenu] = useState(0);

	const onClickLogin = () => {
		const { username, password } = loginInfo;
		setLoadUseInfo(!isLoadUserInfo);
		saveUserData({ username, password });
		cookies.set('username', username);
		const passwordWithToken = jwt.sign({ password }, '8');
		cookies.set('password', passwordWithToken);
		setLoadUseInfo(!isLoadUserInfo);
	};

	return (
		<div>
			<h1>Profile</h1>
			<div
				className="container bg-white"
				style={{
					borderRadius: '20px',
					paddingTop: '50px',
					paddingBottom: '50px',
				}}
			>
				{isLogin ? (
					<div className="row">
						<div className="col">
							<div className="list-group">
								<button
									className="list-group-item list-group-item-action"
									onClick={() => setMenu(0)}
								>
									General
								</button>
							</div>
						</div>
						<MenuList userInfo={userInfo} index={menuNum} />
					</div>
				) : isLoadUserInfo ? (
					<div className="spinner-border text-primary" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				) : (
					<form onSubmit={() => onClickLogin()}>
						<div className="row">
							<div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
								<div className="input-group mb-3">
									<div className="input-group-prepend">
										<span className="input-group-text" id="basic-addon1">
											Username
										</span>
									</div>
									<input
										type="text"
										className="form-control"
										placeholder="Username"
										aria-label="Username"
										aria-describedby="basic-addon1"
										autoFocus
										onChange={e => {
											setLoginInfo({ ...loginInfo, username: e.target.value });
										}}
									/>
								</div>
								<div className="input-group mb-3">
									<div className="input-group-prepend">
										<span className="input-group-text" id="basic-addon1">
											Password
										</span>
									</div>
									<input
										type="password"
										className="form-control"
										placeholder="password"
										aria-label="password"
										aria-describedby="basic-addon1"
										onChange={e => {
											setLoginInfo({ ...loginInfo, password: e.target.value });
										}}
									/>
								</div>
								<ul style={{ listStyleType: 'none' }}>
									<li>
										<button
											type="submit"
											className="btn btn-primary"
											style={{
												margin: '2%',
												width: '150px',
												height: '50px',
												borderRadius: '30px',
											}}
										>
											<i className="fa fa-sign-in" aria-hidden="true" /> Login
										</button>
									</li>
									<li>
										<button
											className="btn btn-success"
											style={{
												margin: '2%',
												width: '150px',
												height: '50px',
												borderRadius: '30px',
											}}
											onClick={() => history.push('/register')}
										>
											<i className="fa fa-users" aria-hidden="true" /> Register
										</button>
									</li>
								</ul>
							</div>
						</div>
					</form>
				)}
			</div>
		</div>
	);
};

export default connect(
	mapStates,
	mapDispatchs,
)(Profile);
