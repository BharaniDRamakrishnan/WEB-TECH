const API_URL = "http://localhost:8080/students";
async function getStudents() {
    const response = await fetch(API_URL);
    const students = await response.json();
    
    const studentsList = document.getElementById("studentsList");
    studentsList.innerHTML = "";
    
    students.forEach(student => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${student.rollNo} - ${student.name} - ${student.email} - ${student.mobile}
            <button onclick="editStudent('${student._id}', '${student.rollNo}', '${student.name}', '${student.email}', '${student.address}', '${student.mobile}', '${student.parentName}', '${student.parentNumber}', '${student.hscPercentage}', '${student.cgpa}', '${student.leetcodeId}', '${student.githubId}')">Edit or Read</button>
            <button onclick="deleteStudent('${student._id}')">Delete</button>
        `;
        studentsList.appendChild(li);
    });
}

async function saveStudent() {
    const studentId = document.getElementById("studentId").value;
    const studentData = {
        rollNo: document.getElementById("rollNo").value,
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        mobile: document.getElementById("mobile").value,
        parentName: document.getElementById("parentName").value,
        parentNumber: document.getElementById("parentNumber").value,
        hscPercentage: document.getElementById("hscPercentage").value,
        cgpa: document.getElementById("cgpa").value,
        leetcodeId: document.getElementById("leetcodeId").value,
        githubId: document.getElementById("githubId").value
    };

    if (!studentData.rollNo || !studentData.name || !studentData.email) {
        alert("Roll No, Name, and Email are required.");
        return;
    }

    if (studentId) {
        await fetch(`${API_URL}/${studentId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(studentData)
        });
    } else {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(studentData)
        });
    }

    resetForm();
    getStudents();
}

function editStudent(id, rollNo, name, email, address, mobile, parentName, parentNumber, hscPercentage, cgpa, leetcodeId, githubId) {
    document.getElementById("studentId").value = id;
    document.getElementById("rollNo").value = rollNo;
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    document.getElementById("address").value = address;
    document.getElementById("mobile").value = mobile;
    document.getElementById("parentName").value = parentName;
    document.getElementById("parentNumber").value = parentNumber;
    document.getElementById("hscPercentage").value = hscPercentage;
    document.getElementById("cgpa").value = cgpa;
    document.getElementById("leetcodeId").value = leetcodeId;
    document.getElementById("githubId").value = githubId;

    document.getElementById("formTitle").innerText = "Edit Student";
    document.getElementById("saveBtn").innerText = "Update Student";
    document.getElementById("cancelBtn").style.display = "inline";
}

function cancelEdit() {
    resetForm();
}

function resetForm() {
    document.getElementById("studentId").value = "";
    document.querySelectorAll("input").forEach(input => input.value = "");

    document.getElementById("formTitle").innerText = "Add Student";
    document.getElementById("saveBtn").innerText = "Add Student";
    document.getElementById("cancelBtn").style.display = "none";
}

async function deleteStudent(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    getStudents();
}

document.addEventListener("DOMContentLoaded", getStudents);