import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

function Entries() {
    const [entries, setEntries] = useState([]);

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
                setEntries(data || []);
            })
            .catch(err => console.error("Error fetching entries:", err));
    }, []);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <div style={{
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}>
            <h2>Your Journal Entries</h2>

            <div style={{
                width: "100%",
                maxWidth: "700px",
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "15px"
            }}>
                {entries.length === 0 && (
                    <p>No entries yet. Start writing your first journal entry!</p>
                )}

                {entries.map((entry) => (
                    <div key={entry.id}
                        style={{
                            padding: "20px",
                            borderRadius: "10px",
                            backgroundColor: "#fff",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                        }}
                    >
                        {/* Date */}
                        <p style={{
                            fontSize: "12px",
                            color: "#555",
                            marginBottom: "5px",
                        }}>
                            {formatDate(entry.created_at)}
                        </p>

                        {/* Subject (if you add subject later) */}
                        {entry.subject && (
                            <h3 style={{ margin: "5px 0" }}>{entry.subject}</h3>
                        )}

                        {/* First few words of content */}
                        <p style={{ color: "#333" }}>
                            {entry.content.length > 60
                                ? entry.content.substring(0, 60) + "..."
                                : entry.content}
                        </p>
                    </div>
                ))}
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

export default Entries;