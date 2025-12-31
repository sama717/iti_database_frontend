import { useState } from 'react';
import { api } from '../api/api';

function ExamViewer() {
    const [examId, setExamId] = useState("");
    const [studentId, setStudentId] = useState(""); 
    const [examData, setExamData] = useState(null);
    // Store all answers here: { questionId: "selectedChoice" }
    const [allAnswers, setAllAnswers] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFetchExam = async (e) => {
    if (e) e.preventDefault();
    if (!studentId || !examId) return alert("Please enter both IDs.");

    try {
        // 1. PRE-FLIGHT CHECK
        // We attempt to send a dummy answer. 
        // If the student doesn't exist, the backend sends 404.
        try {
            await api.post('api/Exam/Insert-Student-Answer', {
                exam_id: Number(examId),
                std_id: Number(studentId),
                q_id: 0, 
                std_choice: "CHECK"
            });
        } catch (error) {
            // Check for the 404 we saw in your logs
            if (error.response?.status === 404) {
                return alert("Verification Failed: Student or Exam not found in database.");
            }
            // If it's a 400 (Bad Request), that's actually GOOD—it means 
            // the server found the Student but disliked the 'q_id: 0'.
        }

        // 2. FETCH EXAM DATA
        const response = await api.get(`api/Exam/Get-Exam/${examId}`);
        
        if (response.data.isSuccess && response.data.value) {
            setExamData(response.data.value);
            setAllAnswers({}); // Clear old answers
            alert("Verification successful. Good luck!");
        } else {
            alert("Could not load exam data.");
        }

    } catch (error) {
        console.error("General Error:", error);
        alert("Server error. Please check your connection.");
    }
};

    // This just updates our local React state
    const handleUpdateLocalChoice = (qId, choice) => {
        setAllAnswers(prev => ({
            ...prev,
            [qId]: choice
        }));
    };

    const handleFinalSubmit = async () => {
        const totalQuestions = examData.length;
        const answeredCount = Object.keys(allAnswers).length;

        if (answeredCount < totalQuestions) {
            if (!window.confirm(`You only answered ${answeredCount}/${totalQuestions} questions. Submit anyway?`)) {
                return;
            }
        }

        setIsSubmitting(true);
        try {
            // Loop through the state and send each answer
            const submissionPromises = Object.entries(allAnswers).map(([qId, choice]) => {
                return api.post('api/Exam/Insert-Student-Answer', {
                    exam_id: Number(examId),
                    std_id: Number(studentId),
                    q_id: Number(qId),
                    std_choice: String(choice)
                });
            });

            await Promise.all(submissionPromises);
            alert("All answers submitted successfully!");
            setExamData(null); // Optional: Clear exam after success
        } catch (error) {
            console.error(error.response?.data);
            alert("Error submitting answers. Please check the console.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            {/* INPUT SECTION */}
            {!examData && (
                <form onSubmit={handleFetchExam} style={{ background: '#f9f9f9', padding: '20px', borderRadius: '10px' }}>
                    <h2>Enter Exam Details</h2>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <div style={{ flex: 1 }}>
                            <label>Student ID:</label>
                            <input type="number" style={{ width: '100%', padding: '8px' }} value={studentId} onChange={e => setStudentId(e.target.value)} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label>Exam ID:</label>
                            <input type="number" style={{ width: '100%', padding: '8px' }} value={examId} onChange={e => setExamId(e.target.value)} />
                        </div>
                    </div>
                    <button type="submit" style={{ width: '100%', padding: '10px' }}>Start Exam</button>
                </form>
            )}

            {/* QUESTIONS SECTION */}
            {examData && (
                <div style={{ marginTop: '30px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3>Exam: {examId} | Student: {studentId}</h3>
                        <button onClick={() => setExamData(null)} style={{ color: 'red' }}>Cancel</button>
                    </div>

                    {examData.map((q, index) => (
                        <div key={q.q_id} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
                            <p><strong>{index + 1}. {q.q_text}</strong></p>
                            {/* Radio Group */}
                            {[q.choice1, q.choice2, q.choice3, q.choice4].map((choice, i) => (
                                choice && (
                                    <label key={i} style={{ display: 'block', margin: '5px 0' }}>
                                        <input
                                            type="radio"
                                            name={`q-${q.q_id}`}
                                            checked={allAnswers[q.q_id] === choice}
                                            onChange={() => handleUpdateLocalChoice(q.q_id, choice)}
                                        /> {choice}
                                    </label>
                                )
                            ))}
                        </div>
                    ))}

                    <button 
                        onClick={handleFinalSubmit}
                        disabled={isSubmitting}
                        style={{ 
                            width: '100%', 
                            padding: '15px', 
                            fontSize: '18px', 
                            backgroundColor: '#28a745', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        {isSubmitting ? "Submitting..." : "Finish and Submit Exam"}
                    </button>
                </div>
            )}
        </div>
    );
}

export default ExamViewer;