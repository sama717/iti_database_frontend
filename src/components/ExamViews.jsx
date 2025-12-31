import { Link, Outlet, useLocation } from "react-router-dom";

function ExamViews() {
    const location = useLocation();
    const isParentPath = location.pathname === '/staff/view-exams' || location.pathname === '/staff/view-exams/';

    return (
        <div>
            <div className="exam-nav-links" style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <Link to='get-exam'>Get Exam</Link>
                <Link to='get-all-exams'>Get All Exams</Link>
                <Link to='get-exam-stats'>Get Exam Stats</Link>
            </div>

            <div className="view-content-area">
                {isParentPath ? (
                    <div className="placeholder-message">
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