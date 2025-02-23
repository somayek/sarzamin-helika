const express = require("express");
const router = express.Router();
const Request = require("../models/Request");
const Log = require("../models/Log");

router.post("/", async (req, res) => {
  try {
    const { requests, traceId } = req.body;
    if (!requests || !Array.isArray(requests)) {
      return res.status(400).json({ message: "Requests must be an array" });
    }

    const requestIds = await Promise.all(
      requests.map(async (request) => {
        const newRequest = new Request(request);
        await newRequest.save();
        return newRequest._id;
      })
    );

    const log = new Log({
      requests: requestIds,
      traceId,
    });

    await log.save();
    res.status(201).json({ message: "Audit log saved successfully", log });
  } catch (error) {
    console.error("Error saving audit log:", error);
    res
      .status(500)
      .json({ message: "Error saving audit log", error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const logs = await Log.find().populate("requests"); // Populate requests with actual JSON data
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

router.delete("/all", async (req, res) => {
  await Request.delete();
  res.status(204).send();
});

module.exports = router;
