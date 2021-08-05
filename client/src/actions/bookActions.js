import axios from 'axios';

import {
	GET_BOOKS,
	ADD_BOOK,
	UPLOAD_BOOKS,
	DELETE_BOOK,
	UPDATE_BOOK,
	SEARCH_BOOKS_BY_TITLE,
	SEARCH_BOOKS_BY_AUTHOR,
	BOOKS_LOADING
} from './types';

export const getBooks = () => (dispatch) => {
	dispatch(setItemsLoading());

	return axios.get('/api/books/')
		.then(res =>
			dispatch({
				type: GET_BOOKS,
				payload: res.data
			})
	);
};

export const addBook = (book) => (dispatch) => {
	return axios.post('/api/books/', book)
		.then(res =>
			dispatch({
				type: ADD_BOOK,
				payload: res.data
			})
	);
};


export const deleteBook = (id) => (dispatch) => {
	axios.delete(`/api/books/${id}`)
		.then(res =>
			dispatch({
				type: DELETE_BOOK,
				payload: id
			})
	);
};
  
export const updateBook=(book)=>(dispatch)=>{
    
	    return axios.post(`/api/books/`,book)
            .then(res => {
                dispatch({
                  type: UPDATE_BOOK,
                  payload: res.data
                })
            }
            )}


export const uploadBooks = (file) => (dispatch) => {
	dispatch(setItemsLoading());

	const data = new FormData();
	data.append('books', file.entity, file.name);

	return axios.post('/api/books/upload', data)
		.then(res =>
			dispatch({
				type: UPLOAD_BOOKS,
				payload: res.data
			}));
};

export const searchBooksByTitle = (title) => (dispatch) => {
	dispatch(setItemsLoading());

	axios.get(`/api/books/?title=${title}`)
		.then(res =>
			dispatch({
				type: SEARCH_BOOKS_BY_TITLE,
				payload: res.data
			}));
};

export const searchBooksByAuthor = (author) => (dispatch) => {
	dispatch(setItemsLoading());

	axios.get(`/api/books/?author=${author}`)
		.then(res =>
			dispatch({
				type: SEARCH_BOOKS_BY_AUTHOR,
				payload: res.data
			}));
};

export const setItemsLoading = () => {
	return {
		type: BOOKS_LOADING
	};
};
