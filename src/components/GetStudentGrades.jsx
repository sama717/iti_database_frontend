import { useState } from 'react';
import { api } from '../api/api';

function ViewStudentGrades() {
    const [examIdInput, setExamIdInput] = useState("");
    const [studentIdInput, setStudentIdInput] = useState("");
    
    const [displayExamId, setDisplayExamId] = useState("");
    const [displayStudentId, setDisplayStudentId] = useState("");

    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    // Helper to get Letter Grade and Badge Color
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
            // 1. Fetch the Grade Info (using your working endpoint)
            const gradeRes = await api.post('/api/Exam/Get-Student-Grade', {
                exam_id: Number(examIdInput),
                std_id: Number(studentIdInput)
            });

            // 2. Fetch the Student Answers (using your working endpoint)
            const reviewRes = await api.post('/api/Exam/Review-Student-Answers', {
                exam_id: Number(examIdInput),
                std_id: Number(studentIdInput)
            });

            if (gradeRes.data.isSuccess && reviewRes.data.isSuccess) {
                const totalQuestions = reviewRes.data.value.length; 
                const studentData = gradeRes.data.value;

                const formattedData = (Array.isArray(studentData) ? studentData : [studentData]).map(item => {
                    // Calculate Percentage
                    const percentage = totalQuestions > 0 ? (item.total_grade / totalQuestions) * 100 : 0;
                    const gradeDetails = getGradeInfo(percentage);

                    return {
                        ...item,
                        totalQuestions: totalQuestions,
                        percentage: percentage.toFixed(0), // Rounded percentage
                        letter: gradeDetails.letter,
                        gradeColor: gradeDetails.color
                    };
                });

                setGrades(formattedData);
                setDisplayExamId(examIdInput);
                setDisplayStudentId(studentIdInput);
            } else {
                setErrorMsg(gradeRes.data.message || "Failed to retrieve student records.");
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            setErrorMsg("No record found. Ensure the student took this exam.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <h2 style={{ color: '#8b0000', borderBottom: '2px solid #8b0000', paddingBottom: '10px' }}>
                View Student Grades
            </h2>

            <form onSubmit={fetchGrades} style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
                <input 
                    type="number" 
                    placeholder="Exam ID" 
                    value={examIdInput} 
                    onChange={(e) => setExamIdInput(e.target.value)} 
                    required 
                    style={{ padding: '10px', flex: 1, borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input 
                    type="number" 
                    placeholder="Student ID" 
                    value={studentIdInput} 
                    onChange={(e) => setStudentIdInput(e.target.value)} 
                    required 
                    style={{ padding: '10px', flex: 1, borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button type="submit" disabled={loading} style={{ padding: '10px 20px', backgroundColor: '#8b0000', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    {loading ? "Searching..." : "View Grade"}
                </button>
            </form>

            {errorMsg && (
                <div style={{ padding: '15px', backgroundColor: '#fff5f5', color: '#c53030', borderRadius: '8px', border: '1px solid #feb2b2', marginBottom: '20px' }}>
                    <strong>⚠️ Error:</strong> {errorMsg}
                </div>
            )}

            <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ backgroundColor: '#8b0000', color: 'white' }}>
                        <tr>
                            <th style={{ padding: '15px' }}>Student ID</th>
                            <th style={{ padding: '15px' }}>Full Name</th>
                            <th style={{ padding: '15px' }}>Course</th>
                            <th style={{ padding: '15px' }}>Score</th>
                            <th style={{ padding: '15px' }}>Percentage</th>
                            <th style={{ padding: '15px' }}>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grades.length > 0 ? (
                            grades.map((row, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '15px' }}>{row.std_id}</td>
                                    <td style={{ padding: '15px' }}>{row.fullName}</td>
                                    <td style={{ padding: '15px' }}>{row.crs_name}</td>
                                    <td style={{ padding: '15px' }}>
                                        {row.total_grade} / {row.totalQuestions}
                                    </td>
                                    <td style={{ padding: '15px', fontWeight: 'bold' }}>
                                        {row.percentage}%
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        <span style={{ 
                                            backgroundColor: row.gradeColor, 
                                            color: 'white', 
                                            padding: '4px 12px', 
                                            borderRadius: '15px', 
                                            fontWeight: 'bold',
                                            fontSize: '0.9rem' 
                                        }}>
                                            {row.letter}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
                                    Enter IDs to see results.
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