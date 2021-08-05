let { Book } = require('../model/book');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Books', () => {

	beforeEach((done) => {
		Book.deleteMany({}, (error) => {
			done();
		});
	});

	describe('/GET /api/books/', () => {
		it('It should GET all the books', (done) => {
			chai.request(server)
				.get('/api/books/')
				.end((error, response) => {
					response.should.have.status(200);
					response.body.should.be.a('array');
					response.body.length.should.be.eql(0);
					done();
				});
		});
	});

	describe('/POST /api/books/', () => {
		it('It should POST a book ', (done) => {
			let book = {
			        	};

			chai.request(server)
				.post('/api/books/')
				.send(book)
				.end((error, response) => {
					response.should.have.status(200);
					response.body.should.be.a('object');
					response.body.should.have.property('_id');
					response.body.should.have.property('title');
					response.body.should.have.property('year');
					response.body.should.have.property('ratings');
					response.body.should.have.property('authors');
					response.body.should.have.property('publishDate');
					done();
				});
		});
	});

	afterEach((done) => {
		Book.deleteMany({}, (error) => {
			done();
		});
	});
});
