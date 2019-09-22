import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import './App.css';

import LandingPage from "./components/LandingPage";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			componentToShow: '',
			shouldNavigationRender: true,
			isLoading: true,
			token: '',
			buttonText: 'Switch to Sign Up',
			viewSignInForm: true
		};
	}

	render() {

		return (
			<Router>
				<section id='app-main-container'>
					<img
						src='assets/images/paperbg.jpg'
						alt=''
						id='main-background'
					/>
					{/* <div id='overlay' /> */}

					<LandingPage />

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
