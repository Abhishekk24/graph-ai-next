import FileUploader from '../components/FileUploader';
import GraphDisplay from '../components/GraphDisplay';

const Home = () => {
    const handleUploadSuccess = () => {
        alert("File uploaded successfully. Ready for analysis.");
    };

    return (
        <div>
            <h1>Graph_AI: AI-Powered Graph Generator</h1>
            <FileUploader onUploadSuccess={handleUploadSuccess} />
            <GraphDisplay />
        </div>
    );
};

export default Home;
