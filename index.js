const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const jokes = require('./data/joke.json');
const app = express();
const PORT = 8000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get("/", (req, res) => {
    res.send("Welcome to the Joke API");
});


app.get("/about", (req, res) => {

    res.json({
        message: "This is a very cool app that tells you jokes",
        version: "1.0.0"
    });
});

app.get("/joke", (req, res) => {
    // #swagger.tags = ['Jokes']
    // #swagger.summary = 'Get all jokes or a joke by id or category'\
    // #swagger.description = 'Some description...'
    const { id, category } = req.query
    console.log("id ", id, category);

    if (id === undefined && category === undefined) {
        res.status(200).json({
            error: "false",
            length: jokes.length,
            data: jokes
        });
        return;
    }

    const joke = jokes.find(joke => joke.id === parseInt(id));

    if (joke) {
        res.status(200).json({
            error: "false",
            length: 1,
            data: joke
        });
        return;
    }

    if (category) {
        const joke = jokes.filter(joke => joke.category === category);
        res.status(200).json({
            error: "false",
            category: category,
            length: joke.length,
            data: joke
        });
        return;
    }


    res.status(200).json({
        error: "false",
        length: 0,
        data: "no jokes found with that id"
    });

});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


module.exports = app;