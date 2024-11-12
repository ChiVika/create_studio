import { Routes, Route, createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import './App.scss'
import Pageheader from './components/PageHeader/PageHeader'
import MainPage from './pages/MainPage'
import Categories from './components/categories/categories'
import Authtorization from './pages/authorization'
import Registration from './pages/Registation'
import axios from 'axios';
import { useEffect, useState } from "react";

import "./styles/variables.scss";
import ProfileUser from './pages/ProfileUser'
import McpostsPage from './pages/McpostsPage'

function App() {
  const [user, setUser] = useState('');

  useEffect(() => {
    (
      async () => {
          const response = await fetch('http://127.0.0.1:8000/user/', {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
          const content = await response.json();
          console.log(content)
          setUser(content);
          localStorage.setItem('userId', content.id)
      }
    )();
    
  }, []);

  return (
    <>
      <div className='App__container'>
          <Pageheader user={user}/>
          <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route path='/123' element={<Categories/>}/>
            <Route path='/profile' element={<ProfileUser user={user}/>}/>
            <Route path='/posts/:id/' element={<McpostsPage/>}/>
          </Routes>
      </div>
      <Routes>
        <Route path='/authtorization' element={<Authtorization/>}/>
        <Route path='/registration' element={<Registration/>}/>
      </Routes>
    </>
  )
}

export default App
