import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Categories.scss';
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
      <div className='Categories'>
        <h1 className='Categories__title'>Мастер-классы</h1>
        <div className='Categories__conteiner'>
              {data.map(item => (
                <button key={item.id} className='Categories__block'>
                  <p className='Categories__text'>{item.name}</p>
                </button>
              ))}
          </div>
      </div>
        
      </>
    )
  }
  
  export default Categories