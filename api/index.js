const express = require("express");
const app = express();

app.use("/", (req, res) => {
    res.send("Express is here");
});

app.listen(5000, console.log("Server ready on port 5000."));


