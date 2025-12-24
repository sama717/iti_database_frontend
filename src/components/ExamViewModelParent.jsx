import { useState } from 'react';
import ExamViewer from './ExamViewer';
import ExamModelAnswer from './ExamModelAnswer';

function ExamComparisonView() {
    const [inputId, setInputId] = useState(""); 
    const [activeId, setActiveId] = useState(null); 

    const handleSearch = (e) => {
        e.preventDefault();
        setActiveId(inputId); 
    };

    return (
        <div>
            <form onSubmit={handleSearch} style={{ marginBottom: '30px', textAlign: 'center' }}>
                <input 
                    type="number" 
                    placeholder="Enter Exam ID" 
                    value={inputId} 
                    onChange={(e) => setInputId(e.target.value)} 
                />
                <button type="submit">View</button>
            </form>

            <div style={{ display: 'flex', gap: '20px' }}>
            
                <div style={{ flex: 2 }}>
                    <ExamViewer passedId={activeId} />
                </div>

                <div style={{ flex: 1 }}>
                    <ExamModelAnswer examId={activeId} />
                </div>

            </div>
        </div>
    );
}

export default ExamComparisonView;