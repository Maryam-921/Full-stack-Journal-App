import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // API call to /login endpoint
        fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({username, password }),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            localStorage.setItem("token", data.result.access_token);
            // If login is successful, navigate to dashboard
            if (data.result.message === "Login successful") { 
                navigate("/");  // <-- goes to Dashboard page
            } else {
                alert("Login failed: " + (data.error || "Unknown error"));
            }
        })
        .catch(err => console.error(err));
    };

    return (
    <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f5f5f5",
        }}
        >
        <form
            onSubmit={handleLogin}
            style={{
            backgroundColor: "#fff",
            padding: "40px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            width: "350px",
            textAlign: "center",
            }}
        >
            <h2 style={{ marginBottom: "30px" }}>Login</h2>

            <input
            type="text"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
                width: "100%",
                padding: "12px 10px",
                marginBottom: "20px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                fontSize: "16px",
            }}
            />

            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
                width: "100%",
                padding: "12px 10px",
                marginBottom: "20px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                fontSize: "16px",
            }}
            />

            <button
            type="submit"
            style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#4CAF50",
                color: "#fff",
                fontSize: "16px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
            }}
            >
            Login
            </button>

            <p style={{ marginTop: "20px", fontSize: "14px" }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#4CAF50", fontWeight: "bold" }}>
                Sign up
            </Link>
            </p>
        </form>
        </div>
    );
}

export default Login;