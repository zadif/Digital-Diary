import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Link to="/" className="header-class">
        Digital Diary
      </Link>
    </header>
  );
}
export default Header;
