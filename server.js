const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Student = require("./models/Student");

dotenv.config();

console.log("MONGO_URI loaded:", !!process.env.MONGO_URI);

const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect(
    process.env.MONGO_URI,
    {
        serverSelectionTimeoutMS: 10000
    }
)
    .then(() => {
        console.log("Connected to MongoDB");

        app.listen(3000, () => {
            console.log("Server running at http://localhost:3000");
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error.message);
    });


// GET all students
app.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: "Error fetching students" });
    }
});


// Search by department
app.get("/students/search", async (req, res) => {
    try {
        const department = req.query.department;

        const students = await Student.find({
            department: { $regex: `^${department}$`, $options: "i" }
        });

        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: "Error searching students" });
    }
});


// GET student by ID
app.get("/students/:id", async (req, res) => {
    try {
        const student = await Student.findOne({
            id: Number(req.params.id)
        });

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching student"
        });
    }
});


// POST - Add student
app.post("/students", async (req, res) => {
    try {
        const { id, name, department, semester } = req.body;

        const newStudent = await Student.create({
            id: Number(id),
            name,
            department,
            semester: Number(semester)
        });

        res.status(201).json({
            message: "Student added successfully",
            student: newStudent
        });
    } catch (error) {
        res.status(400).json({
            message: "Error adding student",
            error: error.message
        });
    }
});


// PUT - Update student
app.put("/students/:id", async (req, res) => {
    try {
        const student = await Student.findOneAndUpdate(
            { id: Number(req.params.id) },
            {
                name: req.body.name,
                department: req.body.department,
                semester: Number(req.body.semester)
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student updated successfully",
            student
        });
    } catch (error) {
        res.status(400).json({
            message: "Error updating student",
            error: error.message
        });
    }
});


// DELETE student
app.delete("/students/:id", async (req, res) => {
    try {
        const student = await Student.findOneAndDelete({
            id: Number(req.params.id)
        });

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student deleted successfully",
            student
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting student"
        });
    }
});