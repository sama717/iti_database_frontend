import LogoutButton from '../security/Logout'; 

function Navbar() {
    const isLoggedIn = localStorage.getItem("userRole");

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#eee' }}>
            <div>
                <img 
                    src="https://ci.suez.edu.eg/wp-content/uploads/2022/08/iti-logo.png" 
                    alt="ITI Logo" 
                    style={{ height: '40px' }} 
                />
            </div>
            <div>
                {isLoggedIn && <LogoutButton />}
            </div>
        </div>
    );
}

export default Navbar;