import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav
            style={{
                width: "100%",
                height: "60px",
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 30px",
                position: "fixed",
                top: 0,
                left: 0
            }}
        >
            {/* Left: Home Link */}
            <Link 
                to="/" 
                style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#333",
                    textDecoration: "none"
                }}
            >
                Home
            </Link>
            
            {/* Right: User Icon */}
            <div style={{ position: "relative" }}>
                <FaUserCircle
                    size={30}
                    style={{ cursor: "pointer", color: "#444", width: "150px" }}
                    onClick={() => setOpen(!open)}
                />
                
                {/* Dropdown */}
                {open && (
                    <div
                        style={{
                            position: "absolute",
                            top: "40px",
                            right: 0,
                            backgroundColor: "#fff",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            padding: "10px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                            width: "150px",
                            // zIndex: 10
                        }}
                    >
                        <Link
                            to="/login"
                            style={{
                                display: "block",
                                padding: "10px",
                                textDecoration: "none",
                                color: "#333",
                                borderRadius: "4px"
                            }}
                        >
                            Login
                        </Link>

                        <Link
                            to="/signup"
                            style={{
                                display: "block",
                                padding: "10px",
                                textDecoration: "none",
                                color: "#333",
                                borderRadius: "4px",
                                marginTop: "5px"
                            }}
                        >
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;