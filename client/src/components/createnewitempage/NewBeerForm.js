import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import './NewBeerForm.css';

class NewBeerForm extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	handleChange = event => {};

	handleFileSelect = event => {};

	handleScoreChange = event => {};

	render() {
		return (
			<form
				id='new-beer-form'
				onSubmit={this.handleSubmit}
				encType='multipart/form-data'>
				<div className='new-beer-form-row'>
					<label className='new-beer-form-label'>Name of item</label>
					<input
						name='name'
						type='text'
						className='new-beer-form-input'
						onChange={this.handleChange}
					/>
				</div>

				<input
					id='new-beer-form-submit-button'
					type='submit'
					value='Submit'
				/>
			</form>
		);
	}
}

NewBeerForm.propTypes = {};

export default NewBeerForm;
