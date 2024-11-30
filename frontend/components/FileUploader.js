import React, { useState } from 'react';
import axios from 'axios';

const FileUploader = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }
        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await axios.post("http://localhost:5000/upload", formData);
            alert(response.data.message);
            onUploadSuccess();
        } catch (error) {
            alert("Error uploading file: " + error.response.data.error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default FileUploader;
