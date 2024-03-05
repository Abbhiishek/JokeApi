const express = require('express');
const Joke = require("../models/joke")
const JokeRouter = express.Router();
const { authenticateToken } = require("../middleware")


JokeRouter.get("/", async (req, res) => {
    // #swagger.tags = ['Joke']
    try {
        const jokes = await Joke.find({ isPublic: true });
        return res.status(200).json({
            error: false,
            count: jokes.length,
            jokes
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: error.message
        })
    }
})



JokeRouter.get("/:id", authenticateToken, async (req, res) => {
    // #swagger.tags = ['Joke']
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    const id = req.params.id
    try {
        const jokes = await Joke.findOne({ id, isPublic: true });
        if (!jokes) return res.status(404)
            .json({ message: `joke with id ${id} not found` })
        return res.status(200).json({
            error: false,
            count: jokes.length,
            jokes
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: error.message
        })
    }
})



JokeRouter.get("/:id/similar", async (req, res) => {
    // #swagger.tags = ['Joke']
    const id = req.params.id
    try {
        const jokes = await Joke.findOne({ id, isPublic: true });

        const categories = jokes.categories

        const similarJokes = await Joke.find({
            categories: { $in: categories },
            isPublic: true
        })
        if (!similarJokes) return res.status(404)
            .json({ message: `joke similar to joke with  id ${id} not found` })
        return res.status(200).json({
            error: false,
            count: similarJokes.length,
            similarJokes
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: error.message
        })
    }
})

JokeRouter.post("/", authenticateToken, async (req, res) => {
    // #swagger.tags = ['Joke']
    /* #swagger.security = [{
            "bearerAuth": []
    }] */


    const { joke, categories } = req.body

    if (!joke || !categories) return res.status(400).json({ message: "joke and categories are required" })
    const storedJoke = await Joke.find()
    const id = storedJoke.length + 1 || 1
    const author = req.user
    const newjoke = new Joke({
        id,
        joke,
        categories,
        author
    })

    try {
        const joke = await Joke.create(newjoke);
        return res.status(201).json({
            message: "joke added successfully",
            id: joke._id,
            joke
        })
    } catch (error) {
        return res.status(500).json({
            message: "sad hu main ",
            error: error.message
        })
    }
})


JokeRouter.put("/:id", authenticateToken, async (req, res) => {
    // #swagger.tags = ['Joke']
    /* #swagger.security = [{
            "bearerAuth": []
    }] */

    const id = req.params.id
    const { joke, categories } = req.body

    try {
        const upatedJoke = await Joke.findOneAndUpdate(
            { id, author: req.user },
            { joke, categories },
            { new: true }
        )
        if (!upatedJoke) return res.status(404)
            .json({ message: `joke with id ${id} not found or you are not the author` })


        return res.status(200).json({
            message: "joke updated successfully",
            id: upatedJoke.id,
            upatedJoke
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: error.message
        })
    }

})

JokeRouter.delete("/:id", authenticateToken, async (req, res) => {
    // #swagger.tags = ['Joke']
    /* #swagger.security = [{
            "bearerAuth": []
    }] */

    const id = req.params.id


    try {
        const joke = await Joke.findOne({
            id, author: req.user, isPublic: true
        })
        if (!joke) return res.status(404)
            .json({ message: `joke with id ${id} not found or you are not the author` })

        // change  the isPublic to false
        await Joke.where({ id }).updateOne({ isPublic: false })
        return res.status(204).json({
            message: "joke deleted successfully",
            id: joke.id,
            joke
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: error.message
        })
    }
})

module.exports = JokeRouter