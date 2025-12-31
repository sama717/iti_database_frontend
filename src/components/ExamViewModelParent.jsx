import { useState } from 'react';
import ExamViewer from './ExamViewer';
import ExamModelAnswer from './ExamModelAnswer';
import "../style/examviewstaff.css";

function ExamComparisonView() {
    const [inputId, setInputId] = useState("");
    const [activeId, setActiveId] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        if (inputId) setActiveId(inputId);
    };

    return (
        <div className="exam-comp-page">
            <form onSubmit={handleSearch} className="search-container">
                <div className="search-group">
                    <label className="search-label">Search Exam ID:</label>
                    <input
                        className="search-input"
                        type="number"
                        placeholder="Enter exam ID"
                        value={inputId}
                        onChange={(e) => setInputId(e.target.value)}
                    />
                </div>
                <button type="submit" className="search-button">View Exam</button>
            </form>

            <div className="comparison-grid">
                <div className="questions-column">
                    <ExamViewer passedId={activeId} />
                </div>
                <div className="answers-column">
                    <ExamModelAnswer examId={activeId} />
                </div>
            </div>
        </div>
    );
}

export default ExamComparisonView;