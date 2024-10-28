import { Link } from "react-router-dom";
import "./Register.scss";

function Register() {


  return (
    <>
      <div className="Register">
        <form className="Register__block">
          <h2 className="Register__title">Регистрация</h2>
          <input type="email"placeholder="Email"required/>
          <input type="password" placeholder="password" required/>
          <input type="password" placeholder="repeat password" required/>
          <button type="submit">вход</button>
        </form>
      </div>
    </>
  )
}
export default Register;