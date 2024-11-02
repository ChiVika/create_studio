import Categories from "../components/categories/categories"
import MainPost from "../components/MainPost/MainPost"
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";



function MainPage() {



    return (
      <>
        <MainPost/>
        <Categories/>
      </>
    )
  }
  
  export default MainPage