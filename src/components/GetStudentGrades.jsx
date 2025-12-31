import { useState } from 'react';
import { api } from '../api/api';
import "../style/viewgrades.css";

function ViewStudentGrades() {
    const [examIdInput, setExamIdInput] = useState("");
    const [studentIdInput, setStudentIdInput] = useState("");
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const getGradeInfo = (percentage) => {
        if (percentage >= 85) return { letter: 'A', color: '#28a745' };
        if (percentage >= 75) return { letter: 'B', color: '#17a2b8' };
        if (percentage >= 65) return { letter: 'C', color: '#ffc107' };
        if (percentage >= 50) return { letter: 'D', color: '#fd7e14' };
        return { letter: 'F', color: '#dc3545' };
    };

    const fetchGrades = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setErrorMsg("");
        setGrades([]);

        try {
            const gradeRes = await api.post('/api/Exam/Get-Student-Grade', {
                exam_id: Number(examIdInput),
                std_id: Number(studentIdInput)
            });

            const reviewRes = await api.post('/api/Exam/Review-Student-Answers', {
                exam_id: Number(examIdInput),
                std_id: Number(studentIdInput)
            });

            if (gradeRes.data.isSuccess && reviewRes.data.isSuccess) {
                const totalQuestions = reviewRes.data.value.length; 
                const studentData = gradeRes.data.value;

                const formattedData = (Array.isArray(studentData) ? studentData : [studentData]).map(item => {
                    const percentage = totalQuestions > 0 ? (item.total_grade / totalQuestions) * 100 : 0;
                    const gradeDetails = getGradeInfo(percentage);

                    return {
                        ...item,
                        totalQuestions,
                        percentage: percentage.toFixed(0),
                        letter: gradeDetails.letter,
                        gradeColor: gradeDetails.color
                    };
                });

                setGrades(formattedData);
            } else {
                setErrorMsg(gradeRes.data.message || "Records not found.");
            }
        } catch (error) {
            setErrorMsg("No record found. Please verify the IDs.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="vsg-container">
            <h2 className="vsg-title">View Student Performance</h2>

            <form onSubmit={fetchGrades} className="vsg-search-form">
                <input 
                    type="number" 
                    placeholder="Exam ID" 
                    className="vsg-input"
                    value={examIdInput} 
                    onChange={(e) => setExamIdInput(e.target.value)} 
                    required 
                />
                <input 
                    type="number" 
                    placeholder="Student ID" 
                    className="vsg-input"
                    value={studentIdInput} 
                    onChange={(e) => setStudentIdInput(e.target.value)} 
                    required 
                />
                <button type="submit" className="vsg-search-btn" disabled={loading}>
                    {loading ? "Searching..." : "View Grade"}
                </button>
            </form>

            {errorMsg && (
                <div style={{ padding: '15px', backgroundColor: '#fff1f0', color: '#cf1322', borderRadius: '10px', marginBottom: '20px', border: '1px solid #ffa39e', textAlign: 'center' }}>
                    <strong>⚠️</strong> {errorMsg}
                </div>
            )}

            <div className="vsg-table-wrapper">
                <table className="vsg-table">
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Full Name</th>
                            <th>Course</th>
                            <th>Score</th>
                            <th>Percentage</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grades.length > 0 ? (
                            grades.map((row, index) => (
                                <tr key={index}>
                                    <td>#{row.std_id}</td>
                                    <td>{row.fullName}</td>
                                    <td>{row.crs_name}</td>
                                    <td>{row.total_grade} / {row.totalQuestions}</td>
                                    <td style={{ fontWeight: 'bold' }}>{row.percentage}%</td>
                                    <td>
                                        <span className="vsg-badge" style={{ backgroundColor: row.gradeColor }}>
                                            {row.letter}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="vsg-empty">
                                    Enter IDs to fetch results.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewStudentGrades;