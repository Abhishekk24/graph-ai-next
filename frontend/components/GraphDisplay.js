import React, { useState } from 'react';
import axios from 'axios';

const GraphDisplay = () => {
    const [instruction, setInstruction] = useState('');
    const [imagePath, setImagePath] = useState(null);

    const generateGraph = async () => {
        try {
            const response = await axios.post("http://localhost:5000/generate", { instruction });
            setImagePath(`http://localhost:5000/${response.data.plot_path}`);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                alert("Error generating graph: " + error.response.data.error);
            } else {
                alert("An unexpected error occurred: " + error.message);
            }
        }
    };
    

    return (
        <div>
            <input
                type="text"
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                placeholder="Enter your graph instruction"
            />
            <button onClick={generateGraph}>Generate Graph</button>
            {imagePath && <img src={imagePath} alt="Generated Graph" />}
        </div>
    );
};

export default GraphDisplay;
