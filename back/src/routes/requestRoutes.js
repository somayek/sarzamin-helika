const express = require("express");
const router = express.Router();
const Request = require("../models/Request");
const Log = require("../models/Log");

/**
 * Save audit Log
 */
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
/** Fetch logs paginated Sorted desc CreatedAt */
router.get("/paginated", async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;

    const logs = await Log.find()
      .populate("requests")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalLogs = await Log.countDocuments();

    res.json({
      totalLogs,
      totalPages: Math.ceil(totalLogs / limit),
      currentPage: Number(page),
      logs,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

/** Fetch all logs */
router.get("/", async (req, res) => {
  try {
    const logs = await Log.find().populate("requests");
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
