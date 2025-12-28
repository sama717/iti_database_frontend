import { useNavigate } from "react-router-dom";

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("userRole");
        navigate("/", { replace: true });    
    };

    return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;