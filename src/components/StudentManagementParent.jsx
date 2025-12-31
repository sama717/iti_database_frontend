import { Outlet, Link } from "react-router-dom";

function StudentManagementParent() {
  return (
    <div className="management-layout">
      <nav className="management-sidebar">
        <ul>
          <li><Link to="add-student">Add New Student</Link></li>
          <li><Link to="review-answers">Review Student Answers</Link></li>
          <li><Link to="get-grades">View Student Grades</Link></li>
        </ul>
      </nav>
      
      <main className="management-content">
        <Outlet />
      </main>
    </div>
  );
}

export default StudentManagementParent;