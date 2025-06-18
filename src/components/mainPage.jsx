import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function writing(val) {
  if (val) {
    return (
      <div className="box-side box-front">
        <div className="typewriter-wrapper">
          <div className="typewriter">Save your memories digitally</div>
        </div>
      </div>
    );
  }
  return null;
}

function Body(props) {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
  console.log(API_URL);
  useEffect(() => {
    fetch(`${API_URL}/health`).catch((error) =>
      console.error("Health check failed:", error)
    );
  }, []);
  const [showBackSide, setShowBackSide] = useState(false);
  const [showTypewriter, setShowTypewriter] = useState(false);
  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem("digitalDiaryVisited");
    console.log("Value of digital is ", hasVisited);

    // For development: always show animation (comment out for production)
    // if (true) {

    if (!hasVisited) {
      // First time visitor - show typewriter animation
      setShowTypewriter(true);
      localStorage.setItem("digitalDiaryVisited", "true");

      // Show the back side after the typewriter effect is complete
      const timer = setTimeout(() => {
        setShowBackSide(true);
      }, 4500);

      return () => clearTimeout(timer);
    } else {
      // Returning visitor - skip typewriter, show features directly
      setShowTypewriter(false);
      setShowBackSide(true);
    }
  }, []);

  return (
    <div className="box-container oswaldText">
      <div className={`box ${showBackSide ? "box-flip" : ""}`}>
        {" "}
        {writing(showTypewriter)}
        <div className="box-side box-back">
          <h1>Digital Diary</h1>
          <div className="box-features">
            <Link to="/addNew">
              <div className="feature">
                <div className="feature-icon">📝</div>
                <h3>Write Entries</h3>
                <p>Record your thoughts and memories</p>
              </div>
            </Link>
            <Link to="/viewAllMemories">
              <div className="feature">
                <div className="feature-icon">📸</div>
                <h3>View All</h3>
                <p>View all saved memories</p>
              </div>
            </Link>

            <div className="feature">
              <div className="feature-icon">🔍</div>
              <h3>Search Memories</h3>
              <p>Find any memory instantly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Body;
