import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../style/layout.css';

const Layout = () => {
    const userName = localStorage.getItem("userName") || "User";

    return (
        <div className="layout-page-wrapper">
            <div className="layout-container">
                <aside className="sidebar">
                    <Navbar />
                </aside>
                <main className="main-content">
                    <div className="welcome-bar">
                        <h4>Welcome {userName}</h4>
                    </div>
                    <div className="content-card">
                        <Outlet /> 
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;