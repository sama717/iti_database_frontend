import { useState } from 'react';
import { api } from '../api/api';

function ExamGenerator() {
    const [crsId, setCrsId] = useState("");
    const [mcq, setMcq] = useState("");
    const [tf, setTf] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    // Try PascalCase to satisfy the C# backend DTO
    const bodyToSend = {
        Crs_id: Number(crsId),
        McqNumber: Number(mcq),
        TfNumber: Number(tf)
    };

    try {
        const response = await api.post('/api/Exam/Generate-Exam', bodyToSend);
        if (response.data.isSuccess) {
            alert("🎉 Exam Generated Successfully!");
            setCrsId(""); setMcq(""); setTf("");
        } else {
            alert("Generation Failed: " + response.data.message);
        }
    } catch (error) {
        console.error("SERVER ERROR:", error.response?.data || error.message);
        alert("The server is still missing the Course ID parameter. Your developer needs to check the mapping in examProcRepository.cs.");
    } finally {
        setLoading(false);
    }
};

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h2 style={{ color: '#8b0000', borderBottom: '2px solid #8b0000' }}>Generate Exam</h2>
            <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                <input 
                    type="number" 
                    placeholder="Course ID" 
                    value={crsId} 
                    onChange={e => setCrsId(e.target.value)} 
                    style={inputStyle} 
                    required 
                />
                <input 
                    type="number" 
                    placeholder="MCQ Number" 
                    value={mcq} 
                    onChange={e => setMcq(e.target.value)} 
                    style={inputStyle} 
                />
                <input 
                    type="number" 
                    placeholder="T/F Number" 
                    value={tf} 
                    onChange={e => setTf(e.target.value)} 
                    style={inputStyle} 
                />
                <button 
                    type="submit" 
                    disabled={loading}
                    style={{ backgroundColor: '#8b0000', color: 'white', padding: '10px', cursor: 'pointer', border: 'none', borderRadius: '4px' }}
                >
                    {loading ? "Processing..." : "Execute Generation"}
                </button>
            </form>
        </div>
    );
}

const inputStyle = { padding: '10px', borderRadius: '4px', border: '1px solid #ccc' };

export default ExamGenerator;