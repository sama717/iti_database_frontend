import { useState } from 'react';
import { api } from '../api/api';
import "../style/addstudent.css";

function AddStudent() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        userName: '',
        fName: '',
        lName: '',
        phoneNumber: ''
    });
    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(null);
        try {
            const response = await api.post('/api/Authentication/Add-Student', formData);
            if (response.data.isSuccess) {
                setStatus({ type: 'success', msg: "Student registered successfully!" });
                setFormData({ email: '', password: '', userName: '', fName: '', lName: '', phoneNumber: '' });
            }
        } catch (error) {
            setStatus({ type: 'error', msg: "Failed to add student. Please check credentials." });
        }
    };

    return (
        <div className="ads-container">
            <h1 className="ads-title">Register New Student</h1>
            
            <form onSubmit={handleSubmit} className="ads-form">
                <div className="ads-form-group">
                    <label>First Name</label>
                    <input className="ads-input" name="fName" value={formData.fName} onChange={handleChange} placeholder="John" required />
                </div>
                
                <div className="ads-form-group">
                    <label>Last Name</label>
                    <input className="ads-input" name="lName" value={formData.lName} onChange={handleChange} placeholder="Last Name" required />
                </div>

                <div className="ads-form-group">
                    <label>Username</label>
                    <input className="ads-input" name="userName" value={formData.userName} onChange={handleChange} placeholder="Username" required />
                </div>

                <div className="ads-form-group">
                    <label>Phone Number</label>
                    <input className="ads-input" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" required />
                </div>

                <div className="ads-form-group">
                    <label>Email Address</label>
                    <input className="ads-input" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required />
                </div>

                <div className="ads-form-group">
                    <label>Password</label>
                    <input className="ads-input" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                </div>
                
                <div className="ads-full-width">
                    <button type="submit" className="ads-submit-btn">
                        Create Student Account
                    </button>
                    
                    {status && (
                        <div style={{ 
                            marginTop: '20px', 
                            padding: '15px', 
                            borderRadius: '10px',
                            textAlign: 'center',
                            backgroundColor: status.type === 'success' ? '#e6ffed' : '#fff1f0',
                            color: status.type === 'success' ? '#109356' : '#cf1322',
                            border: `1px solid ${status.type === 'success' ? '#b7eb8f' : '#ffa39e'}`
                        }}>
                            {status.msg}
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}

export default AddStudent;