import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DUMMY_USERS } from '../data/users';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = function (e) {
        e.preventDefault();

        const user = DUMMY_USERS.find((u) => {
            if (u.username === username && u.password === password) {
                return true;
            } else {
                return false;
            }
        });

        if (user) {
            localStorage.setItem("userRole", user.role);
            if (user.role === "staff") {
                navigate("/staff");
            } else {
                navigate("/student");
            }
        } else {
            alert("Invalid username or password");
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
export default Login;