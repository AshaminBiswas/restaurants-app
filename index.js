const express = require("express");
const app = express();
const port = 3000;
const db = require("./db.js");
const bodyParser = require("body-parser");
require("dotenv").config();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("This is Home route");
});

//import menu routes
const menuRoutes = require("./routes/menu.route.js");
// import person route
const personRoutes = require("./routes/person.routes.js");

//use menuRoute
app.use("/", menuRoutes);
//use person routes
app.use("/", personRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`The app is listening on port no : ${port} `);
});
