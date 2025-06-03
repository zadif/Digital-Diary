import { useEffect } from "react";

function AddNew() {
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
  }, []);

  return (
    <>
      <h1>Add New Entry</h1>
      <div id="wrapper">
        <form id="paper" method="get" action="">
          <div id="margin">
            Title: <input id="title" type="text" name="title" />
          </div>
          <textarea
            placeholder="Enter something funny."
            id="text"
            class="text2"
            name="text"
            rows="4"
            style={{
              overflow: "hidden",
              wordWrap: "break-word",
              resize: "none",
              height: "160px",
            }}
          ></textarea>
          <br /> <input id="button" type="submit" value="Create" />
          <button id="startBtn" type="button">
            Start
          </button>
          <button id="stopBtn" type="button">
            Stop
          </button>
          <button id="clearBtn" type="button">
            Clear
          </button>
          <button id="copyBtn" type="button">
            Copy
          </button>
        </form>
      </div>
    </>
  );
}
export default AddNew;
