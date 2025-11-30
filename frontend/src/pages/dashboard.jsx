import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import {SentimentChart, SentimentPie} from "./chart";

function Dashboard() {
    const navigate = useNavigate();
    
    const [entries, setEntries] = useState([]);
    const [recentEntries, setrecentEntries] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch("http://127.0.0.1:8000/entries", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setEntries(data);
                setrecentEntries(data.slice(0, 4));
            })
            .catch(err => console.error("Error fetching entries:", err));
    }, []);
    
    const positiveCount = entries.filter(e => e.sentiment === "Positive").length;
    const positivePercent = ((positiveCount / entries.length) * 100).toFixed(2);

    const negativeCount = entries.filter(e => e.sentiment === "Negative").length;
    const negativePercent = ((negativeCount / entries.length) * 100).toFixed(2);

    return (
        <div style={{ paddingTop: "50px" }}>
            {/* ---------- LEFT STATS SIDEBAR ---------- */}
            <div
            style={{ display: "flex" }}>
                <div
                    style={{

                        position: "fixed",  // stays in place on scroll
                        left: 0,
                        height: "100vh",
                        width: "200px",
                        background: "#f4f4f8",
                        padding: "25px",
                        boxShadow: "2px 0 6px rgba(0,0,0,0.1)",
                    }}
                >
                    {/* <h2 style={{ marginBottom: "20px" }}>Statistics</h2> */}

                    <div style={{
                        background: "#fff",
                        padding: "20px",
                        marginBottom: "20px",
                        borderRadius: "10px",
                        boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
                    }}>
                        <h3>Total Entries</h3>
                        <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                            {entries.length}
                        </p>
                    </div>

                    <div style={{
                        background: "#fff",
                        padding: "20px",
                        marginBottom: "20px",
                        borderRadius: "10px",
                        boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
                    }}>
                        <h3>😊 Positive:</h3>
                        <p>
                            {positivePercent}%
                        </p>
                    </div>

                    <div style={{
                        background: "#fff",
                        padding: "20px",
                        borderRadius: "10px",
                        boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
                    }}>
                        <h3>😞 Negative:</h3>
                        <p>
                            {negativePercent}%
                        </p>
                    </div>
                </div>

                {/* ---------- MAIN DASHBOARD CONTENT ---------- */}
                <div style={{ flexGrow: 1, padding: "40px",
                    marginLeft: "250px",
                    overflowY: "auto"
                }}>
                    {/* CENTER HEADING */}
                    <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
                        👋 Welcome Back!
                    </h1>

                    {/* ---------- RECENT ENTRIES SECTION ---------- */}
                    <h2 style={{ marginBottom: "20px" }}>Journal Entries</h2>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: "20px",
                            marginBottom: "40px",
                        }}
                    >
                        {recentEntries.map((entry) => (
                            <div
                                key={entry.id}
                                style={{
                                    background: "#fff",
                                    padding: "20px",
                                    borderRadius: "10px",
                                    boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
                                }}
                            >
                                <div style={{ fontSize: "14px", color: "#666" }}>
                                    {entry.created_at}
                                </div>

                                <h3 style={{ margin: "10px 0" }}>
                                    {entry.subject || "Untitled Entry"}
                                </h3>

                                <p style={{ color: "#444", marginBottom: "10px" }}>
                                    {entry.content.substring(0, 60)}...
                                </p>

                                <div style={{ fontSize: "24px" }}>
                                    {entry.sentiment === "positive" ? "😊" :
                                    entry.sentiment === "negative" ? "😞" : "😐"}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ---------- LINK TO ALL ENTRIES ---------- */}
                    <div style={{ textAlign: "center", marginBottom: "50px" }}>
                        <Link
                            to="/entries"
                            style={{
                                fontSize: "18px",
                                color: "#4CAF50",
                                fontWeight: "bold",
                            }}
                        >
                            View All Entries →
                        </Link>
                    </div>

                    {/* ---------- TWO GRAPHS SECTION ---------- */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: "25px",
                        }}
                    >
                        <div
                            style={{
                                background: "#fff",
                                height: "250px",
                                borderRadius: "10px",
                                boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: "20px",
                                color: "#777",
                            }}
                        >
                            {/* 📊 Graph 1 (sentiment over time) */}
                            <SentimentChart entries={entries} />
                        </div>
                        <div
                            style={{
                                background: "#fff",
                                height: "250px",
                                borderRadius: "10px",
                                boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: "20px",
                                color: "#777",
                            }}
                        >
                            {/* 📈 Graph 2 (entries per week) */}
                            <SentimentPie entries={entries} />
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ 
                position: "fixed",
                bottom: "20px",
                right: "20px",
                background: "#4CAF50",
                padding: "20px",
                height: "40px",
                borderRadius: "50%",
                display: "flex", 
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
            }}
            onClick={() => navigate("/entry")}
            >
                <FaPlus
                    size={40}
                    style={{ cursor: "pointer", color: "#444", width: "40px" }}
                />
            </div>
        </div>
    );
}

export default Dashboard;