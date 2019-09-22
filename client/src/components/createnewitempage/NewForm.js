import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import './NewForm.css';

class ItemForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hiddenCheck: '',
			name: '',
			description: '',
			score: 0,
			itemImage: '',
			date: '',
			itemAdded: false,
			previousScoreId: '',
			category: this.props.category
		};
	}

	componentDidMount() {
		console.log("form mounted, category: " + this.state.category);
	}

	handleChange = event => {
		const target = event.target;
		const name = target.name;
		this.setState({ [name]: target.value });
	};

	handleFileSelect = event => {
		console.log(event.target.files[0]);
		this.setState({
			itemImage: event.target.files[0]
		});
	};

	handleScoreChange = event => {
		if (this.state.previousScoreId !== '') {
			let previousScoreElement = document.getElementById(
				this.state.previousScoreId
			);
			// previousScoreElement.style.transform = 'scale(1)';
			previousScoreElement.classList.remove('selected-score');
		}

		event.target.classList.add('selected-score');

		this.setState({
			score: event.target.innerHTML,
			previousScoreId: event.target.id
		});
	};

	handleSubmit = event => {
		// Prevent page refresh
		event.preventDefault();

		const { name, description, score, itemImage } = this.state;

		const formData = new FormData();

		if (formData.hiddenCheck != ''){
			console.log("This should be empty")
			return;
		}

		formData.append('name', name);
		formData.append('description', description);
		formData.append('score', score);
		formData.append('itemImage', itemImage);
		formData.append('date', new Date());

		let fetchUrl;

		if (this.state.category == 'beer') fetchUrl = '/api/beers';
		else if (this.state.category == 'whisky') fetchUrl = '/api/whiskies';

		fetch(fetchUrl, {
			method: 'POST',
			body: formData
		})
			.then(res => res.clone().json())
			.then(res => {
				if (res.success) {
					console.log('Res success');
					this.setState({
						itemAdded: true
					});

					// Reset whisky added state to false if component remains active after 3 seconds
					setTimeout(() => {
						// Verify if component is still mounted
						if (this._isMounted) {
							this.setState({
								itemAdded: false
							});
						}
					}, 3000);
				} else {
					console.log('Failed with message: ' + res.message);
				}
			})
			.catch(err => console.log('Error when adding whisky' + err));
	};

	closeForm = () => {
		this.props.closeFormButtonCallback();
	};

	render() {

		const { category } = this.state;

		return (
			<section className='form-container'>
				<div className='back-button' onClick={this.closeForm} />

				<form
					id='new-form'
					onSubmit={this.handleSubmit}
					encType='multipart/form-data'>

					<h1 id="new-form-title">New {category}</h1>

					<div className='new-form-row'>
					<input
							name='hiddenCheck'
							type='text'
							value={this.state.hiddenCheck}
							className='hidden-input'
							onChange={this.handleChange}
						/>
					</div>

					<div className='new-form-row'>
						<label className='new-form-label'>
							Name of item
						</label>
						<input
							name='name'
							type='text'
							value={this.state.name}
							className='new-form-input'
							onChange={this.handleChange}
						/>
					</div>
					<div className='new-form-row'>
						<label className='new-form-label'>
							Description
						</label>

						<textarea
							rows='4'
							name='description'
							className='new-form-input'
							value={this.state.value}
							onChange={this.handleChange}
						/>
					</div>
					<div className='new-form-row'>
						<label className='new-form-label'>Score</label>
						<div className='new-form-score-row'>
							<div
								id='new-form-score-1'
								className='new-form-score-box'
								onClick={this.handleScoreChange}>
								1
							</div>
							<div
								id='new-form-score-2'
								className='new-form-score-box'
								onClick={this.handleScoreChange}>
								2
							</div>
							<div
								id='new-form-score-3'
								className='new-form-score-box'
								onClick={this.handleScoreChange}>
								3
							</div>
							<div
								id='new-form-score-4'
								className='new-form-score-box'
								onClick={this.handleScoreChange}>
								4
							</div>
							<div
								id='new-form-score-5'
								className='new-form-score-box'
								onClick={this.handleScoreChange}>
								5
							</div>
						</div>
					</div>
					<div className='new-form-row'>
						<label className='new-form-label'>Image</label>

						<input
							id='new-form-image-input'
							name='itemImage'
							className='new-form-input'
							type='file'
							onChange={this.handleFileSelect}
						/>
					</div>
					<input
						id='new-form-submit-button'
						type='submit'
						value='Submit'
					/>
				</form>
			</section>
		);
	}
}

ItemForm.propTypes = {};

export default ItemForm;
