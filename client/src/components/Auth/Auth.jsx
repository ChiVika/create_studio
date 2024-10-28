import { Link } from "react-router-dom";
import "./Auth.scss";

function Auth() {


  return (
    <>
      <div className="Auth">
        <form className="Auth__block">
          <h2 className="Auth__title">Авторизация</h2>
          <input type="email"placeholder="Email"required/>
          <input type="password" placeholder="password" required/>
          <button type="submit">вход</button>
          <Link to="/registration">Зарегистрироваться</Link>
        </form>
        
      </div>
    </>
  )
}

export default Auth