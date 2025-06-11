import { useLocation } from "react-router-dom";
import "../styles/butterfly.css";

function Card() {
  const location = useLocation();
  const memoryData = location.state?.memoryData;

  return (
    <>
      <div class="cards">
        <input type="radio" name="card" id="card-1" checked />
        <div class="circle-container">
          <div>
            <img
              src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/butterflies/monarch.png"
              alt="monarch"
            />
          </div>
        </div>
        <div class="contents">
          <article>
            <h1 className="bebas-neue-regular ">{memoryData.title}</h1>

            <li>{memoryData.content}</li>
          </article>
        </div>
      </div>
    </>
  );
}
export default Card;
