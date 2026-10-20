import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navigation">
      <NavLink to="/">Dashboard</NavLink>
      <NavLink to="/students">Students</NavLink>
      <NavLink to="/courses">Courses</NavLink>
    </nav>
  );
}

export default Navbar;