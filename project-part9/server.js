const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Hello");
});

app.listen(3001, () => {
    console.log("Listening");
});