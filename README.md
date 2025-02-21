# Project Setup

## Prerequisites

Before running the project, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) - JavaScript runtime environment
- [MongoDB](https://www.mongodb.com/) - NoSQL database

## Installation

Follow these steps to set up the project:

1. **Clone the repository**:

   ```sh
   git clone git@github.com:somayek/sarzamin-helika.git
   cd sarzamin-helika
   ```

2. **Set up environment variables**:

   - Create a `.env` file in the root directory of the project.
   - Add the following content to the `.env` file:

     ```sh
     MONGO_URI=mongodb://localhost:27017/helika
     PORT=5001
     ```

## Running the Project

To start both the backend and frontend together, use the following command:

```sh
npm start
```

This will:

- Install all dependancies
- Insert all initial data
- Start the backend server on `PORT=5001`
- Launch the frontend application

## Notes

- Ensure that MongoDB is running before starting the project.

```sh
mkdir ~/data/db
mongod --dbpath ~/data/db
```

- Modify the `.env` file as needed to configure the project for production.

## Data Structure

The project uses the following data structure:

| Rule                  | Question              | Answer                | Document |
| --------------------- | --------------------- | --------------------- | -------- |
| **application**       | **text**              | **text**              | **text** |
| **questions (Array)** | **key**               | **key**               | **key**  |
| **documents (Array)** | **input_type**        | **next_question_key** |          |
| **charges (Array)**   | **options (Array)**   | **documents (Array)** |          |
|                       | **next_question_key** | **charges (Array)**   |          |
