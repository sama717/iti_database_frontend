import { useState } from 'react';
import { api } from '../api/api';
import "../style/examviewer.css";

function ExamViewer() {
    // Input Fields
    const [examId, setExamId] = useState("");
    const [studentId, setStudentId] = useState(""); 
    
    // Exam Data & Tracking
    const [examData, setExamData] = useState(null);
    const [allAnswers, setAllAnswers] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Custom Pop-up State
    const [modal, setModal] = useState(null);

    const handleFetchExam = async (e) => {
        if (e) e.preventDefault();
        
        if (!studentId || !examId) {
            setModal({ 
                type: 'error', 
                title: 'Invalid Entry', 
                message: "Please enter both your Student ID and Exam ID to begin." 
            });
            return;
        }

        try {
            // 1. PRE-FLIGHT VERIFICATION
            // We check if the student and exam exist by attempting a dummy answer
            try {
                await api.post('/api/Exam/Insert-Student-Answer', {
                    exam_id: Number(examId),
                    std_id: Number(studentId),
                    q_id: 0, 
                    std_choice: "VERIFY"
                });
            } catch (error) {
                if (error.response?.status === 404) {
                    setModal({ 
                        type: 'error', 
                        title: 'Invalid IDs', 
                        message: "The Student ID or Exam ID provided does not exist in our records." 
                    });
                    return;
                }
            }

            // 2. FETCH THE ACTUAL QUESTIONS
            const response = await api.get(`/api/Exam/Get-Exam/${examId}`);
            
            if (response.data.isSuccess && response.data.value) {
                setExamData(response.data.value);
                setAllAnswers({}); // Reset answer state for new exam
            } else {
                setModal({ 
                    type: 'error', 
                    title: 'Invalid Exam', 
                    message: "No questions found for this Exam ID. Please verify the ID." 
                });
            }

        } catch (error) {
            setModal({ 
                type: 'error', 
                title: 'Connection Error', 
                message: "Unable to reach the server. Please check your connection." 
            });
        }
    };

    const handleUpdateChoice = (qId, choice) => {
        setAllAnswers(prev => ({
            ...prev,
            [qId]: choice
        }));
    };

    const handleFinalSubmit = async () => {
        const totalQuestions = examData.length;
        const answeredCount = Object.keys(allAnswers).length;

        // Validation for incomplete exams
        if (answeredCount < totalQuestions) {
            if (!window.confirm(`You have only answered ${answeredCount}/${totalQuestions} questions. Are you sure you want to finish?`)) {
                return;
            }
        }

        setIsSubmitting(true);
        try {
            // Map over answers and send all POST requests
            const submissionPromises = Object.entries(allAnswers).map(([qId, choice]) => {
                return api.post('/api/Exam/Insert-Student-Answer', {
                    exam_id: Number(examId),
                    std_id: Number(studentId),
                    q_id: Number(qId),
                    std_choice: String(choice)
                });
            });

            await Promise.all(submissionPromises);
            
            setModal({ 
                type: 'success', 
                title: 'Submission Success', 
                message: "Well done! Your exam has been successfully recorded." 
            });
            
            // Clear exam to return to entry screen
            setExamData(null); 

        } catch (error) {
            setModal({ 
                type: 'error', 
                title: 'Submission Error', 
                message: "Something went wrong while saving your answers. Please try again." 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="ev-container">
            {/* --- CUSTOM POP-UP (MODAL) --- */}
            {modal && (
                <div className="ev-modal-overlay">
                    <div className={`ev-modal-content ${modal.type === 'success' ? 'ev-success-modal' : 'ev-error-modal'}`}>
                        <h3 style={{ color: modal.type === 'success' ? '#338450' : '#A0031B' }}>
                            {modal.title}
                        </h3>
                        <p>{modal.message}</p>
                        <button 
                            className={`ev-modal-btn ${modal.type === 'success' ? 'ev-success-btn' : 'ev-error-btn'}`}
                            onClick={() => setModal(null)}
                        >
                            {modal.type === 'success' ? 'Back to Portal' : 'Try Again'}
                        </button>
                    </div>
                </div>
            )}

            {/* --- ENTRY VIEW --- */}
            {!examData ? (
                <div className="ev-auth-card">
                    <h2 style={{ color: '#222' }}>Examination Portal</h2>
                    <p style={{ color: '#777', marginBottom: '30px' }}>Enter your details to access your exam session.</p>
                    
                    <form onSubmit={handleFetchExam}>
                        <div className="ev-input-group">
                            <div className="ev-field">
                                <label>Student ID</label>
                                <input 
                                    className="ev-input" 
                                    type="number" 
                                    value={studentId} 
                                    onChange={e => setStudentId(e.target.value)} 
                                    placeholder="e.g. 1001"
                                />
                            </div>
                            <div className="ev-field">
                                <label>Exam ID</label>
                                <input 
                                    className="ev-input" 
                                    type="number" 
                                    value={examId} 
                                    onChange={e => setExamId(e.target.value)} 
                                    placeholder="e.g. 15"
                                />
                            </div>
                        </div>
                        <button type="submit" className="ev-start-btn">Verify Entry & Begin</button>
                    </form>
                </div>
            ) : (
                /* --- ACTIVE EXAM VIEW --- */
                <div className="ev-active-exam">
                    <div className="ev-exam-header">
                        <div className="ev-info-badge">
                            Exam #{examId} | Student #{studentId}
                        </div>
                        <button onClick={() => setExamData(null)} className="ev-cancel-link">
                            Exit Exam
                        </button>
                    </div>

                    {examData.map((q, index) => (
                        <div key={q.q_id} className="ev-question-card">
                            <span className="ev-q-text">{index + 1}. {q.q_text}</span>
                            
                            {/* Option List */}
                            {[q.choice1, q.choice2, q.choice3, q.choice4].map((choice, i) => (
                                choice && (
                                    <label 
                                        key={i} 
                                        className={`ev-choice-label ${allAnswers[q.q_id] === choice ? 'selected' : ''}`}
                                    >
                                        <input
                                            type="radio"
                                            name={`q-${q.q_id}`}
                                            checked={allAnswers[q.q_id] === choice}
                                            onChange={() => handleUpdateChoice(q.q_id, choice)}
                                            style={{ cursor: 'pointer' }}
                                        /> 
                                        {choice}
                                    </label>
                                )
                            ))}
                        </div>
                    ))}

                    <button 
                        onClick={handleFinalSubmit}
                        disabled={isSubmitting}
                        className="ev-submit-btn"
                    >
                        {isSubmitting ? "Submitting Answers..." : "Submit Exam"}
                    </button>
                </div>
            )}
        </div>
    );
}

export default ExamViewer;