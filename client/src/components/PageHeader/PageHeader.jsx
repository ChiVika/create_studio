import Button from "../Button/Button";
import "./PageHeader.scss";

function Pageheader() {

  return (
    <>
      <div className="PageHeader">
        <div className="PageHeader__block1">
          <a href="/" className="PageHeader__logo">Логотип</a>
          <div className="PageHeader__nav-links">
            <a href="/123" className="PageHeader__nav">Мастер-классы</a>
          </div>
          <div className="PageHeader__nav-links">
            <a href="/123" className="PageHeader__nav">Преподаватели</a>
          </div>
          <Button className="PageHeader__button">Вход</Button>
        </div>
      </div>
    </>
  )
}

export default Pageheader