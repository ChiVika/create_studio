import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Categories() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/cat/")
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Проблемы с получением данных о категориях:', error);
              });
      }, []);
    

    return (
      <>
        <div>
          {data.map(item => (
            <div key={item.id}>
              <h2>{item.name}</h2>
              <h6>{item.description}</h6>
            </div>
          ))}
    </div>
      </>
    )
  }
  
  export default Categories