# Project Setup

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

## Installation

1. Clone the repository:

   ```sh
   git clone <your-repo-url>
   cd <your-project-folder>
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Add the following content:
     ```sh
     MONGO_URI=mongodb://localhost:27017/helika
     PORT=5000
     ```

## Running the Project

To start the backend and frontend together, run:

```sh
npm start
```

This will:

- Start the backend server on `PORT=5000`
- Start the frontend application

## Notes

- Ensure MongoDB is running before starting the project.
- Modify the `.env` file as needed for production configurations.

<!-- prettier-ignore-start -->

## Data Structure

| Rule                  | Question                | Answer                 | Document               |
|-----------------------|------------------------|------------------------|------------------------|
| **application**       | **text**               | **text**               | **text**               |
| **questions (Array)** | **key**                | **key**                | **key**                |
| **documents (Array)** | **input_type**         | **next_question_key**  |                        |
| **charges (Array)**   | **options (Array)**    | **documents (Array)**  |                        |
|                       | **next_question_key**  | **charges (Array)**    |                        |

<!-- prettier-ignore-end -->
