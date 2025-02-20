const express = require("express");
const router = express.Router();
const Answer = require("../models/Answer");

// Get all answers
router.get("/", async (req, res) => {
  const answers = await Answer.find();
  res.json(answers);
});

// Create an answer
router.post("/", async (req, res) => {
  try {
    // Check if the body contains an array
    if (Array.isArray(req.body)) {
      // If it's an array, use insertMany to save all answers
      const savedAnswers = await Answer.insertMany(req.body);
      return res.status(200).json(savedAnswers);
    } else {
      // If it's a single object, save it as one answer
      const answer = new Answer(req.body);
      const savedAnswer = await answer.save();
      return res.status(200).json(savedAnswer);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving answer(s)" });
  }
});

// Update an answer
router.put("/:id", async (req, res) => {
  const answer = await Answer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(answer);
});

// Delete an answer
router.delete("/:id", async (req, res) => {
  await Answer.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
