import "./Posts.scss";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { format } from 'date-fns';

function Posts({user, user_id}) {
  const { id } = useParams();
  const [category, setCategory] = useState({});
  const [posts, setPosts] = useState([]);
  const [subs, setSubs] = useState({});
  const [teacher, setTeacher] = useState({});
  const [tariffs, setTariffs] = useState({});
  const [visible, setVisible] = useState(3);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/posts/${id}/`)
      .then(response => {
        setCategory(response.data);
      })
      .catch(error => {
        console.error('Проблемы с получением данных о категории:', error);
      });

    axios.get(`http://127.0.0.1:8000/masterClass/${id}/`)
      .then(response => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Проблемы с получением данных о постах:', error);
      });
  }, [id]);

  useEffect(() => {
    if (posts.length > 0) {
      const fetchTariffs = async () => {
        const tariffsData = {};
        for (let post of posts) {
          try {
            const response = await axios.get(`http://127.0.0.1:8000/tariff/${post.id}/`);
            tariffsData[post.id] = response.data;
            console.log("postID", post.id)
          } catch (error) {
            console.error(`Ошибка при получении тарифов для поста с id ${post.id}:`, error);
          }
        }
        setTariffs(tariffsData);
      };
      fetchTariffs();
    }
  }, [posts]);

  useEffect(() => {
    if (posts.length > 0) {
      const fetchSubsidiaries = async () => {
        const subsidiariesData = {};
        const teacherData = {};
        for (let post of posts) {
          try {
            const response = await axios.get(`http://127.0.0.1:8000/subsidary/${post.subsidiary}/`);
            subsidiariesData[post.id] = {
              city: response.data[0].city,
              adresss: response.data[0].adresss
            };
            const response1 = await axios.get(`http://127.0.0.1:8000/teacher/${post.teacher}/`);
            teacherData[post.id] = {
              lastname: response1.data[0].lastname,
              name: response1.data[0].name,
              surname: response1.data[0].surname
            };
          } catch (error) {
            console.error(`Ошибка при получении данных о филиале или преподавателе для поста с id ${post.id}:`, error);
          }
        }
        setSubs(subsidiariesData);
        setTeacher(teacherData);
      };
      fetchSubsidiaries();
    }
  }, [posts]);

  const showMore = () => {
    setVisible(add => add + 3);
  };

  const createRecord = async(postid) => {
      const res = await axios.post(`http://127.0.0.1:8000/record/${postid}/${user_id}/`)
      .then(response => {
        alert("Вы успешно записаны на мастер-класс");
      })
      .catch(error => {
        alert("Вы уже записаны на мастер-класс");
      })
        
        
    }
    
  

  return (
    <>
      <h1 className="Posts__title">{category.name}</h1>
      <p className="Posts__descr">{category.description}</p>
      
        {posts.length > 0 ? (
          posts.slice(0,visible).map(post => (
            <div key={post.id} className="Post">
              <div className="Posts__container">
                <div className="Posts__picture">
                `<img src={`http://127.0.0.1:8000${post.image}`} alt={post.title} className="Posts__picture"/>
                </div>
              
              <div className="Posts__content">
                <h3 className="Posts__title-post">{post.title}</h3>
                
                <p className="Posts__descr-post">{post.description}</p>
                <p className="Posts__otherContent">{teacher[post.id]?.lastname} {teacher[post.id]?.name} {teacher[post.id]?.surname}</p>
                <div className="Posts__tariffs">
                  {tariffs[post.id]?.map(t => (
                      <div key={t.id}>
                        <strong className="Posts__tariffone">{t.name} - {t.price} руб.</strong>
                      </div>
                    ))}
                </div>
                
                
                <p className="Posts__otherContent">{subs[post.id]?.city}, {subs[post.id]?.adresss}</p>
                <p className="Posts__otherContent">{format(new Date(post.date), 'dd.MM.yyyy')}, {format(new Date(`${post.date}T${post.time}`), 'HH:mm')}</p>
                {(user.detail === "Не аунтифицирован!" || user.detail === "Пользователь не найден") ?
                (<p>Надо авторизоваться для записи</p>) : 
                (<button className="Posts__btn" onClick={() => createRecord(post.id)}>Записаться</button>)}
              </div>

              
              
              </div>
            </div>
          ))
        ) : (
          <div>Нет постов для этой категории</div>
        )}

        {visible < posts.length && (
          <button className="Posts__showMore" onClick={showMore}>Смотреть больше</button>
        )}
      
      
    </>
  );
}

export default Posts;