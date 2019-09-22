import React, { Component } from 'react';
import { getFromStorage, setInStorage } from '../../utils/storage';

// import PropTypes from 'prop-types';

class Signin extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			token: '',
			signInError: '',
			signInEmail: '',
			signInPassword: ''
		};
	}

	componentDidMount() {}

	// Handle sign in submission
	onSignIn = event => {
		event.preventDefault();

		const { signInEmail, signInPassword } = this.state;

		console.log('signing in... ');

		this.setState({
			isLoading: true
		});

		fetch('/api/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: signInEmail,
				password: signInPassword
			})
		})
			.then(res => res.clone().json())
			.then(res => {
				console.log('response received');
				if (res.success) {
					setInStorage('the_main_app', {
						token: res.token
					});
					this.setState({
						signInError: res.message,
						isLoading: false,
						signInEmail: '',
						signInPassword: '',
						token: res.token
					});
					this.props.signinCallback(this.state.token);
				} else {
					this.setState({
						signInError: res.message,
						isLoading: false
					});
					console.log('signInError: ' + this.state.signInError);
				}
			});
	};

	// Listen for changes in the input text fields
	onTextBoxChangeSignInEmail = event => {
		this.setState({
			signInEmail: event.target.value
		});
	};

	onTextBoxChangeSignInPassword = event => {
		this.setState({
			signInPassword: event.target.value
		});
	};

	render() {
		const { signInError, signInEmail, signInPassword } = this.state;

		return (
			<section>
				{signInError ? <p>{signInError}</p> : null}

				<form
					id='signin-form'
					onSubmit={this.handleSubmit}
					encType='multipart/form-data'>
					<h1 id='signin-form-title'>Sign in</h1>

					<div className='signin-form-row'>
						<input
							name='hiddenCheck'
							type='text'
							value={this.state.hiddenCheck}
							className='hidden-input'
							onChange={this.handleChange}
						/>
					</div>

					<div className='signin-form-row'>
						<label className='signin-form-label'>Email</label>
						<input
							name='firstName'
							type='email'
							placeholder='Email'
							value={signInEmail}
							onChange={this.onTextBoxChangeSignInEmail}
						/>
					</div>

					<div className='signin-form-row'>
						<label className='signin-form-label'>Password</label>
						<input
							name='lastName'
							type='password'
							placeholder='Password'
							value={signInPassword}
							onChange={this.onTextBoxChangeSignInPassword}
						/>
					</div>

					{/* <div className='signin-form-row'>
						<label className='signin-form-label'>Image</label>

						<input
							id='signin-form-image-input'
							name='itemImage'
							className='signin-form-input'
							type='file'
							onChange={this.handleFileSelect}
						/>
					</div> */}

					<button
						id='signin-form-submit-button'
						onClick={this.onSignIn}
						type='submit'
						value='Submit'>
						Sign In
					</button>
				</form>
			</section>
		);
	}
}

Signin.propTypes = {};

export default Signin;
