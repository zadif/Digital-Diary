import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function writing(props) {
  if (props.firstVisit) {
    return (
      <div className="box-side box-front">
        <div className="typewriter-wrapper">
          <div className="typewriter">Save your memories digitally</div>
        </div>
      </div>
    );
  }
}

function Body(props) {
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
        {writing(props)}
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
        </div>
      </div>
    </div>
  );
}
export default Body;
