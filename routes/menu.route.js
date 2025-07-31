const express = require("express");
const routes = express.Router();
const menu = require("../models/menu.js");
const menuItem = require("../models/menu.js");
routes.get("/menu", async (req, res) => {
  try {
    const menuItems = await menu.find();
    console.log("menuItemData Fetched Successfully");
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

routes.get("/menu/:test", async (req, res) => {
  try {
    const testType = req.params.test;
    if (testType === "sweet" || testType === "spicy" || testType === "sour") {
      const response = await menu.find({ taste: testType });
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Oops Not Found!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

routes.post("/menu", async (req, res) => {
  try {
    const menus = req.body;
    const menuItems = new menu(menus);
    const menuItemData = await menuItems.save();
    console.log("menuItemData is saved");
    res.status(200).json(menuItemData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

routes.delete("/menu/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const response = await menu.findByIdAndDelete(menuId);
    if (!response) {
      return res.status(404).json({ error: "Menu is Not Found" });
    } else {
      console.log("Menu Delete Successfully");
      res.status(200).json({ message: "menu deleted" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = routes;
