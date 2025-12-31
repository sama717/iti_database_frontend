import { useState } from "react";
import { api } from '../api/api';
import "../style/examlist.css";

function GetAllExams() {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(false);

    const displayAllExams = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        try {
            // Added leading slash to match your other working calls
            const response = await api.get('/api/Exam/Get-All-Exams');
            
            if (response.data.isSuccess) {
                setExams(response.data.value); 
            }
        } catch (error) {
            console.error("Error fetching exams:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="exam-list-page">
            <div className="control-header">
                <button 
                    type="button" 
                    onClick={displayAllExams} 
                    className="fetch-btn" 
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Refresh Exam List"}
                </button>
            </div>

            <div className="table-container">
                {exams && exams.length > 0 ? (
                    <table className="exams-table">
                        <thead>
                            <tr>
                                <th>Exam ID</th>
                                <th>Course ID</th>
                                <th>Duration</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exams.map((exam) => (
                                <tr key={exam.examId}>
                                    <td>
                                        <span className="exam-id-badge">#{exam.examId}</span>
                                    </td>
                                    <td>{exam.courseId}</td>
                                    <td>{exam.examDuration} Minutes</td>
                                    <td>{new Date(exam.examDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="empty-state">
                        <p>No exams loaded. Click the button above to fetch all exams.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default GetAllExams;