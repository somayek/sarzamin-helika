const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// Get all questions
router.get("/", async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
});

// Create a question
router.post("/", async (req, res) => {
  try {
    // Check if the body contains an array of questions
    if (Array.isArray(req.body)) {
      // If it's an array, use insertMany to save all questions
      const savedQuestions = await Question.insertMany(req.body);
      return res.status(201).json(savedQuestions);
    } else {
      // If it's a single object, save it as one question
      const question = await Question.create(req.body);
      return res.status(201).json(question);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving question(s)" });
  }
});

// Update a question
router.put("/:id", async (req, res) => {
  const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(question);
});

// Delete a question
router.delete("/:id", async (req, res) => {
  await Question.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
