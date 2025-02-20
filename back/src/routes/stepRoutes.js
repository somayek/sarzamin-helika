const express = require("express");
const router = express.Router();
const Step = require("../models/Step");

// Get all steps
router.get("/", async (req, res) => {
  const steps = await Step.find();
  res.json(steps);
});

// Create a step
router.post("/", async (req, res) => {
  const step = await Step.create(req.body);
  res.status(201).json(step);
});

// Update a step
router.put("/:id", async (req, res) => {
  const step = await Step.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(step);
});

// Delete a step
router.delete("/:id", async (req, res) => {
  await Step.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
