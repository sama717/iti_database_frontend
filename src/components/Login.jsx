import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import "../style/login.css"

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        if (userRole === 'staff') {
            navigate('/staff', { replace: true });
        } else if (userRole === 'student') {
            navigate('/student', { replace: true });
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5183/api/Authentication/Sign-In', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok && data.isSuccess) {
                const user = data.value;

                localStorage.setItem('token', user.token);
                localStorage.setItem('userEmail', user.email);
                localStorage.setItem('userName', user.fName);

                if (user.email === "admin@SystemITI.com") {
                    localStorage.setItem('userRole', 'staff');
                    navigate('/staff');
                } else if (user.email === "student1@gmail.com") {
                    localStorage.setItem('userRole', 'student');
                    navigate('/student');
                }
            } else {
                alert(data.error?.discription || "Login Failed");
            }
        } catch (error) {
            alert("Connection Error. Check CORS in Program.cs and if API is running.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div className='container'>
                <div className='right-side-login'>
                    <h1>Information Technology Institute</h1>
                    <p>Building the next generation of tech leaders.</p>
                </div>
                <div className="left-side-login">
                    <div className='top-content'>
                        <img
                            src="https://ci.suez.edu.eg/wp-content/uploads/2022/08/iti-logo.png"
                            alt="ITI Logo"
                            style={{ width: '100px' }}
                        />
                        <h2>Welcome Back</h2>
                        <p>Access the ITI System Management Tool</p>
                    </div>
                    <form onSubmit={handleLogin} className='login-form'>
                        <label htmlFor="email">Email</label>
                        <input
                            name='email'
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                        />
                        <label htmlFor="pass">Password</label>
                        <input
                            name='pass'
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? "Connecting..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Login;