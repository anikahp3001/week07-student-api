const express = require("express");

const app = express();

app.use(express.json());

let students = [
    {
        id: 1,
        name: "Anika",
        department: "ISE",
        semester: 3
    },
    {
        id: 2,
        name: "Rahul",
        department: "CSE",
        semester: 3
    },
    {
        id: 3,
        name: "Sneha",
        department: "ECE",
        semester: 3
    }
];

// GET all students
app.get("/students", (req, res) => {
    res.status(200).json(students);
});

// Search by department
app.get("/students/search", (req, res) => {
    const department = req.query.department;

    const result = students.filter(
        s => s.department.toLowerCase() === department.toLowerCase()
    );

    res.status(200).json(result);
});

// GET student by ID
app.get("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.status(200).json(student);
});
// POST - Add student
app.post("/students", (req, res) => {
    const { id, name, department, semester } = req.body;

    if (!id || !name || !department || !semester) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const newStudent = {
        id: Number(id),
        name: name,
        department: department,
        semester: Number(semester)
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});

// PUT - Update student
app.put("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, department, semester } = req.body;

    if (!name || !department || !semester) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    student.name = name;
    student.department = department;
    student.semester = Number(semester);

    res.status(200).json({
        message: "Student updated successfully",
        student: student
    });
});

// DELETE student
app.delete("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(index, 1);

    res.status(200).json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });
});

// Search by department
app.get("/students/search", (req, res) => {
    const department = req.query.department;

    const result = students.filter(
        s => s.department.toLowerCase() === department.toLowerCase()
    );

    res.status(200).json(result);
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});