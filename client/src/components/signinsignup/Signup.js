import React, { Component } from 'react';


import './Signin.css';

export class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			token: '',
			signUpError: '',
			signUpFirstName: '',
			signUpLastName: '',
			signUpEmail: '',
			signUpPassword: ''
		};
	}

	// Listen for changes in the input text fields
	onTextBoxChangeSignUpFirstName = event => {
		this.setState({
			signUpFirstName: event.target.value
		});
	};
	onTextBoxChangeSignUpLastName = event => {
		this.setState({
			signUpLastName: event.target.value
		});
	};
	onTextBoxChangeSignUpEmail = event => {
		this.setState({
			signUpEmail: event.target.value
		});
	};
	onTextBoxChangeSignUpPassword = event => {
		this.setState({
			signUpPassword: event.target.value
		});
	};

	// Perform sign up submission
	onSignUp = () => {
		const {
			signUpFirstName,
			signUpLastName,
			signUpEmail,
			signUpPassword
		} = this.state;

		this.setState({
			isLoading: true
		});

		fetch('/api/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				firstName: signUpFirstName,
				lastName: signUpLastName,
				email: signUpEmail,
				password: signUpPassword
			})
		})
			.then(res => res.clone().json())
			.then(json => {
				if (json.success) {
					this.setState({
						signUpError: json.message,
						isLoading: false,
						signUpFirstName: '',
						signUpLastName: '',
						signUpEmail: '',
						signUpPassword: ''
					});
				} else {
					this.setState({
						signUpError: json.message,
						isLoading: false
					});
				}
			});
	};

	render() {
		const {
			signUpError,
			signUpFirstName,
			signUpLastName,
			signUpEmail,
			signUpPassword
		} = this.state;

		return (
			<form id='admin-signup-form'>
				{signUpError ? <p>{signUpError}</p> : null}
				<h2 id='login-form-title'>Admin Signup</h2>
				<input
					type='text'
					placeholder='Firstname'
					className='login-form-input'
					value={signUpFirstName}
					onChange={this.onTextBoxChangeSignUpFirstName}
				/>
				<br />
				<input
					type='text'
					placeholder='Lastname'
					className='login-form-input'
					value={signUpLastName}
					onChange={this.onTextBoxChangeSignUpLastName}
				/>
				<br />
				<input
					type='email'
					placeholder='Email'
					className='login-form-input'
					value={signUpEmail}
					onChange={this.onTextBoxChangeSignUpEmail}
				/>
				<br />
				<input
					type='password'
					placeholder='Password'
					className='login-form-input'
					value={signUpPassword}
					onChange={this.onTextBoxChangeSignUpPassword}
				/>
				<br />
				<button
					onClick={this.onSignUp}
					className='button-background'>
					Sign Up
				</button>
			</form>
		);
	}
}

export default SignUp;