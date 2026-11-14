Student Management REST API

A simple REST API built using Node.js and Express.js to manage student details.

Technologies Used

- Node.js
- Express.js
- JavaScript

Student Details

Each student contains:

- ID
- Name
- Department
- Semester

How to Run

1. Open the project in VS Code.
2. Open the terminal.
3. Run:

npm install

4. Start the server:

node server.js

5. Open:

http://localhost:3000

API Endpoints

GET all students

GET /students

GET student by ID

GET /students/:id

Example:

GET /students/1

POST a new student

POST /students

Example JSON:

{
  "id": 4,
  "name": "Priya",
  "department": "ISE",
  "semester": 3
}

PUT update a student

PUT /students/:id

Example:

{
  "name": "Priya Sharma",
  "department": "ISE",
  "semester": 4
}

DELETE a student

DELETE /students/:id

Search by department

GET /students/search?department=ISE

Status Codes

- 200 – Successful request
- 201 – Student created
- 400 – Invalid request
- 404 – Student not found

Project

This project was created as part of the Web Development Week 07 task.