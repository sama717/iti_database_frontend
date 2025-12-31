import { NavLink, Outlet, useLocation } from "react-router-dom";
import "../style/examnav.css";

function ExamViews() {
    const location = useLocation();
    
    // Normalize path check to handle trailing slashes
    const isParentPath = location.pathname.replace(/\/$/, '') === '/staff/view-exams';

    return (
        <div className="exam-management-wrapper">
            <div className="exam-nav-container">
                {/* Use 'end' to ensure it only matches the specific sub-route */}
                <NavLink 
                    to="get-exam" 
                    className={({ isActive }) => isActive ? "exam-nav-btn active" : "exam-nav-btn"}
                >
                    Get Exam
                </NavLink>

                <NavLink 
                    to="get-all-exams" 
                    className={({ isActive }) => isActive ? "exam-nav-btn active" : "exam-nav-btn"}
                >
                    Get All Exams
                </NavLink>

                <NavLink 
                    to="get-exam-stats" 
                    className={({ isActive }) => isActive ? "exam-nav-btn active" : "exam-nav-btn"}
                >
                    Get Exam Stats
                </NavLink>
            </div>

            <div className="view-content-area">
                {isParentPath ? (
                    <div className="placeholder-card">
                        <p>Please select an option above to manage exams or view performance statistics.</p>
                    </div>
                ) : (
                    <Outlet />
                )}
            </div>
        </div>
    );
}

export default ExamViews;