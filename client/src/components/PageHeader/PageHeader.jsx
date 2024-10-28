import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./PageHeader.scss";
import { useLocation } from 'react-router-dom';

function Pageheader() {
  const location = useLocation();

  if (location.pathname === '/authtorization/' || location.pathname === '/registration/') {
    return null;
  }

  return (
    <>
      <div className="PageHeader">
        <div className="PageHeader__block1">
          <Link to="/" className="PageHeader__logo">Логотип</Link>
          <div className="PageHeader__nav-links">
            <Link to="/123" className="PageHeader__nav">Мастер-классы</Link>
          </div>
          {/* <div className="PageHeader__nav-links">
            <Link to="/1234" className="PageHeader__nav">Преподаватели</Link>
          </div> */}
          <Link to="/authtorization" className="PageHeader__button">Вход</Link>
        </div>
      </div>
    </>
  )
}

export default Pageheader