require('dotenv').config();

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes/authRoutes")(app);
require("./routes/expenseRoutes")(app);

module.exports = app;
