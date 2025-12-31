import { useState } from 'react';
import { api } from '../api/api';
import "../style/reviewanswers.css";

function ReviewStudentAnswers() {
    const [examIdInput, setExamIdInput] = useState("");
    const [studentIdInput, setStudentIdInput] = useState("");
    const [displayExamId, setDisplayExamId] = useState("");
    const [displayStudentId, setDisplayStudentId] = useState("");
    
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleReview = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setReviews([]);
        setErrorMsg(""); 
        
        try {
            const response = await api.post('/api/Exam/Review-Student-Answers', {
                exam_id: Number(examIdInput),
                std_id: Number(studentIdInput)
            });

            if (response.data.isSuccess && response.data.value.length > 0) {
                setReviews(response.data.value);
                setDisplayExamId(examIdInput);
                setDisplayStudentId(studentIdInput);
            } else {
                setErrorMsg("No records found for this Student/Exam combination.");
            }
        } catch (error) {
            setErrorMsg("Server error. Please verify IDs and try again.");
        } finally {
            setLoading(false);
        }
    };

    const correctCount = reviews.filter(r => r.is_correct).length;

    return (
        <div className="rsa-container">
            <h2 className="rsa-title">Review Student Submissions</h2>

            <form onSubmit={handleReview} className="rsa-search-form">
                <input 
                    type="number" 
                    placeholder="Enter Exam ID" 
                    className="rsa-input"
                    value={examIdInput} 
                    onChange={(e) => setExamIdInput(e.target.value)} 
                    required 
                />
                <input 
                    type="number" 
                    placeholder="Enter Student ID" 
                    className="rsa-input"
                    value={studentIdInput} 
                    onChange={(e) => setStudentIdInput(e.target.value)} 
                    required 
                />
                <button type="submit" className="rsa-view-btn" disabled={loading}>
                    {loading ? "Searching..." : "View Results"}
                </button>
            </form>

            {errorMsg && (
                <div style={{ padding: '15px', backgroundColor: '#fff1f0', color: '#cf1322', borderRadius: '10px', textAlign: 'center', marginBottom: '20px', border: '1px solid #ffa39e' }}>
                    <strong>⚠️</strong> {errorMsg}
                </div>
            )}

            {reviews.length > 0 && (
                <div className="rsa-summary-card">
                    <p><strong>Reviewing Record:</strong> Student #{displayStudentId} | Exam #{displayExamId}</p>
                    <div className="rsa-grade-text">
                        Final Score: {((correctCount / reviews.length) * 100).toFixed(1)}% ({correctCount}/{reviews.length})
                    </div>
                </div>
            )}

            <div className="rsa-list">
                {reviews.map((item, index) => (
                    <div key={index} className={`rsa-answer-card ${item.is_correct ? 'rsa-correct' : 'rsa-wrong'}`}>
                        <span className="rsa-q-text">Q{index + 1}: {item.q_text}</span>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <p style={{ margin: '4px 0' }}>
                                    <span style={{ color: '#666' }}>Student:</span> 
                                    <strong style={{ marginLeft: '10px', color: item.is_correct ? '#338450' : '#A0031B' }}>
                                        {item.std_choice || "No Answer"}
                                    </strong>
                                </p>
                                <p style={{ margin: '4px 0' }}>
                                    <span style={{ color: '#666' }}>Model:</span> 
                                    <span style={{ marginLeft: '10px' }}>{item.q_answer}</span>
                                </p>
                            </div>
                            <span className="rsa-status-label" style={{ color: item.is_correct ? '#338450' : '#A0031B' }}>
                                {item.is_correct ? "✓ Correct" : "✗ Incorrect"}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReviewStudentAnswers;