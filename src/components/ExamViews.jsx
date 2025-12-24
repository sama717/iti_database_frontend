import { Link, Outlet } from "react-router-dom";

function ExamViews() {
    return (
        <div>
            <Link to='get-exam'>
                <div>
                    <h2>Get Exam</h2>
                </div>
            </Link>
            <Link to='get-all-exams'>
                <div>
                    <h2>Get All Exams</h2>
                </div>
            </Link>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}

export default ExamViews