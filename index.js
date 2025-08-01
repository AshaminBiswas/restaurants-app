const express = require("express");
const app = express();
const port = 3000;
const db = require("./db.js");
const bodyParser = require("body-parser");
require("dotenv").config();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(
    " <div style='display:flex, justify-content: space-between'><div><h1>Hi Every one..</h1><p>In this app have only Four end points </p></div><ol><li>['/person']: where you will get all the person data</li><li>['/person/:workType'] : The work Type Value Must be: 'manager' || 'chef' || 'waiter' </li><li>['/menu']: where you will get all the menu data</li><li>['/menu/:taste'] :The taste Value Must be: 'sweet' || 'sour' || 'spicy' </li></ol> </div>"
  );
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
  console.log(`https://loclhost:${port} `);
});
