import { useState } from 'react';

function ExamGenerator() {
    const [crsId, setCrsId] = useState("");
    const [mcq, setMcq] = useState("");
    const [tf, setTf] = useState("");

    const handleGenerate = async (e) => {
        if (e) e.preventDefault();

        if (!crsId || (Number(mcq) + Number(tf) === 0)) {
            alert("Error: Please provide a Course ID and at least one question (MCQ or TF).");
            return;
        }

        const bodyToSend = {
            crs_id: Number(crsId),
            mcqNumber: Number(mcq),
            tfNumber: Number(tf)
        };

        try {
            const response = await fetch('http://localhost:5183/api/Exam/Generate-Exam', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyToSend)
            });
            const data = await response.json();
            alert(data.isSuccess ? "Success: Exam added to DB" : "Failed to generate");
        }
        catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleGenerate}>
                <h2>Staff Panel: Create Exam</h2>
                
                <label>Course ID: </label>
                <input 
                    type="number" 
                    min="1"
                    value={crsId} 
                    onChange={e => {
                        const val = e.target.value;
                        if (val === "" || Number(val) > 0) setCrsId(val);
                    }}
                />

                <label>MCQ Count: </label>
                <input 
                    type="number" 
                    min="0"
                    value={mcq} 
                    onChange={e => {
                        const val = e.target.value;
                        if (val === "" || Number(val) >= 0) setMcq(val);
                    }}
                />

                <label>TF Count: </label>
                <input 
                    type="number" 
                    min="0"
                    value={tf} 
                    onChange={e => {
                        const val = e.target.value;
                        if (val === "" || Number(val) >= 0) setTf(val);
                    }}
                />
                <button type="submit">Generate Exam</button>
            </form>
        </div>
    );
}

export default ExamGenerator;