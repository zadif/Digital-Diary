import { useState, useEffect } from "react";

function Body() {
  const [showBackSide, setShowBackSide] = useState(false);

  useEffect(() => {
    // Show the back side after the typewriter effect is complete
    const timer = setTimeout(() => {
      setShowBackSide(true);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="box-container oswaldText">
      <div className={`box ${showBackSide ? "box-flip" : ""}`}>
        {" "}
        {/* Front side with typewriter text */}
        <div className="box-side box-front">
          <div className="typewriter-wrapper">
            <div className="typewriter">Save your memories digitally</div>
          </div>
        </div>
        {/* Back side with features */}
        <div className="box-side box-back">
          <h1>Digital Diary</h1>
          <div className="box-features">
            <div className="feature">
              <div className="feature-icon">📝</div>
              <h3>Write Entries</h3>
              <p>Record your thoughts and memories</p>
            </div>
            <div className="feature">
              <div className="feature-icon">📸</div>
              <h3>Add Photos</h3>
              <p>Attach images to your moments</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🔍</div>
              <h3>Search Memories</h3>
              <p>Find any memory instantly</p>
            </div>
          </div>
          <button className="get-started-btn">Get Started</button>
        </div>
      </div>
    </div>
  );
}
export default Body;
