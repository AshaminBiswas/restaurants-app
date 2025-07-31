const express = require("express");
const routes = express.Router();
const person = require("../models/person.js");

routes.get("/person", async (req, res) => {
  try {
    const data = await person.find();
    console.log("data fetched Successfully");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

routes.get("/person/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (
      workType === "chef" ||
      workType === "manager" ||
      workType === "waiter"
    ) {
      const response = await person.find({ work: workType });
      console.log("Fetched success");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid Work Type. Oops Not Found!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

routes.post("/person", async (req, res) => {
  try {
    const data = req.body;
    const personData = new person(data);
    const savedPersonData = await personData.save();
    console.log("data saved");
    res.status(200).json(savedPersonData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
});

routes.put("/person/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPerson = req.body;
    const response = await person.findByIdAndUpdate(personId, updatedPerson, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return res.status(404).json({ error: "Person Is Not Found" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
});

routes.delete("/person/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "Person Is Not Found" });
    }
    res.status(200).json({ message: "Person Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = routes;
