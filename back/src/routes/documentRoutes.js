const express = require("express");
const router = express.Router();
const Doc = require("../models/Doc");

// Get all documents
router.get("/", async (req, res) => {
  const docs = await Doc.find();
  res.json(docs);
});

// Create a document
router.post("/", async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      // If the request body is an array, insert many
      const docs = await Doc.insertMany(req.body);
      res.status(201).json(docs);
    } else {
      // Otherwise, create a single document
      const doc = await Doc.create(req.body);
      res.status(201).json(doc);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a document
router.put("/:id", async (req, res) => {
  const doc = await Doc.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(doc);
});

// Delete a document
router.delete("/:id", async (req, res) => {
  await Doc.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
