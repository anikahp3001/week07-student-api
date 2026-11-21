Student Management REST API

A Student Management REST API built using Node.js, Express.js, MongoDB, and Mongoose.

Features

- Add student records
- View all students
- View a student by ID
- Update student details
- Delete student records
- Search students by department
- MongoDB database integration
- Mongoose schema validation
- Automatic timestamps

Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv

Student Details

Each student record contains:

- ID
- Name
- Department
- Semester

API Endpoints

Method| Endpoint| Description
GET| "/students"| Get all students
GET| "/students/:id"| Get student by ID
POST| "/students"| Add a new student
PUT| "/students/:id"| Update a student
DELETE| "/students/:id"| Delete a student
GET| "/students/search?department=ISE"| Search by department

Installation

Clone the repository and open the project folder.

Install the required packages:

npm install

Environment Variables

Create a ".env" file in the project folder and add:

MONGO_URI=your_mongodb_connection_string

Do not upload the ".env" file to GitHub.

A ".env.example" file is provided as a template.

Run the Server

Start the server using:

node server.js

The API runs at:

http://localhost:3000

Example

To get all students:

GET http://localhost:3000/students

To search by department:

GET http://localhost:3000/students/search?department=ISE

Database

Student records are stored in MongoDB Atlas and managed using Mongoose.

Week 08

This project is an upgraded version of the Week 07 Student Management REST API with MongoDB and Mongoose integration.