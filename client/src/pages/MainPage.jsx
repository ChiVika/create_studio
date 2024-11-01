import Categories from "../components/categories/categories"
import MainPost from "../components/MainPost/MainPost"
import axios from 'axios';
import React, { useEffect, useState } from 'react';



function MainPage() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    (
      async () => {
          // try {
          //   const response = await axios.get('http://127.0.0.1:8000/user/',{
          //     headers:{
          //       'Content-Type': 'application/json',
          //     },
          //     withCredentials: true
          //   });
      
      
          //   const data = await response.
          //   setUser(data);
          // }
          // catch(error){
          //   console.log("Упс")
          // }
          
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
      }
    )();
    
  }, []);
    return (
      <>
        <MainPost/>
        <Categories/>
        <div>
          
        </div>
      </>
    )
  }
  
  export default MainPage