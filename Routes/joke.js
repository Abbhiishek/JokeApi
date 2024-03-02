const express = require('express');
const Joke = require("../models/joke")
const JokeRouter = express.Router();
const { authenticateToken } = require("../middleware")

/**
* @openapi
* /api/joke:
*   get:
*     description: Get all the Jokes
*     responses:
*       200:
*         description: Returns a array of all jokes
*/
JokeRouter.get("/", authenticateToken, async (req, res) => {
    try {
        const jokes = await Joke.find();
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


/**
* @openapi
* /api/joke/:id:
*   get:
*     description: Get a Jokes by id
*     responses:
*       200:
*         description: Returns a joke
*       404:
*         description: Joke NotFound
*       500:
*         description: Internal server Error
*/
JokeRouter.get("/:id", authenticateToken, async (req, res) => {
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    const id = req.params.id
    try {
        const jokes = await Joke.findById(id);
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

module.exports = JokeRouter