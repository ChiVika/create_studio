import { useEffect, useState } from "react";
import axios from 'axios';
import "./Profile.scss";
import "./Record.scss";
import Report from "../Report/Report";
import Works from "../Works/Works";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isPhotoChanged, setIsPhotoChanged] = useState(false); // Состояние для отслеживания изменения фото
  const [profile, setProfile] = useState({
    lastname: '',
    name: '',
    phone: '',
    photo: null
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const [records, setRecords] = useState([]);
  const [onerecord, setOnerecord] = useState({});

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
  }, []);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/recordsall/", {
          withCredentials: true
        });
        setRecords(response.data);
      } catch (error) {
        console.log("error: ", error);
      }
    };

    fetchRecords();
  }, []);

  useEffect(() => {
    const fetchMasterClasses = async () => {
      const Datas = {};
      const promises = records.map(async (record) => {
        try {
          const res = await axios.get(`http://127.0.0.1:8000/McRecord/${record.id}/`);
          Datas[record.id] = {
            title: res.data.title,
            date: formatDate(res.data.date)
          };
        } catch (error) {
          console.error(`Error fetching master class for record ${record.id}:`, error);
        }
      });

      await Promise.all(promises);
      setOnerecord(Datas);
    };

    fetchMasterClasses();
  }, [records]);

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

    // Логируем перед отправкой
    console.log("Form data to be sent:", profile);

    if (isPhotoChanged && profile.photo) {
      formData.append('photo', profile.photo);
      console.log('File to upload:', profile.photo);
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/profile/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Важно для отправки файлов
        },
        withCredentials: true
      });
      console.log('Response data:', response.data);
      setProfile(response.data);
    } catch (error) {
      console.error('Error saving profile:', error.response?.data || error);
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
    setIsPhotoChanged(true); // Фото было изменено
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
                {profile.photo ? (
                  <>
                    <input type="file" className="Profile__input-photo" onChange={handleFileChange} />
                    <img className="Profile__input-file" alt="фото" src={`http://127.0.0.1:8000${profile.photo}`} />
                  </>
                ) : (
                  <input type="file" className="Profile__input-photo" onChange={handleFileChange} />
                )}
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
                {profile.photo && <img className="Profile__input-file" alt="фото" src={`http://127.0.0.1:8000${profile.photo}`} />}
              </div>
              <button className="Profile__btn" onClick={ProfileEdit}>Редактировать</button>
            </>
          )}
        </div>
        <div className="Record">
          <h2 className="Record__title">Ближайшие записи</h2>
          {records.slice(0, 5).map(record => (
            <button className="Record__container" key={record.id}>
              <p className="Record__text">{onerecord[record.id]?.title}</p>
              <p className="Record__text Record__time">{onerecord[record.id]?.date}</p>
            </button>
          ))}
        </div>
        <Report/>
        <Works/>
      </div>
    </>
  );
}

export default Profile;
