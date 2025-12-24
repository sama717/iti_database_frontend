import ExamGenerator from "./ExamGenerator";
import { Link } from "react-router-dom";

function StaffPanel(){
    return(
        <div>
            <h1>Staff Panel</h1>
            <Link to="/staff/generate-exam">
                <div>
                    <h2>Generate Exam</h2>
                </div>
            </Link>
            <Link to="/staff/view-exams">
                <div>
                    <h2>View Exams</h2>
                </div>
            </Link>
        </div>
    )
}

export default StaffPanel;