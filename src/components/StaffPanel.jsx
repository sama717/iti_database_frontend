import { Link } from "react-router-dom";
import { FilePlus, BookOpenCheck, UsersRound} from 'lucide-react';
import '../style/staffPanel.css'

function StaffPanel(){
    return(
        <div>
            <h2>Dashboard</h2>
            <div className="staff-container">
                <Link to="/staff/generate-exam">
                    <div className="box box-1">
                        <FilePlus className="box-svg-bg" />
                        <h3>Generate Exam</h3>
                        <p>Create new assessments</p>
                    </div>
                </Link>
                <Link to="/staff/view-exams">
                    <div className="box box-2">
                        <BookOpenCheck className="box-svg-bg" />
                        <h3>View Exams</h3>
                        <p>View assessments and their answers</p>
                    </div>
                </Link>
                <Link to="/staff/manage-students">
                    <div className="box box-3">
                        <UsersRound className="box-svg-bg" />
                        <h3>Manage Students</h3>
                        <p>Manage students in the system</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default StaffPanel;