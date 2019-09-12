import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import { CSSTransition } from 'react-transition-group';
// import PropTypes from 'prop-types';

import './Collection.css';
import CollectionEntity from './CollectionEntity';
import BackButton from '../BackButton';

class Collection extends Component {
	constructor(props) {
		console.log('Collection constructor');
		super(props);

		console.log('Props:');
		console.log(this.props);

		this.state = {
			isLoading: true,
			names: [],
			scores: [],
			descriptions: [],
			images: [],
			dates: [],
			isRendered: false,
			showCollectionPage: true
		};
	}

	componentDidMount() {
		this.sendToParent();
		fetch('api/whiskies')
			.then(response => response.json())
			.then(data => {
				// console.log('data fetched:\n' + JSON.stringify(data));
				let names = [];
				let scores = [];
				let descriptions = [];
				let images = [];
				let dates = [];

				data.map(element => {
					names.push(element.name);
					scores.push(element.score);
					descriptions.push(element.description);
					images.push(element.img);
					dates.push(element.date);
					return null;
				});
				// let roomTypes = [];
				// let rooms = [];
				// data.map(room => {
				// 	//tempArray.push(room);
				// 	if (!roomTypes.includes(room.roomType)) {
				// 		roomTypes.push(room.roomType);
				// 		rooms.push(room);
				// 	}
				// 	return null;
				// });

				this.setState({
					isLoading: false,
					names: names,
					scores: scores,
					descriptions: descriptions,
					images: images,
					dates: dates
				});
				return data;
			})
			.catch((err, response) => {
				console.log(err, response);
			});
	}

	componentDidUpdate() {
		console.log('componentDidUpdate');
	}

	componentWillUnmount() {
		console.log('componentWillUnmount');
		this.props.hideNavCallback(false);
	}

	// showNav = () => {
	// 	let nav = document.getElementById('nav-link-container');
	// 	let title = document.getElementById('main-page-header');
	// 	nav.style.display = 'flex';
	// 	title.style.display = 'flex';
	// }

	sendToParent = () => {
		this.props.hideNavCallback(true);
	};

	renderEntities = (names, scores, descriptions, images, dates) => {
		// let names = [
		// 	'Talisker',
		// 	'Glenlivet',
		// 	'Aberlour',
		// 	'Bunnahabhain',
		// 	'Laphroaig'
		// ];
		// let scores = [4, 2, 4, 3, 5];
		let entities = [];

		for (let i = 0; i < names.length; i++) {
			// console.log('Pushing name: ' + names[i]);
			entities.push(
				<CollectionEntity
					name={names[i]}
					score={scores[i]}
					img={images[i]}
					key={i}
				/>
			);
		}

		// console.log(entities);
		return entities;
	};

	render() {
		const {
			isLoading,
			names,
			scores,
			descriptions,
			images,
			dates
		} = this.state;

		if (isLoading) {
			return (
				<div className='loading-screen'>
					<p>Loading...</p>
				</div>
			);
		}

		return (
			<CSSTransition
				in={this.state.showCollectionPage}
				timeout={400}
				classNames='fade'
				unmountOnExit
				appear>
				<section id='collection-container'>
					<BackButton />

					<div id='collection-list'>
						{this.renderEntities(
							names,
							scores,
							descriptions,
							images,
							dates
						)}
					</div>
				</section>
			</CSSTransition>
		);
	}
}

Collection.propTypes = {};

export default Collection;
