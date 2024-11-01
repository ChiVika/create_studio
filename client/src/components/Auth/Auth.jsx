import { Link } from "react-router-dom";
import "./Auth.scss";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    await fetch('http://127.0.0.1:8000/login/',{
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify({
        email, password
      })

        
    })
    console.log("авторизация прошла успешно");
    navigate('/');
    // try{
      
    //   const response = await axios.post('http://127.0.0.1:8000/login/', JSON.stringify({
    //     email,
    //     password,
    //   }), {
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     withCredentials: true
    //   });
    //   // localStorage.setItem('jwt', response.data.jwt);
    //   // const token = response.data.jwt;
    //   // document.cookie = `jwt=${token}`;
     
    //   console.log("авторизация прошла успешно");
    //   navigate('/');
      
      
    // }
    // catch (error) {
    //   console.error(error);
    //   console.log('Ошибка авторизации');
    // }  
  }

  


  return (
    <>
      <div className="Auth" onSubmit={submitForm}>
        <form className="Auth__block">
          <h2 className="Auth__title">Авторизация</h2>
          <input type="email"placeholder="Email"
             onChange={e => setEmail(e.target.value)} required/>
          <input type="password" placeholder="password"
            onChange={e => setPassword(e.target.value)} required/>
          <button type="submit">вход</button>
          <Link to="/registration">Зарегистрироваться</Link>
        </form>
      </div>
    </>
  )
}

export default Auth