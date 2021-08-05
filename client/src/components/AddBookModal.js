import React, { Component } from 'react';
import {
	InputGroup,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Label,
	Input,
	InputGroupAddon,
	NavLink,
	Container
} from 'reactstrap';

import { connect } from 'react-redux';
import { addBook } from '../actions/bookActions';

class AddBookModal extends Component {
	state = {
		modal: false,
		title: '',
		ratings: 'Action',
		year: 1800,
		authors: ['']
	};

	toggle = () => {
		this.setState({
			modal: !this.state.modal,
			title: '',
			ratings: 'Action',
			year: 1800,
			authors: ['']
		});
	};

	onTitleChange = (event) => {
		this.setState({
			title: event.target.value
		});
	};

	onYearChange = (event) => {
		this.setState({
			year: event.target.value
		})
	};

	onRatingsChange = (event) => {
		this.setState({
			ratings: event.target.value
		});
	};

	onPublishDateChange  = (event) => {
		this.setState({
			publishDate: event.target.value
		});
	};

	onAuthorChange = (event, index) => {
		const authors = this.state.authors;
		authors[index] = event.target.value;

		this.setState({
			authors: authors
		})
	};

	addAuthor = () => {
		this.setState({
			authors: [...this.state.authors, '']
		});
	};

	removeAuthor = (event, index) => {
		event.preventDefault();

		this.state.authors.splice(index, 1);
		this.setState({
			authors: this.state.authors
		});
	};

	onSubmit = e => {
		e.preventDefault();

		const book = {
			title: this.state.title,
			year: this.state.year,
			ratings: this.state.ratings,
			publishDate: this.state.publishDate,
			authors: this.state.authors
		};

		this.props.addBook(book)
			.then(() => {
				this.setState({
					modal: false
				});
			})
			.catch((error) => (alert(error.response.data)));
	};

	render() {
		return (
			<Container>
				<NavLink
					className="navigation-link"
					color="light"
					onClick={ this.toggle }>
					Add Book
				</NavLink>

				<Modal
					isOpen={ this.state.modal }
					toggle={ this.toggle }>
					<ModalHeader
						toggle={ this.toggle }>
						Add Book
					</ModalHeader>
					<ModalBody>
						<Form
							onSubmit={ this.onSubmit }>
							<FormGroup>
							<Label
									for="ratings"
									className="mt-3">
									Title
								</Label>
								<Input
									id="title"
									name="title"
									type="text"
									required
									maxLength="100"
									placeholder="Title"
									onChange={ this.onTitleChange }/>
										<Label
									for="ratings"
									className="mt-3">
									Year
								</Label>
								<Input
									id="year"
									name="year"
									type="number"
									required
									min="1800"
									max="3000"
									placeholder="Year"
									className="mt-3"
									onChange={ this.onYearChange }/>
								<Label
									for="ratings"
									className="mt-3">
									Ratings
								</Label>
								<Input
									type="select"
									name="ratings"
									onChange={ this.onRatingsChange }>
									<option>Action</option>
									<option>Classics</option>
									<option>Historical Fiction</option>
								</Input>
								
                                <Label 
								    className="mt-3"> 
								     PublishDate
								</Label>
                                <Input
								    type="date"
								    name="publishDate"
                                    onChange={ this.onPublishDateChange }>
	                            </Input>
								<Label
									className="mt-3">
									Authors
								</Label>
								{ this.state.authors.map((author, index) => {
										return (
											<div
												key={ index }
												className="mb-3">
												<InputGroup>
													<Input
														type="text"
														value={ author }
														onChange={ (event) => (this.onAuthorChange(event, index)) }
														placeholder="Name & Surname"
														required
														maxLength="100"/>
													<InputGroupAddon
														addonType="append">
														<Button
															color="dark"
															className="fa fa-trash"
															onClick={ (event) => (this.removeAuthor(event, index)) }/>
													</InputGroupAddon>
												</InputGroup>
											</div>
										)
									}) }
								<Button
									color="dark"
									outline
									block
									onClick={ this.addAuthor }>
									Add Author
								</Button>
								<Button
									color="dark"
									block
									style={{ marginTop: '2rem' }}
									type="submit">
									Add Book
								</Button>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	book: state.book
});

export default connect(
	mapStateToProps,
	{ addBook }
)(AddBookModal);
