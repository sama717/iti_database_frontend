import { Link, useLocation } from 'react-router-dom';
import LogoutButton from '../security/Logout';
import { LayoutDashboard, FilePlus, SquareKanban, UserRoundPen, School} from 'lucide-react';

function Navbar() {
    const userRole = localStorage.getItem("userRole");
    const location = useLocation();

    return (
        <div className='navbar-container'>
            <div className="navbar-wrapper">
                <div className="logo-container">
                    <img src="https://ci.suez.edu.eg/wp-content/uploads/2022/08/iti-logo.png" alt="ITI Logo" />
                </div>
                <nav className="nav-menu">
                    <ul className="nav-list">
                        {/* STAFF LINKS */}
                        {userRole === 'staff' && (
                            <>
                                <li className="nav-item">
                                    <Link to="/staff" className={location.pathname === '/staff' ? 'nav-link active-link' : 'nav-link'}>
                                        <span className="nav-icon"><LayoutDashboard /></span> Dashboard
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/staff/generate-exam" className={location.pathname === '/staff/generate-exam' ? 'nav-link active-link' : 'nav-link'}>
                                        <span className="nav-icon"><FilePlus /></span> Generate Exam
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/staff/view-exams" className={location.pathname.startsWith('/staff/view-exams') ? 'nav-link active-link' : 'nav-link'}>
                                        <span className="nav-icon"><SquareKanban /></span> Manage Exams
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/staff/manage-students" className={location.pathname.startsWith('/staff/manage-students') ? 'nav-link active-link' : 'nav-link'}>
                                        <span className="nav-icon"><UserRoundPen /></span> Manage Students
                                    </Link>
                                </li>
                            </>
                        )}

                        {/* STUDENT LINKS */}
                        {userRole === 'student' && (
                            <>
                                <li className="nav-item">
                                    <Link to="/student" className={location.pathname === '/student' ? 'nav-link active-link' : 'nav-link'}>
                                        <span className="nav-icon"><School /></span> Exam Portal
                                    </Link>
                                </li>
                               
                            </>
                        )}
                    </ul>
                </nav>
            </div>
            <div className="navbar-footer">
                <LogoutButton />
            </div>
        </div>
    );
}

export default Navbar;