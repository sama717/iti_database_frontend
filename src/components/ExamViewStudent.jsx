import { useState } from 'react';

function ExamViewer() {
    const [examId, setExamId] = useState("");
    const [examData, setExamData] = useState(null);

    const handleFetchExam = async (e) => {
        if (e) e.preventDefault();

        if (!examId) {
            alert("Please enter an Exam ID");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5183/api/Exam/Get-Exam/${examId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();

            if (data.isSuccess) {
                setExamData(data.value);
            } else {
                alert("Exam not found");
                setExamData(null);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ marginTop: '20px', borderTop: '2px solid #ccc' }}>
            <form onSubmit={handleFetchExam}>
                <h2>Student Panel: View Exam</h2>
                <label>Enter Exam ID: </label>
                <input
                    type="number"
                    value={examId}
                    onChange={e => {
                        const val = e.target.value;
                        if (val === "" || Number(val) > 0) setExamId(val);
                    }}
                />
                <button type="submit">Load Exam</button>
            </form>

            {examData && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Exam Questions</h3>
                    {examData.map((q, index) => (
                        <div key={q.q_id} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
                            <p><strong>Q{index + 1}: {q.q_text}</strong></p>
                            <div style={{ paddingLeft: '20px' }}>
                                {q.choice1 && <p>{q.choice1}</p>}
                                {q.choice2 && <p>{q.choice2}</p>}
                                {q.choice3 && <p>{q.choice3}</p>}
                                {q.choice4 && <p>{q.choice4}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ExamViewer;