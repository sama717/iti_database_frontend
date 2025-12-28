import { useState, useEffect } from 'react';

function ExamModelAnswer({ examId }) { 
    const [answers, setAnswers] = useState(null);

    useEffect(() => {
        if (examId) {
            fetch(`http://localhost:5183/api/Exam/Get-Exam-Anwer-Model/${examId}`)
                .then(res => res.json())
                .then(data => {
                    console.log("Full API Response:", data);
                    if (data.isSuccess) setAnswers(data.value);
                    else setAnswers(null);
                })
                .catch(err => console.error(err));
        }
    }, [examId]); 

    return (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <h2>Model Answer Key</h2>
            {answers ? (
                answers.map((ans, index) => (
                    <div key={index} style={{ marginBottom: '10px', borderBottom: '1px solid #ddd' }}>
                        <p><strong>Q{index + 1}:</strong> Correct Choice: {ans.answer}</p>
                    </div>
                ))
            ) : (
                <p>Enter an ID to see answers</p>
            )}
        </div>
    );
}

export default ExamModelAnswer;