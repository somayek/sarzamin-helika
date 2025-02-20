const express = require("express");
const Rule = require("../models/Rule");
const { evaluateRules } = require("../services/ruleEngine");
const router = express.Router();

// Add a new rule
router.post("/rules", async (req, res) => {
  try {
    const { name, conditions, action } = req.body;
    const rule = new Rule({ name, conditions, action });
    await rule.save();
    res.json({ message: "Rule added successfully", rule });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Evaluate rules
router.post("/evaluate", async (req, res) => {
  try {
    const userData = req.body;
    const rules = await Rule.find({});

    const { events } = await evaluateRules(userData, rules);

    res.json({ results: events.map((event) => event.params) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all rules
router.get("/", async (req, res) => {
  const rules = await Rule.find();
  res.json(rules);
});

// Create a rule
router.post("/", async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      // If the request body is an array, save many
      const rules = await Rule.insertMany(req.body);
      res.status(201).json(rules);
    } else {
      // Otherwise, create a single rule
      const rule = await Rule.create(req.body);
      res.status(201).json(rule);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a rule
router.put("/:id", async (req, res) => {
  const rule = await Rule.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(rule);
});

// Delete a rule
router.delete("/:id", async (req, res) => {
  await Rule.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
