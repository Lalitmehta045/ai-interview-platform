import { useState, useEffect } from "react";
import "../assets/css/StartInterview.css"
import { generateQuestionsAPI, startInterviewAPI } from "../services/interview";


const ALLOWED_FILE = ["application/pdf"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const StartInterview = ({onClick}) => {
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [resume, setResume] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [voices, setVoices] = useState([]);
    const [selectedVoiceURI, setSelectedVoiceURI] = useState(localStorage.getItem("ai_voice_uri") || "");

    useEffect(() => {
        let intervalId;
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            if (availableVoices.length > 0) {
                setVoices(availableVoices);
                if (!localStorage.getItem("ai_voice_uri")) {
                    setSelectedVoiceURI(availableVoices[0].voiceURI);
                }
                clearInterval(intervalId);
            }
        };

        loadVoices();
        
        if (typeof window.speechSynthesis !== 'undefined' && window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }

        // Polling fallback for mobile browsers (Safari/Chrome) where onvoiceschanged may be unreliable
        intervalId = setInterval(loadVoices, 500);

        // Stop polling after 5 seconds to prevent infinite loop if no voices exist
        setTimeout(() => clearInterval(intervalId), 5000);

        return () => clearInterval(intervalId);
    }, []);

    const handleVoiceChange = (e) => {
        const uri = e.target.value;
        setSelectedVoiceURI(uri);
        localStorage.setItem("ai_voice_uri", uri);
    };

    const handleFileUpload = (e) => {
        try {
            const file = e.target.files[0];

            if(!file) {
                return;
            }

            console.log(file.type)

            if(!ALLOWED_FILE.includes(file.type)) {
                setError("Only PDF allowed");
                return;
            }

            if(file.size > MAX_FILE_SIZE) {
                setError("File size mus be under 5mb.");
                return;
            }

            setError("");
            setResume(file);
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if(!jobTitle || !jobDescription || !resume) {
            setError("All fields are required!!!");
            return;
        }

        setLoading(true);
        setError("");

        try {

            const formData = new FormData();
            formData.append("job_title", jobTitle);
            formData.append("job_description", jobDescription);
            formData.append("resume", resume);

            // generate question endpoint
            const response = await generateQuestionsAPI(formData);

            if (!response) {
                setError("Failed to generate questions. Please check the server.");
                return;
            }

            // Start interview endpoint
            const data = await startInterviewAPI(response.session_id);

            onClick(data, response.session_id);


        } catch (error) {
            console.error("Error: ", error);
        } finally {
             setLoading(false);
        }
    }

    return <>
    <div className="start-interview-container">
        <form className="start-interview-form" onSubmit={handleFormSubmit}>
            <h1>AI Interview</h1>

            { error && <p className="error-message">{error}</p> }

            <div className="form-group">
                <label>Job Title</label>
                <input 
                    type="text"
                    placeholder="Enter Job Title"
                    required
                    value={jobTitle}
                    onChange={e => setJobTitle(e.target.value)}
                />
            </div>

             <div className="form-group">
                <label>Job Description</label>
                <textarea 
                    placeholder="Enter Job Description"
                    required
                    value={jobDescription}
                    onChange={e => setJobDescription(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Resume (PDF)</label>
                <input
                    type="file"
                    accept=".pdf"
                    required
                    onChange={handleFileUpload}
                />
            </div>

            <div className="form-group">
                <label>AI Voice</label>
                <select 
                    value={selectedVoiceURI} 
                    onChange={handleVoiceChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '5px' }}
                >
                    {voices.map(voice => (
                        <option key={voice.voiceURI} value={voice.voiceURI}>
                            {voice.name} ({voice.lang})
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
                { loading ? "Generating Questions" : "Start Interview"}
            </button>
        </form>

    </div>
    </>
}

export default StartInterview