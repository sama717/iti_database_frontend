import { NavLink, Outlet, useLocation } from "react-router-dom";
import "../style/studentmgmt.css";

function StudentManagementParent() {
    const location = useLocation();
    
    // UPDATED: This must match your path in App.js: "/staff/manage-students"
    const isParentPath = location.pathname.replace(/\/$/, '') === '/staff/manage-students';

    return (
        <div className="sm-management-wrapper">
            <div className="sm-nav-container">
                <NavLink 
                    to="add-student" 
                    className={({ isActive }) => isActive ? "sm-nav-btn active" : "sm-nav-btn"}
                >
                    Add New Student
                </NavLink>

                <NavLink 
                    to="review-answers" 
                    className={({ isActive }) => isActive ? "sm-nav-btn active" : "sm-nav-btn"}
                >
                    Review Student Answers
                </NavLink>

                <NavLink 
                    to="get-grades" 
                    className={({ isActive }) => isActive ? "sm-nav-btn active" : "sm-nav-btn"}
                >
                    View Student Grades
                </NavLink>
            </div>

            <div className="sm-view-content">
                {isParentPath ? (
                    /* This will now show because the path matches App.js */
                    <div className="sm-placeholder-card">
                        <p>Please select an option above to manage students or view results.</p>
                    </div>
                ) : (
                    <Outlet />
                )}
            </div>
        </div>
    );
}

export default StudentManagementParent;