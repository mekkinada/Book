const express = require('express');
const { Book, validate, parse } = require('../model/book');

const router = express.Router();

router.get('/', async (request, response) => {
	try {
		let books;

		if (request.query.title)
			books = await Book.find({
				'title': {
					'$regex': request.query.title,
					'$options': 'i'
				}
			});
		else if (request.query.author)
			books = await Book.find({
				'authors': {
					'$regex': request.query.author,
					'$options': 'i'
				}
			});
		else
			books = await Book.find().collation({
				locale: 'en',
				strength: 3,
				caseFirst: 'lower'
			}).sort('title');

		response.json(books);
	} catch (error) {
		response.status(500).send(error.message);
	}
});

router.post('/', async (request, response) => {
	try {
		const { error } = validate(request.body);

		if (error)
			return (response.status(400).send(error.details[0].message));

		let book = new Book({
			title: request.body.title,
			year: request.body.year,
			ratings: request.body.ratings,
			publishDate: request.body.publishDate,
			authors: request.body.authors
		});

		response.json(await book.save());
	} catch (error) {
		response.status(500).send(error.message);
	}
});

router.delete('/:id', async (request, response) => {
	try {
		const book = await Book.findOneAndDelete({ _id: request.params.id });

		if (!book)
			return (response.status(404).send('The book with the given ID was not found'));

		response.json(book);
	} catch (error) {
		response.status(500).send(error.message);
	}
});

router.put('/:id', async (request, response)  => {
	try {
		const { error } = validate(request.body);
		const { id } = req.params;
		const { title, year, ratings, publishDate, authors } = req.body;
		if (error)
			return (response.status(400).send(error.details[0].message));
			const put = { title, year, ratings, publishDate, authors , _id: id };
		
			await validate.findByIdAndUpdate(id, put, { new: true });
			res.json(put);
		} catch (error) {
		response.status(500).send(error.message);
	}
});


router.post('/upload', async (request, response) => {
	if (!request.files.books)
		return (response.status(400).send('No file uploaded'));

	try {
		let books = await parse(request.files.books.data.toString().trim());

		response.json(await book.insertMany(books));
	} catch(error) {
		response.status(400).send(error.message);
	}
});

module.exports = router;
