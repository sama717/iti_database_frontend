import { useState } from 'react';
import { api } from '../api/api';
import "../style/examgen.css";

function ExamGenerator() {
    const [crsId, setCrsId] = useState("");
    const [mcq, setMcq] = useState("");
    const [tf, setTf] = useState("");
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState(null); 

    const handleGenerate = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setNotification(null);

        const bodyToSend = {
            Crs_id: Number(crsId),
            McqNumber: Number(mcq),
            TfNumber: Number(tf)
        };

        try {
            const response = await api.post('/api/Exam/Generate-Exam', bodyToSend);
            if (response.data.isSuccess) {
                setNotification({ type: 'success', message: "Exam Generated Successfully!" });
                setCrsId(""); setMcq(""); setTf("");
            } else {
                setNotification({ type: 'error', message: "Failed: " + response.data.message });
            }
        } catch (error) {
            setNotification({ type: 'error', message: "Please check your inputs and try again." });
        } finally {
            setLoading(false);
            setTimeout(() => setNotification(null), 5000);
        }
    };

    return (
        <div className="exam-gen-container">
            <h2 className="exam-gen-header">Generate New Exam</h2>
            
            <form onSubmit={handleGenerate} className="exam-gen-form">
                <div className="gen-input-group">
                    <label>Course Identification</label>
                    <input 
                        type="number" 
                        placeholder="Enter Course ID" 
                        className="exam-gen-input"
                        value={crsId} 
                        onChange={e => setCrsId(e.target.value)} 
                        required 
                    />
                </div>

                <div className="gen-input-group">
                    <label>MCQ Questions</label>
                    <input 
                        type="number" 
                        placeholder="Number of Multiple Choice" 
                        className="exam-gen-input"
                        value={mcq} 
                        onChange={e => setMcq(e.target.value)} 
                        required
                    />
                </div>

                <div className="gen-input-group">
                    <label>True / False Questions</label>
                    <input 
                        type="number" 
                        placeholder="Number of T/F Questions" 
                        className="exam-gen-input"
                        value={tf} 
                        onChange={e => setTf(e.target.value)} 
                        required
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="exam-gen-btn"
                >
                    {loading ? "Generating..." : "Generate Exam"}
                </button>
            </form>

            {/* In-UI Pop-up Notification */}
            {notification && (
                <div className={`gen-notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}
        </div>
    );
}

export default ExamGenerator;