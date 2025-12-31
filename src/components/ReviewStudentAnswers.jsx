import { useState } from 'react';
import { api } from '../api/api';

function ReviewStudentAnswers() {
    // Input states (change as the user types)
    const [examIdInput, setExamIdInput] = useState("");
    const [studentIdInput, setStudentIdInput] = useState("");
    
    // Display states (only change when the button is clicked and search is successful)
    const [displayExamId, setDisplayExamId] = useState("");
    const [displayStudentId, setDisplayStudentId] = useState("");
    
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [gradeData, setGradeData] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    const handleReview = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setReviews([]);
        setGradeData(null);
        setErrorMsg(""); 
        
        try {
            // 1. Fetch Detailed Answers
            const response = await api.post('/api/Exam/Review-Student-Answers', {
                exam_id: Number(examIdInput),
                std_id: Number(studentIdInput)
            });

            if (response.data.isSuccess && response.data.value.length > 0) {
                setReviews(response.data.value);
                // LOCK the display IDs only on success
                setDisplayExamId(examIdInput);
                setDisplayStudentId(studentIdInput);
            } else {
                setErrorMsg(response.data.message || "Invalid Student ID or Exam ID. Student may not have taken this exam.");
                return;
            }

            // 2. Fetch Grade Info
            const gradeRes = await api.post('/api/Exam/Get-Student-Grade', {
                exam_id: Number(examIdInput),
                std_id: Number(studentIdInput)
            });
            
            if (gradeRes.data.isSuccess) {
                setGradeData(gradeRes.data.value);
            }

        } catch (error) {
            console.error("Fetch Error:", error.response?.data);
            setErrorMsg("Connection error or unauthorized access.");
        } finally {
            setLoading(false);
        }
    };

    const correctCount = reviews.filter(r => r.is_correct).length;
    const totalQuestions = reviews.length;

    return (
        <div className="review-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <h2 style={{ color: '#8b0000', borderBottom: '2px solid #8b0000', paddingBottom: '10px' }}>
                Review Student Answers
            </h2>

            {/* Input Form */}
            <form onSubmit={handleReview} style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
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
                <button 
                    type="submit" 
                    disabled={loading} 
                    style={{ 
                        padding: '10px 20px', 
                        backgroundColor: '#8b0000', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    {loading ? "Searching..." : "View Results"}
                </button>
            </form>

            {/* Error Message */}
            {errorMsg && (
                <div style={{ padding: '15px', backgroundColor: '#fff5f5', color: '#c53030', borderRadius: '8px', border: '1px solid #feb2b2', marginBottom: '20px', textAlign: 'center' }}>
                    <strong>⚠️ Error:</strong> {errorMsg}
                </div>
            )}

            {/* Summary Header - Uses DISPLAY states, not INPUT states */}
            {reviews.length > 0 && (
                <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', marginBottom: '20px', border: '1px solid #dee2e6' }}>
                    <p style={{ margin: '5px 0' }}><strong>Student ID:</strong> {displayStudentId}</p>
                    <p style={{ margin: '5px 0' }}><strong>Exam ID:</strong> {displayExamId}</p>
                    <p style={{ margin: '10px 0 0', fontSize: '1.2rem', fontWeight: 'bold', color: '#8b0000' }}>
                        Final Grade: {correctCount} / {totalQuestions}
                    </p>
                </div>
            )}

            {/* Answer Breakdown */}
            <div className="answers-list">
                {reviews.map((item, index) => (
                    <div key={index} style={{ 
                        borderLeft: `8px solid ${item.is_correct ? '#28a745' : '#dc3545'}`,
                        padding: '15px', borderRadius: '4px', marginBottom: '15px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
                    }}>
                        <p style={{ marginBottom: '10px' }}><strong>Q{index + 1}:</strong> {item.q_text}</p>
                        <p style={{ margin: '5px 0' }}>
                            <strong>Student Answer:</strong> 
                            <span style={{ color: item.is_correct ? '#28a745' : '#dc3545', marginLeft: '10px', fontWeight: 'bold' }}>
                                {item.std_choice || "No Answer"}
                            </span>
                        </p>
                        <p style={{ margin: '5px 0' }}>
                            <strong>Model Answer:</strong> 
                            <span style={{ marginLeft: '10px', color: '#666' }}>{item.q_answer}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReviewStudentAnswers;