const express = require("express");
const noteModel = require("./models/note.model");

const app = express();

app.use(express.json());

app.post("/notes", async (req, res) => {
  const data = req.body;

  await noteModel.create({
    title: data.title,
    description: data.description,
  });

  res.status(201).json({
    message: "Note created",
  });
});


app.get("/notes", async (req,res) => {
  const notes = await noteModel.find()

  res.status(200).json({
    message : "Notes fetched successfully", 
    notes : notes
  })
})

module.exports = app;

