import { useState, useEffect, createContext, useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import StudentForm from "./components/StudentForm.jsx";
const AppContext = createContext();

const initialStudents = [
  { id: 1, name: "Rahul Sharma", course: "React JS" },
  { id: 2, name: "Priya Patil", course: "Java Programming" },
  { id: 3, name: "Amit Kumar", course: "Web Development" },
];

const courses = [
  { id: 1, name: "React JS", duration: "3 months" },
  { id: 2, name: "Java Programming", duration: "4 months" },
  { id: 3, name: "Web Development", duration: "3 months" },
  { id: 4, name: "Python Programming", duration: "2 months" },
];

function Dashboard() {
  const { students } = useContext(AppContext);

  return (
    <section className="summary">
      <h2>Dashboard</h2>
      <p>Welcome to the Student Course Management System.</p>
      <h3>Total Students: {students.length}</h3>
      <h3>Total Courses: {courses.length}</h3>
    </section>
  );
}

function Students() {
  const { students, setStudents } = useContext(AppContext);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("React JS");

  function addStudent(event) {
    event.preventDefault();

    if (!name.trim()) {
      alert("Please enter the student name.");
      return;
    }

    setStudents([
      ...students,
      {
        id: Date.now(),
        name: name.trim(),
        course,
      },
    ]);

    setName("");
    setCourse("React JS");
  }

  return (
    <section className="student-section">
      <h2>Students</h2>
      <h3>Total Students: {students.length}</h3>

      <StudentForm
        studentName={name}
        setStudentName={setName}
        course={course}
        setCourse={setCourse}
        courses={courses}
        onSubmit={addStudent}
      />

      <h3>Student List</h3>
      <div className="student-list">
        {students.map((student) => (
          <article className="student-card" key={student.id}>
            <h4>{student.name}</h4>
            <p>Course: {student.course}</p>
            <p>Student ID: {student.id}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Courses() {
  return (
    <section className="courses-section">
      <h2>Courses</h2>
      <div className="course-list">
        {courses.map((course) => (
          <article className="course-card" key={course.id}>
            <h3>{course.name}</h3>
            <p>Duration: {course.duration}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function App() {
  const [students, setStudents] = useState(() => {
  const savedStudents = localStorage.getItem("students");
  return savedStudents
    ? JSON.parse(savedStudents)
    : initialStudents;
});

useEffect(() => {
  localStorage.setItem("students", JSON.stringify(students));
}, [students]);

  return (
    <AppContext.Provider value={{ students, setStudents }}>
      <BrowserRouter>
        <div className="app">
          <header className="header">
            <h1>Student Course Management</h1>
            <p>Manage students and their enrolled courses</p>
            <Navbar />
          </header>

          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/courses" element={<Courses />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;