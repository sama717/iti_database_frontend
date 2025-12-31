import { useState, useEffect } from 'react';
import { api } from '../api/api';

function ExamModelAnswer({ examId }) { 
    const [answers, setAnswers] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnswers = async () => {
            if (!examId) return;
            setError(null);
            setAnswers(null);

            try {
                const response = await api.get(`/api/Exam/Get-Exam-Anwer-Model/${examId}`);
                if (response.data.isSuccess && response.data.value?.length > 0) {
                    setAnswers(response.data.value);
                } else {
                    setError("Answer model missing.");
                }
            } catch (err) {
                setError("Failed to fetch answers.");
            }
        };
        fetchAnswers();
    }, [examId]);

    return (
        <div className="exam-card">
            <h2 className="section-title answer-title">Model Answer</h2>
            
            {error && <div className="error-box">{error}</div>}
            
            {answers ? (
                <div className="answers-list">
                    {answers.map((ans, index) => (
                        <div key={index} className="answer-row">
                            <span className="ans-label">Q{index + 1}</span>
                            <span className="ans-text">{ans.answer}</span>
                        </div>
                    ))}
                </div>
            ) : (!error && <div className="status-msg">---</div>)}
        </div>
    );
}

export default ExamModelAnswer;