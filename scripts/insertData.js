const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const Answer = require("../back/src/models/Answer");
const Question = require("../back/src/models/Question");
const Document = require("../back/src/models/Doc");
const Rule = require("../back/src/models/Rule");

const answersData = require("./data/answers.json");
const questionsData = require("./data/questions.json");
const documentsData = require("./data/documents.json");
const rulesData = require("./data/rules.json");
const connectDB = require("../back/src/db");
// const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/helika";
connectDB();

async function insertInitialData() {
  try {
    await Answer.deleteMany();
    await Question.deleteMany();
    await Rule.deleteMany();
    await Document.deleteMany();
    console.log("All collections dropeed.");
    // Insert the data
    const resultA = await Answer.insertMany(answersData);
    console.log(`${resultA.length} Answers inserted`);

    const resultQ = await Question.insertMany(questionsData);
    console.log(`${resultQ.length} Questions inserted`);

    const resultR = await Rule.insertMany(rulesData);
    console.log(`${resultR.length} Rules inserted`);

    const resultD = await Document.insertMany(documentsData);
    console.log(`${resultD.length} Documents inserted`);

    // Close the MongoDB connection
    await mongoose.disconnect();
    console.log("MongoDB connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Error inserting data:", error);
    process.exit(1);
  }
}

insertInitialData();
