import { useState } from "react";
import { api } from '../api/api';

function GetAllExams() {
    const [exams, setExams] = useState([]);

    const displayAllExams = async (e) => {
        e.preventDefault();
        try {
            const response = await api.get('api/Exam/Get-All-Exams');
            const data = response.data; 
            
            if (data.isSuccess) {
                setExams(data.value); 
            }
        } catch (error) {
            console.error("Error fetching exams:", error);
        }
    }

    return (
        <div>
            <form onSubmit={displayAllExams}>
                <button type="submit">Display All Exams</button>
            </form>

            <div style={{ marginTop: '20px' }}>
                {exams.length > 0 ? (
                    exams.map((exam) => (
                        <div key={exam.examId} style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
                            <p><strong>Exam ID:</strong> {exam.examId}</p>
                            <p><strong>Course ID:</strong> {exam.courseId}</p>
                            <p><strong>Duration:</strong> {exam.examDuration} mins</p>
                            <p><strong>Date:</strong> {new Date(exam.examDate).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p>No exams to display. Click the button above.</p>
                )}
            </div>
        </div>
    )
}

export default GetAllExams;