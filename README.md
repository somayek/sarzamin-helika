# Project Setup

## Prerequisites

Before running the project, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) - JavaScript runtime environment
- [MongoDB](https://www.mongodb.com/) - NoSQL database

## Installation

Follow these steps to set up the project:

1. **Clone the repository**:

   ```sh
   git clone git@github.com:somayek/sarzamin.git
   cd sarzamin
   ```

2. **Install dependencies**:

   To install all required dependencies, run:

   ```sh
   npm run install:all
   ```

3. **Set up environment variables**:

   - Create a `.env` file in the root directory of the project.
   - Add the following content to the `.env` file:

     ```sh
     MONGO_URI=mongodb://localhost:27017/helika
     PORT=5000
     ```

## Running the Project

To start both the backend and frontend together, use the following command:

```sh
npm start
```

This will:

- Start the backend server on `PORT=5000`
- Launch the frontend application

## Insert Initial Data

If you're running the project for the first time, you need to insert the initial data into the database. To do so, run:

```sh
npm run insert:all
```

## Notes

- Ensure that MongoDB is running before starting the project.
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

### Notes on Data Structure:

- **application**: Contains metadata or basic information about the application.
- **questions**: A list of question objects, each with a key-value pair for the question and its associated answer.
- **documents**: Details about documents, including the input type and references to subsequent questions.
- **charges**: Represents charge-related data with options and links to documents or additional charges.
