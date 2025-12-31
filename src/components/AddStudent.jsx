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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/Authentication/Add-Student', formData);
            
            if (response.data.isSuccess) {
                alert("Student added successfully!");
                setFormData({ email: '', password: '', userName: '', fName: '', lName: '', phoneNumber: '' });
            }
        } catch (error) {
            console.error("Add Student Error:", error.response?.data || error.message);
            alert("Failed to add student. Check console for details.");
        }
    };

    return (
        <div className="add-student-container">
            <h1>Add Student</h1>
            <form onSubmit={handleSubmit} className="add-student-form">
                <div className="form-group">
                    <label>First Name</label>
                    <input name="fName" value={formData.fName} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                    <label>Last Name</label>
                    <input name="lName" value={formData.lName} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Username</label>
                    <input name="userName" value={formData.userName} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input name="password" type="password" value={formData.password} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Phone Number</label>
                    <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                </div>
                
                <button type="submit" className="submit-btn">
                    Register Student
                </button>
            </form>
        </div>
    );
}

export default AddStudent;