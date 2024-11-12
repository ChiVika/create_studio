import "./Posts.scss";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Posts() {
  const { id } = useParams();
  const [catgory, setCatgory] = useState("");
  const [posts, setPosts] = useState("");

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/posts/${id}/`)
      .then(response => {
        setCatgory(response.data);
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


  return (
    <>
        <h1 className="Posts__title">{catgory.name}</h1>
        <p className="Posts__descr">{catgory.description}</p>

        {posts.length > 0 ? (
        posts.map(post => (
          <div key={post.id} className="Post">
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <img src={`http://127.0.0.1:8000${post.image}`} alt={post.title} />
            <p>{post.subsidiary}</p>
            <p>{post.date}</p>
          </div>
        ))
      ) : (
        <div>Нет постов для этой категории</div>
      )}
        
    </>
  )
}

export default Posts