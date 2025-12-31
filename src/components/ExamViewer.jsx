import { useState, useEffect } from 'react';
import { api } from '../api/api';

function ExamViewer({ passedId }) {
    const [examData, setExamData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExam = async () => {
            if (!passedId) return;
            setLoading(true);
            setError(null);
            setExamData(null);

            try {
                const response = await api.get(`/api/Exam/Get-Exam/${passedId}`);
                if (response.data.isSuccess && response.data.value?.length > 0) {
                    setExamData(response.data.value);
                } else {
                    setError(`Error: Exam with ID ${passedId} not found.`);
                }
            } catch (err) {
                setError("Failed to fetch exam questions. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchExam();
    }, [passedId]);

    return (
        <div className="exam-card">
            <h2 className="section-title exam-title">Exam Questions</h2>

            {loading && <div className="status-msg">Loading exam data...</div>}
            {error && <div className="error-box">{error}</div>}
            {!passedId && !loading && <div className="status-msg">Enter an ID to view the question paper.</div>}

            {examData && (
                <div className="questions-list">
                    {examData.map((q, index) => (
                        <div key={q.q_id || index} className="question-item">
                            <span className="question-text">
                                <strong>Q{index + 1}:</strong> {q.q_text}
                            </span>
                            <div className="choices-grid">
                                {q.choice1 && <div className="choice-box">1. {q.choice1}</div>}
                                {q.choice2 && <div className="choice-box">2. {q.choice2}</div>}
                                {q.choice3 && <div className="choice-box">3. {q.choice3}</div>}
                                {q.choice4 && <div className="choice-box">4. {q.choice4}</div>}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ExamViewer;