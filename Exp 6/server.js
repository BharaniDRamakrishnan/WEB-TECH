const express = require("express");
const mongoose = require("mongoose");

const app = express();


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); 
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); 
    if (req.method === "OPTIONS") {
        return res.sendStatus(200); 
    }
    next();
});

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/studentsDB")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

const StudentSchema = new mongoose.Schema({
    rollNo: String,
    name: String,
    email: String,
    address: String,
    mobile: String,
    parentName: String,
    parentNumber: String,
    hscPercentage: Number,
    cgpa: Number,
    leetcodeId: String,
    githubId: String
});

const Student = mongoose.model("Student", StudentSchema);

app.get("/students", async (req, res) => res.json(await Student.find()));
app.post("/students", async (req, res) => res.json(await new Student(req.body).save()));
app.put("/students/:id", async (req, res) => res.json(await Student.findByIdAndUpdate(req.params.id, req.body, { new: true })));
app.delete("/students/:id", async (req, res) => res.json(await Student.findByIdAndDelete(req.params.id)));

app.listen(8080, () => console.log("Server running on port 8080"));
