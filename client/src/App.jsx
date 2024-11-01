import { Routes, Route, createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import './App.scss'
import Pageheader from './components/PageHeader/PageHeader'
import MainPage from './pages/MainPage'
import Categories from './components/categories/categories'
import Authtorization from './pages/authorization'
import Registration from './pages/Registation'
import axios from 'axios';
import { useEffect, useState } from "react";

function App() {


  return (
    <>
      <div className='App__container'>
          <Pageheader />
          <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route path='/123' element={<Categories/>}/>
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
