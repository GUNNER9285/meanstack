const moongoose = require('mongoose');
const Schema = moongoose.Schema;

let Book = new Schema({
    name: {
        type: String
    },
    price: {
        type: String
    },
    description: {
        type: String
    }
}, {
    collection: 'books'
})

module.exports = moongoose.model('Book', Book);