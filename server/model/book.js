const Joi = require('joi');
const mongoose = require('mongoose');

const ratingss = ['Action', 'Classics', 'Historical-Fiction'];

const Book = new mongoose.model('Book', new mongoose.Schema({
	title: {
		type: String,
		required: true,
		maxlength: 100
	},
	year: {
		type: Number,
		required: true,
		min: 1800,
		max: 3000
	},
	ratings:  {
		type: String,
		required: true,
		enum: ratingss
	},
	publishDate: {
		type: Date,
		required: true
	  },
	authors: {
		type: [{
			type: String,
			maxlength: 100
		}],
		required: true
	}
}));

const validate = (book) => {
	const schema = {
		title: Joi.string().max(100).required(),
		year: Joi.number().min(1800).max(3000).required(),
		ratings: Joi.string().valid(ratingss).required(),
		publishDate: Joi.date().required(),
		authors: Joi.array().items(Joi.string().max(100)).min(1).required()
	};

	return (Joi.validate(book, schema));
};

const parse = (file) => {
	return new Promise (((resolve) => {
		let booksArray = [];
		let books = file.replace(/(\r\n|\n|\r)/gm, '\n').split(/^\s*\n/gm);
		let pattern = /Title:\s*(.+?)\s*\nRelease Year:\s*(\d{4})\s*\nRatings:\s*(Action|Classics|Historical Fiction)\s*\nPublishDate:\s*(.*)\s*\nAuthors:\s*(.*)/;

		books.forEach((str) => {
			if (pattern.test(str)) {
				const result = pattern.exec(str);

				const book = {
					title: result[1],
					year: parseInt(result[2], 10),
					ratings: result[3],
					publishDate: result[4],
					authors: result[5].split(', ').map((name) => (name.trim()))
				};

				const { error } = validate(book);

				if (error)
					throw new Error('Invalid file');

				booksArray.push(book);
			} else {
				throw new Error('Invalid file');
			}
		});
		resolve(booksArray);
	}));
};

module.exports = {
	Book,
	validate,
	parse
};
