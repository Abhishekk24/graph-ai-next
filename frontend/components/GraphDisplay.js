import React, { useState } from "react";
import axios from "axios";

export default function GraphDisplay() {
    const [instruction, setInstruction] = useState("");
    const [imagePath, setImagePath] = useState("");
    const [history, setHistory] = useState([]);
    const [selectedGraph, setSelectedGraph] = useState(null); // State to store the selected graph for viewing

    const generateGraph = async () => {
        try {
            const response = await axios.post("http://localhost:5000/generate", { instruction });
            const graphPath = response.data.plot_path;
            setImagePath(`http://localhost:5000/${graphPath}`);
            setHistory([...history, graphPath]); // Save graph in history
        } catch (error) {
            alert("Error generating graph: " + (error.response?.data?.error || error.message));
        }
    };

    const handleGraphClick = (path) => {
        setSelectedGraph(`http://localhost:5000/${path}`); // Set the selected graph for viewing
    };

    const closeModal = () => {
        setSelectedGraph(null); // Close the modal
    };

    return (
        <div style={styles.container}>
            {/* Left Panel */}
            <div style={styles.leftPanel}>
                <h1 style={styles.title}>Graph_AI</h1>
                <p style={styles.subtitle}>Create AI-Powered Graphs Instantly</p>
                <textarea
                    style={styles.textArea}
                    placeholder="Enter your graph instruction here (e.g., 'Plot a normal distribution')"
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                />
                <button style={styles.button} onClick={generateGraph}>
                    Generate Graph
                </button>
            </div>

            {/* Right Panel */}
            <div style={styles.rightPanel}>
                <h2 style={styles.historyTitle}>Graph History</h2>
                {history.length > 0 ? (
                    <div style={styles.historyList}>
                        {history.map((path, index) => (
                            <div
                                key={index}
                                style={styles.graphThumbnail}
                                onClick={() => handleGraphClick(path)} // Handle click event
                            >
                                <img
                                    src={`http://localhost:5000/${path}`}
                                    alt={`Graph ${index}`}
                                    style={styles.image}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p style={styles.noHistory}>No graphs generated yet.</p>
                )}
            </div>

            {/* Modal for Viewing Selected Graph */}
            {selectedGraph && (
                <div style={styles.modalOverlay} onClick={closeModal}>
                    <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <img src={selectedGraph} alt="Selected Graph" style={styles.modalImage} />
                        <button style={styles.closeButton} onClick={closeModal}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "row",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
        color: "#333",
    },
    leftPanel: {
        flex: 1,
        backgroundColor: "#f8f9fa",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    rightPanel: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: "20px",
        overflowY: "auto",
    },
    title: {
        fontSize: "2.5rem",
        fontWeight: "bold",
        background: "linear-gradient(90deg, #8B939A , #5B6467)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: "10px",
    },
    subtitle: {
        fontSize: "1.2rem",
        marginBottom: "20px",
        color: "#555",
    },
    textArea: {
        width: "80%",
        height: "100px",
        borderRadius: "10px",
        padding: "10px",
        fontSize: "1rem",
        border: "1px solid #ddd",
        marginBottom: "20px",
    },
    button: {
        backgroundColor: "#2D3436",
        color: "#fff",
        padding: "10px 20px",
        fontSize: "1rem",
        borderRadius: "10px",
        border: "none",
        cursor: "pointer",
    },
    historyTitle: {
        fontSize: "1.8rem",
        fontWeight: "bold",
        marginBottom: "20px",
    },
    historyList: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: "10px",
    },
    graphThumbnail: {
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        overflow: "hidden",
        cursor: "pointer",
    },
    image: {
        width: "100%",
        height: "auto",
        display: "block",
    },
    noHistory: {
        color: "#999",
    },
    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    modalContent: {
        position: "relative",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
        maxWidth: "80%",
        maxHeight: "80%",
        overflow: "auto",
    },
    modalImage: {
        width: "100%",
        height: "auto",
    },
    closeButton: {
        position: "absolute",
        top: "10px",
        right: "10px",
        backgroundColor: "#2D3436",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        padding: "5px 10px",
        cursor: "pointer",
    },
};
