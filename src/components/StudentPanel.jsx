import ExamViewStudent from "./ExamViewStudent";
import "../style/studentpanel.css";

function StudentPanel() {
    return (
        <div className="sp-dashboard-container">
            <header className="sp-welcome-header">
                <div className="sp-title-group">
                    <h2>Student Exam Portal</h2>
                    <p>Access your assigned exams.</p>
                </div>
            </header>

            <main className="sp-content-card">
                <ExamViewStudent />
            </main>
        </div>
    );
}

export default StudentPanel;