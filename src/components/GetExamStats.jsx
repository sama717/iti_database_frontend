import { useState } from 'react';
import { api } from '../api/api';

function ExamStatistics() {
    const [examIdInput, setExamIdInput] = useState("");
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const fetchStatistics = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setErrorMsg("");
        setStats(null);

        try {
            const response = await api.post('/api/Exam/Get-Exam-Statistic', {
                exam_id: Number(examIdInput)
            });

            console.log("Stats Response:", response.data);

            if (response.data.isSuccess) {
                // The data is inside response.data.value
                setStats(response.data.value);
            } else {
                setErrorMsg(response.data.message || "No statistics found.");
            }
        } catch (error) {
            console.error("Stats Error:", error);
            setErrorMsg("Failed to load statistics.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <h2 style={{ color: '#8b0000', borderBottom: '2px solid #8b0000', paddingBottom: '10px' }}>
                Exam Performance Statistics
            </h2>

            <form onSubmit={fetchStatistics} style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
                <input 
                    type="number" 
                    placeholder="Enter Exam ID" 
                    value={examIdInput} 
                    onChange={(e) => setExamIdInput(e.target.value)} 
                    required 
                    style={{ padding: '10px', flex: 1, borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button type="submit" disabled={loading} style={{ padding: '10px 20px', backgroundColor: '#8b0000', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    {loading ? "Loading..." : "Get Stats"}
                </button>
            </form>

            {errorMsg && <div style={{ color: '#dc3545', marginBottom: '20px' }}>{errorMsg}</div>}

            {stats && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                    {/* Average Card */}
                    <div style={cardStyle}>
                        <h4 style={labelStyle}>Average Score</h4>
                        <p style={valueStyle}>{stats.average}%</p>
                    </div>

                    {/* Highest Card */}
                    <div style={cardStyle}>
                        <h4 style={labelStyle}>Highest Score</h4>
                        <p style={{ ...valueStyle, color: '#28a745' }}>{stats.highest}%</p>
                    </div>

                    {/* Lowest Card */}
                    <div style={cardStyle}>
                        <h4 style={labelStyle}>Lowest Score</h4>
                        <p style={{ ...valueStyle, color: '#dc3545' }}>{stats.lowest}%</p>
                    </div>

                    {/* Total Students Card */}
                    <div style={cardStyle}>
                        <h4 style={labelStyle}>Total Participants</h4>
                        <p style={valueStyle}>{stats.total_students}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

const cardStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
    borderTop: '4px solid #8b0000'
};

const labelStyle = { margin: '0', color: '#666', fontSize: '0.9rem', textTransform: 'uppercase' };

const valueStyle = {
    fontSize: '2.2rem',
    fontWeight: 'bold',
    margin: '10px 0 0 0',
    color: '#333'
};

export default ExamStatistics;