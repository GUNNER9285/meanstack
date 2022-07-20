const express = require('express');
const Book = require('../model/Book');
const app = express();

const bookRoute = express.Router();
let book = require('../model/Book');

// Add book
bookRoute.route('/add-book').post((req, res, next) => {
    Book.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
});

// Get all book
bookRoute.route('/').get((req, res, next) => {
    Book.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
});

// Get book by id
bookRoute.route('/read-book/:id').get((req, res, next) => {
    Book.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
});

// Update book
bookRoute.route('/update-book/:id').patch((req, res, next) => {
    Book.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            console.log(error);
            return next(error);
        } else {
            console.log("Book Updated Successfully");
            res.json(data);
        }
    })
});

// Delete book
bookRoute.route('/delete-book/:id').get((req, res, next) => {
    Book.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            });
        }
    })
});

module.exports = bookRoute;