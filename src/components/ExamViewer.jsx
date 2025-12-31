import { useState, useEffect } from 'react';
import { api } from '../api/api';
import "../style/staffpanel.css"

function ExamViewer({ passedId }) {
    const [examData, setExamData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchExam = async () => {
            if (!passedId) return;

            setLoading(true);
            try {
                const response = await api.get(`/api/Exam/Get-Exam/${passedId}`);
                if (response.data.isSuccess) {
                    setExamData(response.data.value);
                } else {
                    setExamData(null);
                }
            } catch (error) {
                console.error("Fetch error:", error);
                setExamData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchExam();
    }, [passedId]);

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Questions View</h2>

            {loading && <p>Loading questions...</p>}

            {!passedId && <p>Please enter an ID above to see questions.</p>}

            {examData && (
                <div style={{ marginTop: '20px' }}>
                    {examData.map((q, index) => (
                        <div key={q.q_id} style={{ marginBottom: '20px', padding: '10px', borderBottom: '1px solid #eee' }}>
                            <p><strong>Q{index + 1}: {q.q_text}</strong></p>
                            <div style={{ paddingLeft: '20px', fontSize: '0.9em' }}>
                                {q.choice1 && <p>1) {q.choice1}</p>}
                                {q.choice2 && <p>2) {q.choice2}</p>}
                                {q.choice3 && <p>3) {q.choice3}</p>}
                                {q.choice4 && <p>4) {q.choice4}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ExamViewer;