import React, { Component } from 'react';
// import Fade from 'react-reveal/Fade';
import { CSSTransition } from 'react-transition-group';
// import PropTypes from 'prop-types';

import './FormSelector.css';
import NewWhiskyForm from './NewWhiskyForm';
import NewBeerForm from './NewBeerForm';
import BackButton from '../BackButton';

class Item extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isRendered: false,
			showItemPage: true,
			renderWhiskyForm: false,
			renderBeerForm: false,
			renderSelector: true
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

	sendToParent = () => {
		this.props.hideNavCallback(true);
	};

	handleClick = event => {
		// let element;

		switch (event.target.id) {
			case 'select-new-beer':
				// element = document.getElementById('new-beer-form');
				// element.style.display = 'flex';
				this.setState({
					renderBeerForm: true,
					renderSelector: false
				});

			case 'select-new-whisky':
				// element = document.getElementById('new-whisky-form');
				// element.style.display = 'flex';
				this.setState({
					renderWhiskyForm: true,
					renderSelector: false
				});
		}

		// element = document.getElementById('selector-inner-container');
		// element.style.display = 'none';
	};

	closeFormCallback = () => {
		this.setState({
			renderSelector: true,
			renderBeerForm: false,
			renderWhiskyForm: false
		});
	};

	render() {
		const { renderWhiskyForm, renderBeerForm, renderSelector } = this.state;

		if (renderWhiskyForm) {
			return <NewWhiskyForm closeFormButtonCallback={this.closeFormCallback} />;
		}

		if (renderBeerForm) {
			return <NewBeerForm closeFormButtonCallback={this.closeFormCallback} />;
		}

		if (renderSelector) {
			return (
				<CSSTransition
					in={this.state.showItemPage}
					timeout={400}
					classNames='fade'
					unmountOnExit
					appear>
					<section id='item-container'>
						<BackButton />

						<div id='selector-inner-container'>
							<h2>What do you want to add?</h2>
							<p id='select-new-beer' onClick={this.handleClick}>
								New Beer
							</p>
							<p
								id='select-new-whisky'
								onClick={this.handleClick}>
								New Whisky
							</p>
						</div>

						{/* <NewWhiskyForm />
						<NewBeerForm /> */}
					</section>
				</CSSTransition>
			);
		}
	}
}

Item.propTypes = {};

export default Item;
