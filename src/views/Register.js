import React, { useState } from 'react';
import Swal from 'sweetalert2';
import reactContentSwal from 'sweetalert2-react-content';
import axios from '../utils/axios';

const Register = ({ history }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [address, setAddress] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [fullName, setFullname] = useState('');
	const [misMatchPassword, setMisMatchPass] = useState(false);

	const onSubmitForm = () => {
		const swal = reactContentSwal(Swal);
		axios
			.post('/customer', {
				username,
				password,
				name: fullName,
				email,
				phone,
				address,
			})
			.then(({ data }) => {
				console.log(data);
				swal
					.fire('Register Result', `Register complete`, 'success')
					.then(() => history.push('/profile'));
			})
			.catch(error => {
				swal.fire('Error', `${error.response.data.message}`, 'warning');
			});
	};

	return (
		<div
			className="container bg-white"
			style={{
				borderRadius: '20px',
				paddingTop: '50px',
				paddingBottom: '50px',
			}}
		>
			<h1>Register</h1>
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
							minLength="6"
							value={username}
							onChange={e => setUsername(e.target.value)}
							required
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
							minLength="6"
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
						/>
					</div>
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text" id="basic-addon1">
								Confrim Password
							</span>
						</div>
						<input
							type="password"
							className="form-control"
							placeholder=""
							aria-label="password"
							aria-describedby="basic-addon1"
							minLength="6"
							required
							onChange={e => {
								if (password !== e.target.value) {
									setMisMatchPass(true);
								} else {
									setMisMatchPass(false);
								}
							}}
						/>
						{misMatchPassword && (
							<div className="input-group-append">
								<span
									className="input-group-text text-danger"
									id="basic-addon1"
								>
									<i className="fa fa-times-circle" />
								</span>
							</div>
						)}
					</div>

					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text" id="basic-addon1">
								Full Name
							</span>
						</div>
						<input
							type="text"
							className="form-control"
							placeholder="Type full name here"
							aria-label="firstname surname"
							aria-describedby="basic-addon1"
							minLength="4"
							value={fullName}
							onChange={e => setFullname(e.target.value)}
							required
						/>
					</div>
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text" id="basic-addon1">
								Phone
							</span>
						</div>
						<input
							type="text"
							className="form-control"
							placeholder="08xxxxxxxx"
							aria-label="phone"
							aria-describedby="basic-addon1"
							minLength="10"
							required
							value={phone}
							onChange={e => setPhone(e.target.value)}
						/>
					</div>
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text" id="basic-addon1">
								Email
							</span>
						</div>
						<input
							type="email"
							className="form-control"
							placeholder="email address"
							aria-label="email"
							aria-describedby="basic-addon1"
							required
							value={email}
							onChange={e => setEmail(e.target.value)}
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
							placeholder="address"
							aria-label="address"
							aria-describedby="basic-addon1"
							required
							value={address}
							onChange={e => setAddress(e.target.value)}
						/>
					</div>
					<button onClick={() => onSubmitForm()} className="btn btn-success">
						Register
					</button>
				</div>
			</div>
		</div>
	);
};

export default Register;
