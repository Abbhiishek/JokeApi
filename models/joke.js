const mongoose = require("mongoose")


const JokeSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    author: {
        type: String,
        required: true
    },
    joke: {
        type: String,
        required: true
    },
    categories: {
        type: [String],
        required: true
    },
    isPublic: {
        type: Boolean,
        default: true
    }
})


const Joke = mongoose.model('Joke', JokeSchema);

module.exports = Joke;