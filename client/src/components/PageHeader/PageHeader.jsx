import { Link } from "react-router-dom";
import Button from "../Button/Button";
import axios from 'axios';
import "./PageHeader.scss";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import users from '../../assets/user.svg';
import "../../styles/variables.scss";

function Pageheader({user}) {
  const location = useLocation();
  if (location.pathname === '/authtorization' || location.pathname === '/registration') {
    return null;
  }


  // const [user, setUser] = useState('');

  // useEffect(() => {
  //   (
  //     async () => {
  //         // try {
  //         //   const response = await axios.get('http://127.0.0.1:8000/user/',{
  //         //     headers:{
  //         //       'Content-Type': 'application/json',
  //         //     },
  //         //     withCredentials: true
  //         //   });
      
      
  //         //   const data = await response.
  //         //   setUser(data);
  //         // }
  //         // catch(error){
  //         //   console.log("Упс")
  //         // }
          
  //         const response = await fetch('http://127.0.0.1:8000/user/', {
  //           method: "GET",
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           credentials: 'include',
  //         });
  //         const content = await response.json();
  //         console.log(content)
  //         setUser(content);
  //     }
  //   )();
    
  // }, []);


  

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
          {/* {user.detail === 'Не аунтифицирован!' ? (<Link to="/authtorization" className="PageHeader__button">Вход</Link>) :
          (<Link to="/authtorization" className="PageHeader__auth">
            <img src={users} alt='user' className="PageHeader__auth--svg"/>
          </Link>)} */}
          {user.detail === 'Не аунтифицирован!' ? (<Link to="/authtorization" className="PageHeader__button">Вход</Link>) :
          (<Link to="/authtorization" className="PageHeader__auth">
            <img src={users} alt='user' className="PageHeader__auth--svg"/>
          </Link>)}
        </div>
      </div>
    </>
  )
}
  
  

export default Pageheader