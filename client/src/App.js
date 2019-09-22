import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getFromStorage } from './utils/storage';

import './App.css';

import LandingPage from './components/LandingPage';
import FrontPage from './components/FrontPage';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			componentToShow: '',
			shouldNavigationRender: true,
			isLoading: true,
			token: '',
			buttonText: 'Switch to Sign Up',
			renderFrontPage: true,
			renderLandingPage: false
		};
	}

	componentDidMount() {
		this.verifyToken();
	}

	verifyToken = () => {
		console.log('verifyToken 1');
		const obj = getFromStorage('the_main_app');

		this.setState({
			token: ''
		});

		console.log(obj);
		console.log('verifyToken 2');

		if (obj && obj.token) {
			const { token } = obj;

			console.log('verifyToken 3');

			// Verify the token
			fetch('/api/signin/verify?token=' + token)
				.then(res => res.json())
				.then(json => {
					console.log('verifyToken 4');
					if (json.success) {
						console.log('Token is verified successfully');
						this.setState({
							token,
							isLoading: false,
							renderFrontPage: false,
							renderLandingPage: true
						});
					} else {
						console.log('Token is NOT verified successfully');
						this.setState({
							isLoading: false,
							renderFrontPage: true,
							renderLandingPage: false
						});
					}
				});
		} else {
			console.log('verifyToken 5');
			this.setState({ isLoading: false });
		}
	};

	// Set the token from the sign in form (if successful).
	// If token is valid, the dashboard is rendered.
	signinCallback = value => {
		this.setState({
			token: value,
			renderLandingPage: true,
			renderFrontPage: false
		});

		// this.forceUpdate();
	};

	logout = () => {
		this.setState({
			isLoading: true
		});
		const obj = getFromStorage('the_main_app');

		if (obj && obj.token) {
			const { token } = obj;

			// Verify the token
			fetch('/api/signin/logout?token=' + token)
				.then(res => res.json())
				.then(json => {
					if (json.success) {
						this.setState({
							token: '',
							isLoading: false,
							renderLandingPage: false,
							renderFrontPage: true
						});
					} else {
						this.setState({
							isLoading: false
						});
					}
				});
		} else {
			this.setState({ isLoading: false });
		}
	};

	render() {
		const {
			isLoading,
			token,
			renderFrontPage,
			renderLandingPage
		} = this.state;

		if (isLoading) {
			return (
				<div className='admin-container'>
					<p>Loading...</p>
				</div>
			);
		}

		return (
			<Router>
				<section id='app-main-container'>
					<img
						src='assets/images/paperbg.jpg'
						alt=''
						id='main-background'
					/>
					{/* <div id='overlay' /> */}

					{renderFrontPage ? <FrontPage signinCallback={this.signinCallback}/> : <LandingPage token={token} logout={this.logout} />}

					{/* <Route
						exact
						path='/collection'
						component={props => (
							<Collection
								{...props}
								hideNavCallback={this.hideNav}
								collectionProp='test collection'
								returnToLandingPageCallback={this.closeFormCallback}
							/>
						)}
					/>

					<Route
						exact
						path='/create-new'
						component={props => (
							<FormSelector
								{...props}
								hideNavCallback={this.hideNav}
								itemProp='test item'
							/>
						)}
					/> */}
				</section>
			</Router>
		);
	}
}

export default App;
