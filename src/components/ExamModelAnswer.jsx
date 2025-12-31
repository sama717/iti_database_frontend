import { useState, useEffect } from 'react';
import { api } from '../api/api'; 

function ExamModelAnswer({ examId }) { 
    const [answers, setAnswers] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnswers = async () => {
            if (!examId) return;

            try {
                setError(null);
                const response = await api.get(`/api/Exam/Get-Exam-Anwer-Model/${examId}`);
                
                if (response.data.isSuccess) {
                    setAnswers(response.data.value);
                } else {
                    setError("Exam ID not found in database.");
                }
            } catch (err) {
                console.error("BACKEND CRASH DETAILS:", err.response?.data);
                
                setError(err.response?.status === 500 
                    ? "Server Crash (500): Check your C# Backend logic." 
                    : "Failed to load answers.");
            }
        };

        fetchAnswers();
    }, [examId]);

    return (
        <div className="content-card" style={{ backgroundColor: '#fff', border: '1px solid #ddd' }}>
            <h2>Model Answer Key</h2>
            {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
            {answers ? (
                answers.map((ans, index) => (
                    <div key={index} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                        <p><strong>Q{index + 1}:</strong> {ans.answer}</p>
                    </div>
                ))
            ) : (!error && <p>Waiting for Exam ID...</p>)}
        </div>
    );
}

export default ExamModelAnswer;