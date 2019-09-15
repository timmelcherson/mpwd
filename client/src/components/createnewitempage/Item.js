import React, { Component } from 'react';
// import Fade from 'react-reveal/Fade';
import { CSSTransition } from 'react-transition-group';
// import PropTypes from 'prop-types';

import './Item.css';
import ItemForm from './ItemForm';
import BackButton from '../BackButton';

class Item extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isRendered: false,
			showItemPage: true
		};
	}

	componentDidMount() {
		this.sendToParent();
	}

	componentDidUpdate() {
		console.log('componentDidUpdate');
	}

	componentWillUnmount() {
		this.props.hideNavCallback(false);
	}

	// showNav = () => {
	// 	let nav = document.getElementById('nav-link-container');
	// 	let title = document.getElementById('main-page-header');
	// 	nav.style.display = 'flex';
	// 	title.style.display = 'flex';
	// };

	sendToParent = () => {
		this.props.hideNavCallback(true);
	};

	// fadeIn = () => {
	// 	let element = document.getElementById('item-container');
	// 	element.classList.add('fadein');
	// 	if (element.classList.contains('fadeout'))
	// 		element.classList.remove('fadeout');
	// };

	// fadeOut = () => {
	// 	let element = document.getElementById('item-container');
	// 	element.classList.add('fadeout');
	// 	element.classList.remove('fadein');
	// };
	switch = () => {
		this.setState(() => ({
			showItemPage: !this.state.showItemPage
		}));
	};

	render() {
		return (
			<CSSTransition
				in={this.state.showItemPage}
				timeout={400}
				classNames='fade'
				unmountOnExit
				appear>
				<section id='item-container'>
					<BackButton />
					<button onClick={this.switch}>SWITCH</button>
					<h1>Create New Item</h1>

					<ItemForm />
				</section>
			</CSSTransition>
		);
	}
}

Item.propTypes = {};

export default Item;
