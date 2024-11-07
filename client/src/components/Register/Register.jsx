import { Link, redirect } from "react-router-dom";
import "./Register.scss";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPasswird] = useState("");
  const navigate = useNavigate();

  const submitForm = async (e) =>{
      e.preventDefault();

      if (!email || !password || !repeatPassword) {
        console.log("Все поля должны быть заполнены");
        return;
      }
      if (password !== repeatPassword){
        console.log("Пароли не совпадают");
        return;
      }
      try{
        const response = await axios.post('http://127.0.0.1:8000/register/', {
          email,
          password,
        })
        
        console.log("Регистрация прошла успешно!")
        navigate('/authtorization');
      }
      catch (error) {
        console.error(error);
        console.log('Ошибка регистрации');
      }  
  };

  return (
    <>
      <div className="Register" onSubmit={submitForm}>
        <form className="Register__block">
          <h2 className="Register__title">Регистрация</h2>
          <div className="Register__content">
            <input type="email"placeholder="Email" className="Register__input"
              onChange={e => setEmail(e.target.value)}  required/>
            <input type="password" placeholder="password" className="Register__input"
              onChange={e => setPassword(e.target.value)} required/>
            <input type="password" placeholder="repeat password" className="Register__input"
              onChange={e => setRepeatPasswird(e.target.value)} required/>
          </div>
          
          <button type="submit" className="Register__btn">Зарегистрироваться</button>
        </form>
      </div>
    </>
  )
}
export default Register;