const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const JokeRouter = require("./Routes/joke");
const mongoose = require("mongoose");
const UserRouter = require('./Routes/user');
const bodyParser = require("body-parser")
var cors = require('cors')

const app = express();
const PORT = 8000;
app.use(bodyParser.json())
app.use(cors())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// YdyJFP6LOaknE92b
// adminjokeapi
mongoose.connect("mongodb+srv://adminjokeapi:YdyJFP6LOaknE92b@cluster0.ger3qmd.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true })
    .then(
        () => console.log("database connected "),
        (reason) => console.log("something went wrong with  -> ", reason)
    )

app.get("/", (req, res) => {
    res.send("Welcome to the Joke API");
});


app.get("/about", (req, res) => {

    res.json({
        message: "This is a very cool app that tells you jokes",
        version: "1.0.0"
    });
});


app.use("/api/joke", JokeRouter);
app.use("/api/user", UserRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


module.exports = app;