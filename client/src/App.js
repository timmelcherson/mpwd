import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

// import Navigation from './components/Navigation';
import LandingPage from "./components/LandingPage";
import Item from './components/createnewitempage/Item';
import Collection from './components/collectionpage/Collection';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			componentToShow: '',
			shouldNavigationRender: true
		};
	}

	hideNav = dataFromChild => {
		let element = document.getElementById('landing-page-container');
		
		if (dataFromChild) {
			element.style.display = 'none';
		}
		else {
			element.style.display = 'flex';
		}

		// if (dataFromChild === 'Item') {
		// 	this.setState({
		// 		shouldNavigationRender: false
		// 	});
		// }
		// if (dataFromChild === 'Collection') {
		// 	this.setState({
		// 		shouldNavigationRender: false
		// 	});
		// }
	};

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

					<Route
						exact
						path='/collection'
						component={props => (
							<Collection
								{...props}
								hideNavCallback={this.hideNav}
								collectionProp='test collection'
							/>
						)}
					/>

					<Route
						exact
						path='/create-new'
						component={props => (
							<Item
								{...props}
								hideNavCallback={this.hideNav}
								itemProp='test item'
							/>
						)}
					/>
				</section>
			</Router>
		);
	}
}

export default App;
