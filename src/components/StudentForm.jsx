function StudentForm({
  studentName,
  setStudentName,
  course,
  setCourse,
  courses,
  onSubmit,
}) {
  return (
    <section className="form-section">
      <h2>Add New Student</h2>

      <form onSubmit={onSubmit}>
        <label htmlFor="studentName">Student Name</label>

        <input
          id="studentName"
          type="text"
          placeholder="Enter student name"
          value={studentName}
          onChange={(event) => setStudentName(event.target.value)}
          required
        />

        <label htmlFor="course">Select Course</label>

        <select
          id="course"
          value={course}
          onChange={(event) => setCourse(event.target.value)}
        >
          {courses.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>

        <button type="submit">Add Student</button>
      </form>
    </section>
  );
}

export default StudentForm;