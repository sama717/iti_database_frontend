import { useState } from 'react';
import { api } from '../api/api';
import { TrendingUp, Trophy, AlertCircle, Users } from 'lucide-react';
import "../style/examstats.css";

function ExamStatistics() {
    const [examIdInput, setExamIdInput] = useState("");
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const fetchStatistics = async (e) => {
        if (e) e.preventDefault();
        
        // --- CLEAR PREVIOUS DATA ---
        setStats(null); 
        setErrorMsg("");
        setLoading(true);

        try {
            const response = await api.post('/api/Exam/Get-Exam-Statistic', {
                exam_id: Number(examIdInput)
            });

            if (response.data.isSuccess) {
                setStats(response.data.value);
            } else {
                // Previous cards are already cleared above
                setErrorMsg(response.data.message || "Exam statistics not found.");
            }
        } catch (error) {
            setErrorMsg("Connection error: Failed to reach the server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="stats-page-container">
            <h2 className="stats-header">Exam Statistics</h2>

            <form onSubmit={fetchStatistics} className="stats-search-form">
                <input 
                    type="number" 
                    className="stats-input"
                    placeholder="Search Exam ID..." 
                    value={examIdInput} 
                    onChange={(e) => setExamIdInput(e.target.value)} 
                    required 
                />
                <button type="submit" disabled={loading} className="stats-btn">
                    {loading ? "..." : "Analyze"}
                </button>
            </form>

            {/* Error banner shows alone because stats was reset to null */}
            {errorMsg && <div className="error-banner">{errorMsg}</div>}

            {stats && (
                <div className="stats-grid">
                    <div className="stats-card card-avg">
                        <TrendingUp className="card-icon-bg" size={100} />
                        <p className="stats-label">Average Score</p>
                        <h3 className="stats-value">{stats.average}%</h3>
                    </div>

                    <div className="stats-card card-high">
                        <Trophy className="card-icon-bg" size={100} />
                        <p className="stats-label">Highest Score</p>
                        <h3 className="stats-value high">{stats.highest}%</h3>
                    </div>

                    <div className="stats-card card-low">
                        <AlertCircle className="card-icon-bg" size={100} />
                        <p className="stats-label">Lowest Score</p>
                        <h3 className="stats-value low">{stats.lowest}%</h3>
                    </div>

                    <div className="stats-card card-total">
                        <Users className="card-icon-bg" size={100} />
                        <p className="stats-label">Total Students</p>
                        <h3 className="stats-value">{stats.total_students}</h3>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ExamStatistics;