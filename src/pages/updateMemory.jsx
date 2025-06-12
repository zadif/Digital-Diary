import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./AddNew.css";

function UpdateMemory() {
  const location = useLocation();
  const memoryData = location.state?.memoryData;
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  useEffect(() => {
    // Check if speech recognition is supported
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      console.error("Speech recognition not supported");
      alert("Speech recognition is not supported in this browser");
      return;
    }

    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.continuous = true;

    recognition.onstart = () => {
      console.log("Speech recognition started");
    };

    recognition.onresult = (event) => {
      console.log("Speech result received");
      const text = event.results[event.results.length - 1][0].transcript;
      const textarea = document.getElementsByClassName("text2")[0];
      if (textarea) {
        textarea.value += text + "\n";
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert("Speech recognition error: " + event.error);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
    };

    document.getElementById("startBtn").onclick = () => {
      console.log("Start button clicked");
      try {
        recognition.start();
      } catch (error) {
        console.error("Error starting recognition:", error);
        alert("Error starting recognition: " + error.message);
      }
    };

    document.getElementById("stopBtn").onclick = () => {
      console.log("Stop button clicked");
      recognition.stop();
    };

    // Add clear and copy functionality
    document.getElementById("clearBtn").onclick = () => {
      const textarea = document.getElementsByClassName("text2")[0];
      const titleInput = document.getElementById("title");
      if (textarea) textarea.value = "";
      if (titleInput) titleInput.value = "";
    };

    document.getElementById("copyBtn").onclick = () => {
      const textarea = document.getElementsByClassName("text2")[0];
      if (textarea && textarea.value) {
        navigator.clipboard
          .writeText(textarea.value)
          .then(() => alert("Text copied to clipboard!"))
          .catch((err) => console.error("Failed to copy text: ", err));
      }
    };
  }, []);
  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Show loader

    const title = document.getElementById("title").value;
    const content = document.getElementsByClassName("text2")[0].value;

    if (!title || !content) {
      setLoading(false); // Hide loader if validation fails
      setAlert({
        show: true,
        message: "Please fill in both title and content",
        type: "danger",
      });
      setTimeout(() => setAlert({ show: false, message: "", type: "" }), 5000);
      return;
    }

    let objectID = memoryData._id;
    console.log(objectID);
    try {
      const API_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8080";
      const response = await fetch(`${API_URL}memories`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, objectID }),
      });

      if (response.ok) {
        const result = await response.json();
        // Success! Redirect to ViewAllMemories page
        window.location.href = "/viewAllMemories";
      } else {
        const error = await response.json();
        setLoading(false); // Hide loader on error
        setAlert({
          show: true,
          message: "Failed to update memory. Please try again.",
          type: "danger",
        });
        setTimeout(
          () => setAlert({ show: false, message: "", type: "" }),
          5000
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert({
        show: true,
        message: "Error",
        type: "danger",
      });
      setTimeout(() => setAlert({ show: false, message: "", type: "" }), 5000);
    }
  };

  if (loading) {
    return (
      <div className="neonBox">
        <div className="neon-loader">
          <div className="neon-loader-ring"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="oswaldText middler">Update Memory</h1> {/* Custom Alert */}
      {alert.show && (
        <div className={`custom-alert custom-alert-${alert.type}`}>
          {alert.message}
          <button
            type="button"
            className="alert-close-btn"
            onClick={() => setAlert({ show: false, message: "", type: "" })}
          >
            ×
          </button>
        </div>
      )}
      <div id="wrapper">
        <form id="paper" method="get" action="">
          <div id="margin">
            Title:{" "}
            <input
              id="title"
              type="text"
              name="title"
              defaultValue={memoryData.title}
            />
          </div>
          <textarea
            placeholder="Enter something funny."
            id="text"
            defaultValue={memoryData.content}
            className="text2"
            name="text"
            rows="4"
            style={{
              overflow: "hidden",
              wordWrap: "break-word",
              resize: "none",
              height: "160px",
            }}
          ></textarea>{" "}
          <br />{" "}
          <input
            className="glowing-button"
            type="submit"
            value="Update"
            onClick={handleUpdate}
          />
          <button id="startBtn" type="button" className="btn btn-info">
            Start
          </button>
          <button id="stopBtn" type="button" className="btn btn-info">
            Stop
          </button>
          <button id="clearBtn" type="button" className="btn btn-info">
            Clear
          </button>
          <button id="copyBtn" type="button" className="btn btn-info">
            Copy
          </button>
        </form>
      </div>
    </>
  );
}
export default UpdateMemory;
