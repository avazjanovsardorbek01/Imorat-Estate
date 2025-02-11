import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faStar } from "@fortawesome/free-solid-svg-icons"; // Добавляем иконки
import "./listings.css";

const Listings = ({ currentPage }) => {
  const [photos, setPhotos] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  // useEffect(() => {
  //   // Пример запроса с пагинацией
  //   axios
  //     .get(`https://picsum.photos/v2/list?page=${currentPage}&limit=10`)
  //     .then((response) => {
  //       console.log(response.data); // Логируем ответ, чтобы видеть данные
  //       setPhotos(response.data); // Сохраняем данные с изображениями
  //       // Здесь нужно обновить totalPages, если API возвращает это значение
  //       setTotalPages(20); // Примерное количество страниц
  //     })
  //     .catch((error) => {
  //       console.error("Ошибка при получении фото:", error);
  //     });
  // }, [currentPage]);

  const displayedPhotos = photos.slice(0, 4);

  return (
    <div className="listings-container">
      {displayedPhotos.length > 0 ? (
        displayedPhotos.map((photo) => (
          <div className="listing-card" key={photo.id}>
            <img
              src={photo.download_url} // Используем URL для загрузки изображения
              alt={photo.author}
              className="listing-image"
            />
            <div className="listing-info">
              <h3>{photo.author}</h3> {/* Показываем имя автора */}
              <div className="listing-location">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="location-icon"
                />
                <p>Ohio St. South Gate, California</p>{" "}
              </div>
              <div className="listing-rating">
                {[...Array(5)].map((_, index) => (
                  <FontAwesomeIcon
                    key={index}
                    icon={faStar}
                    className="star-icon"
                  />
                ))}
                <span>4.8</span> {/* Статический рейтинг */}
              </div>
              <p className="price">Цена: $350</p>{" "}
            </div>
          </div>
        ))
      ) : (
        <p>Загрузка...</p> // Сообщение о загрузке, если данные еще не пришли
      )}
    </div>
  );
};

export default Listings;
