import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Categories.scss';
function Categories() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/cat/")
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Проблемы с получением данных о категориях:', error);
              });
      }, []);
    
    const handleClick = (id) => {
      navigate(`/posts/${id}/`);
    };

    return (
      <>
      <div className='Categories'>
        <h1 className='Categories__title'>Мастер-классы</h1>
        <div className='Categories__conteiner'>
              {data.map(item => (
                <button key={item.id} className='Categories__block' onClick={() => handleClick(item.id)}>
                  <p className='Categories__text'>{item.name}</p>
                </button>
              ))}
          </div>
      </div>
        
      </>
    )
  }
  
  export default Categories