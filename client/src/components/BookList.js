import React, { Component } from 'react';
import {
	FormGroup,
	Label,
	Container,
	Button,
	Card,
	CardImg,
	CardBody,
	CardTitle,
	CardSubtitle,
	Form,
	Input,
	InputGroup,
	InputGroupAddon,
	Modal,
	ModalHeader,
	ModalBody
} from 'reactstrap';

import {
	getBooks,
	deleteBook,
	searchBooksByTitle,
	searchBooksByAuthor
} from '../actions/bookActions';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import 'font-awesome/css/font-awesome.min.css';


class BookList extends Component {
	state = {
		query: '',
		type: 'Title',
		modal: false,
		upmodal: false,
		book: null
	};

	toggle = () => {
		this.setState({
			modal: !this.state.modal && !this.state.upmodal
			
		});
	};




	componentDidMount() {
		this.props.getBooks();
	}

	onDeleteClick = id => {
		this.props.deleteBook(id);
	};

	onViewClick = (book) => {
		this.setState({
			modal: true,
			book: book
		});
	};

  


	onUpdateClick = (id) => {
		this.setState({
			upmodal: true,
			book: id
		});
		
		
	};


	search = (type, query) => {
		if (query !== '') {
			if (type === 'Title')
				this.props.searchBooksByTitle(query);
			else
				this.props.searchBooksByAuthor(query);
		} else {
			this.props.getBooks();
		}
	};

	
	onAuthorChange = (event, index) => {
		const authors = this.state.authors;
		authors[index] = event.target.value;

		this.setState({
			authors: authors
		})
	};

	handleSelectChange = (event) => {
		this.setState({
			type: event.target.value
		});

		this.search(event.target.value, this.state.query);
	};

	handleInputChange = (event) => {
		this.setState({
			query: event.target.value
		});

		this.search(this.state.type, event.target.value);
	};
	

	handleSubmit = (event) => {
		event.preventDefault();
	};
	
onChangeTitle = (e)=>{
	this.setState({
	title : e.target.value
});
};

onChangeYear=(e)=>{
	this.setYear({
		year : e.target.value
		});
};

onChangeRatings=(e)=>{
	this.setRatings({
		ratings : e.target.value
		});
};

onChangePublishDate=(e)=>{
	this.setPublishDate({
		publishDate :e.target.value
		});
};

onChangeAuthors=(e)=>{
	this.setAuthors({
		authors	: e.target.value});
};

onSubmit= (e)=>{
    e.preventDefault();

    const book = {
        title: this.state.title,
			year: this.state.year,
			ratings: this.state.ratings,
			publishDate: this.state.publishDate,
			authors: this.state.authors
    };
  this.props.updateBook(book)
  .then(() =>  {
    this.setState({
        upmodal: false
    });
})

};



	render() {
		const books = this.props.book.books;

		books.sort((a, b) => (a.title.localeCompare(b.title)));

		return (
			<div>
				<Form
					className="mt-4 mb-4"
					onSubmit={ this.handleSubmit }>
					<InputGroup>
						<InputGroupAddon
							addonType="prepend">
							<Input
								type="select"
								name="select"
								onChange={ this.handleSelectChange }>
								<option>Title</option>
								<option>Author</option>
							</Input>
						</InputGroupAddon>
						<Input
							value={ this.state.query }
							placeholder={ (this.state.type === 'Title') ? 'SEARCH BOOKS BY TITLE & AUTHOR' : '' }
							name="search"
							onChange={ this.handleInputChange } />
					</InputGroup>
				</Form>

				<Container
					className="d-flex flex-row flex-wrap mt-3">
					{ books.map((book) => (
						<Card
							className="col-md-3 mb-3"
							key={ book._id }>
							<CardImg
								top
								width="100%"
								src="/img.jpg"
								alt="Card image cap"/>
							<CardBody>
								<CardTitle>
									{ book.title }
								</CardTitle>
								<CardSubtitle
									className="text-secondary">
									{ book.year }
								</CardSubtitle>
								<div
									style={{ zIndex: 2,
										position: 'absolute',
										right: '0.5rem',
										top: '0.75rem' }}>
									<Button
										color="dark"
										size="sm"
										className="fa fa-eye"
										onClick={ this.onViewClick.bind(this, book) }
										block/>
									<Button
										color="dark"
										size="sm"
										className="fa fa-refresh"
										
										onClick= { this.onUpdateClick.bind(this, book) }
										block/>

									<Button
										color="dark"
										size="sm"
										className="fa fa-trash"
										onClick={ this.onDeleteClick.bind(this, book._id) }
										block
										/>
								</div>
							</CardBody>
						</Card>
						)) }
				</Container>

				{ ////aff
					this.state.modal && this.state.book &&
					<Modal
						isOpen={ this.state.modal }
						toggle={ this.toggle }>
						<ModalHeader
							toggle={ this.toggle }>
							{ this.state.book.title }
						</ModalHeader>
						<ModalBody>
							<p>
								<span className="font-weight-bold">Year: </span>
								{ this.state.book.year }
							</p>
							<p>
								<span className="font-weight-bold">Ratings: </span>
								{ this.state.book.ratings }
							</p>
							<p>
								<span className="font-weight-bold">Publish Date: </span>
								{ this.state.book.publishDate }
							</p>
							<p className="font-weight-bold">
								Authors:
							</p>
							<ul>
							{ this.state.book.authors.map((author, index) => (
									<li key={ index }>
										{ author }
									</li>
								)) }
							</ul>
						</ModalBody>
					</Modal>
				}


                {    ////upmodal
					this.state.upmodal && this.state.book &&
					<Modal
						isOpen={ this.state.upmodal }
						toggle={ this.toggle }>
						<ModalHeader
							toggle={ this.toggle }>
							{ this.state.book.title }
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
									maxLength="100"
									required = ""
									placeholder={ this.state.book.title }
									onChange= { this.onChangeTitle }
									>
							</Input>
							<Label
									for="ratings"
									className="mt-3">
									Year
                            </Label>
							<Input
									id="year"
									name="year"
									type="number"
									min="1800"
									max="3000"
									required = ""
									placeholder={ this.state.book.year }
									className="mt-3"
									onChange={ this.onChangeYear }>
							</Input>
							<Label
									for="ratings"
									className="mt-3">
									Ratings
							</Label>
							<Input
									type="select"
									name="ratings"
									required = ""
									placeholder={this.state.book.ratings }
									onChange={this.onChangeRatings }
									>
									<option>Action</option>
									<option>Classics</option>
									<option>Historical Fiction</option>
							</Input>
								
							<Label
									for="ratings"
									className="mt-3">
									Authors
							</Label>
							<InputGroup>
							<Input
							type="text"
							onChange={this.onChangeauthors }
						    placeholder= { this.state.book.authors }
						    required = ""
						    maxLength="100"/>
							</InputGroup>
								<Button
									color="dark"
									block
									style={{ marginTop: '2rem' }}
									type="submit">
									UP Book
								</Button>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>

					
				}

		</div>
		)
	}
}

BookList.propTypes = {
	getBooks: PropTypes.func.isRequired,
	book: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	book: state.book,
	query: state.query



});

export default connect(
	mapStateToProps,
	{ getBooks, searchBooksByTitle, searchBooksByAuthor, deleteBook }
)(BookList);
