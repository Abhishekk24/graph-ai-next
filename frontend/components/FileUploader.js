import React, { useState } from "react";
import axios from "axios";

const FileUploader = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const allowedExtensions = /\.(csv|xlsx)$/i;
            if (!allowedExtensions.test(selectedFile.name)) {
                alert("Please upload a valid Excel or CSV file.");
                setFile(null);
                return;
            }
            setFile(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        setUploading(true);
        try {
            const response = await axios.post("http://localhost:5000/upload", formData);
            alert(response.data.message);
            onUploadSuccess();
        } catch (error) {
            const errorMessage = error.response?.data?.error || "Unknown error occurred during upload.";
            alert("Error uploading file: " + errorMessage);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={styles.rowContainer}>
            {/* Left Section */}
            <div style={styles.leftSection}>
                <h3 style={styles.title}>How it Works</h3>
                <p style={styles.description}>
                    1. Upload your dataset (CSV or Excel).<br />
                    2. Our AI processes the data for you.<br />
                    3. View and interact with stunning visualizations.<br />
                </p>
                <p style={styles.note}>
                    Supported formats: <strong>.csv</strong>, <strong>.xlsx</strong>
                </p>
            </div>

            {/* Right Section */}
            <div style={styles.rightSection}>
                <h3 style={styles.title}>Upload Your Dataset</h3>

                {/* Drag-and-Drop Zone */}
                <label
                    htmlFor="file-input"
                    style={{
                        ...styles.dropZone,
                        ...(file ? styles.dropZoneActive : {}),
                    }}
                >
                    {file ? (
                        <p style={styles.fileName}>{file.name}</p>
                    ) : (
                        <p style={styles.dropZoneText}>
                            Drag & drop your file here <br />
                            <span style={styles.subText}>or click to browse</span>
                        </p>
                    )}
                </label>
                <input
                    id="file-input"
                    type="file"
                    accept=".csv, .xlsx"
                    onChange={handleFileChange}
                    style={styles.fileInput}
                />

                <button
                    onClick={handleUpload}
                    style={{
                        ...styles.uploadButton,
                        ...(uploading ? styles.uploadButtonDisabled : {}),
                    }}
                    disabled={uploading}
                >
                    {uploading ? "Uploading..." : "Upload File"}
                </button>
            </div>
        </div>
    );
};

const styles = {
    rowContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "20px",
        gap: "20px",
    },
    leftSection: {
        flex: 1,
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "rgba(255, 255, 255, 0.3)", // Semi-transparent background
        color: "#333",
        backdropFilter: "blur(10px)", // Frosted glass effect
    },
    rightSection: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#f8f9fa",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    },
    title: {
        fontSize: "1.8rem",
        fontWeight: "600",
        marginBottom: "20px",
        fontFamily: "'SF Pro Display', 'Inter', sans-serif",
        background: "linear-gradient(90deg, #8B939A , #5B6467)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    },
    description: {
        fontSize: "1rem",
        lineHeight: "1.6",
        color: "#555",
        fontFamily: "'Source Code Pro', monospace",
        marginBottom: "20px",
    },
    note: {
        fontSize: "0.9rem",
        fontWeight: "500",
        color: "#777",
    },
    dropZone: {
        width: "100%",
        maxWidth: "400px",
        height: "150px",
        border: "2px dashed #ccc",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        transition: "border-color 0.3s ease, background-color 0.3s ease",
        cursor: "pointer",
        textAlign: "center",
    },
    dropZoneActive: {
        borderColor: "#4caf50",
        backgroundColor: "#e8f5e9",
    },
    dropZoneText: {
        fontSize: "1rem",
        fontWeight: "500",
        color: "#777",
    },
    subText: {
        fontSize: "0.9rem",
        color: "#aaa",
        fontFamily: "'Source Code Pro', monospace",
    },
    fileName: {
        fontSize: "1rem",
        fontWeight: "500",
        color: "#333",
    },
    fileInput: {
        display: "none",
    },
    uploadButton: {
        marginTop: "20px",
        backgroundColor: "#2D3436",
        color: "#fff",
        padding: "12px 20px",
        fontSize: "1rem",
        fontWeight: "500",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
    uploadButtonDisabled: {
        backgroundColor: "#ccc",
        cursor: "not-allowed",
    },
};

export default FileUploader;



