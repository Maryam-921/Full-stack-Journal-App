import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Entry() {
    const [content, setContent] = useState("");
    const [subject, setSubject] = useState("");

    const navigate = useNavigate();

    const addEntry = (e) => {
        e.preventDefault();
        // API call to /entry endpoint
        const token = localStorage.getItem("token");
        fetch("http://127.0.0.1:8000/entry", {
            method: "POST",
            headers: { "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({subject, content}),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            // If journal entry added, navigate to dashboard
            if (data.message === "Entry recieved") { 
                navigate("/");  // <-- goes to Dashboard page
            } else {
                alert("Could not add the Entry: " + (data.error || "Unknown error"));
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
            height: "200vh",
            backgroundColor: "#f5f5f5",
        }}
        >
        <form
            onSubmit={addEntry}
            style={{
            backgroundColor: "#fff",
            padding: "40px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            width: "600px",
            textAlign: "center",
            }}
        >
            <h2 style={{ marginBottom: "30px" }}>Journal Entry</h2>

            <input
            type="text"
            placeholder="Subject..."
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            // required
            style={{
                width: "100%",
                padding: "12px 10px",
                marginBottom: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                fontSize: "16px",
            }}
            />

            <input
            type="text"
            placeholder="Journal..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
            Add
            </button>
        </form>
        </div>
    );
}

export default Entry;