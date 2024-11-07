import { useEffect, useState } from "react";
import axios from 'axios';
import "./Profile.scss";


function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    lastname: '',
    name: '',
    phone: '',
    photo: null
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/profile/", {
          withCredentials: true
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  },[])

  const ProfileEdit = () => {
    setIsEditing(true);
  };

  const ProfileClose = () => {
    setIsEditing(false);
  };

  const ProfileSave = async () => {
    setIsEditing(false);
    const formData = new FormData();
    formData.append('lastname', profile.lastname);
    formData.append('name', profile.name);
    formData.append('phone', profile.phone);
    if (profile.photo) {
      formData.append('photo', profile.photo);
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/profile/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      });
      console.log('Profile saved:', response.data);
      setProfile(response.data); // Обновить состояние профиля после сохранения
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfile(prevProfile => ({
      ...prevProfile,
      photo: file
    }));
  };

  return (
    <>
      <h1 className="Profile__title">Личный кабинет</h1>
      <div className="Profile__container">
        <div className="Profile__bio">
          {isEditing ? (
            <>
              <form className="Profile__content">
                <input className="Profile__input" type="text" name="lastname" placeholder="Фамилия" value={profile.lastname} onChange={handleInputChange}/>
                <input className="Profile__input" type="text" name="name" placeholder="Имя" value={profile.name} onChange={handleInputChange}/>
                <input className="Profile__input" type="text" name="phone" placeholder="Телефон" value={profile.phone} onChange={handleInputChange}/>
              </form>
              <div className="Profile__container-photo">
                <input type="file" className="Profile__input-photo" onChange={handleFileChange} />
              </div>
              <button className="Profile__btn" onClick={ProfileClose}>Отменить</button>
              <button className="Profile__btn Profile__btn--mr20" onClick={ProfileSave}>Сохранить</button>
            </>
          ) : (
            <>
              <div className="Profile__content">
                <p className="Profile__text">{profile.lastname}</p>
                <p className="Profile__text">{profile.name}</p>
                <p className="Profile__text">{profile.phone}</p>
              </div>
              <div className="Profile__container-photo">
                {profile.photo && <img className="Profile__input-photo" alt="фото" src={`http://127.0.0.1:8000${profile.photo}`} />}
              </div>
              <button className="Profile__btn" onClick={ProfileEdit}>Редактировать</button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
