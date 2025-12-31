import { useNavigate } from "react-router-dom";
import logoutIcon from "../assets/logout.svg";

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/", { replace: true });
    };

    return (
        <button onClick={handleLogout} className="logout-btn" style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"
        }}>
            <img src={logoutIcon} alt="Logout" width="30" height="30" /> <p>Logout</p>
        </button >
    );
}

export default LogoutButton;