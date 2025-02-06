import React, { useEffect, useState } from "react";
import "./agency.css";
import axios from "axios";

const Agency = () => {
  const [agencies, setAgencies] = useState([]); // Массив всех агентств
  const [currentPage, setCurrentPage] = useState(1); // Текущая страница
  const [totalPages, setTotalPages] = useState(1); // Общее количество страниц
  const agenciesPerPage = 4; // Количество агентств на страницу

  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=20") // Загружаем 20 пользователей за раз
      .then((response) => {
        const mappedAgencies = response.data.results.map((user) => ({
          id: user.login.uuid, // Используем UUID как уникальный идентификатор
          name: user.name.title + " " + user.name.first + " " + user.name.last, // Полное имя
          address: `${user.location.street.name}, ${user.location.city}, ${user.location.country}`, // Адрес
          phone: user.phone, // Телефон
          email: user.email, // Email
          description:
            user.gender === "male" ? "Real Estate Agent" : "Property Manager", // Описание в зависимости от пола
          image: user.picture.medium, // Фото из API
        }));
        setAgencies(mappedAgencies);
        setTotalPages(Math.ceil(mappedAgencies.length / agenciesPerPage)); // Рассчитываем общее количество страниц
      })
      .catch((error) => console.error("Ошибка загрузки данных:", error));
  }, []);

  // Получаем агентства для текущей страницы
  const indexOfLastAgency = currentPage * agenciesPerPage;
  const indexOfFirstAgency = indexOfLastAgency - agenciesPerPage;
  const currentAgencies = agencies.slice(indexOfFirstAgency, indexOfLastAgency);

  // Обработчики для изменения страницы
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="agency-container">
      <div className="agency-content">
        {/* Левая сторона (Агентства) */}
        <div className="agency-list">
          {currentAgencies.map((agency) => (
            <div className="agency-card" key={agency.id}>
              <img
                src={agency.image}
                alt={agency.name}
                className="agency-image"
              />
              <div className="agency-info">
                <h3>{agency.name}</h3>
                <p>{agency.description}</p> {/* Описание */}
                <p>{agency.address}</p>
                <p>📞 {agency.phone}</p>
                <p>✉️ {agency.email}</p>
                <button className="view-listings">View Listings</button>
              </div>
            </div>
          ))}
        </div>

        {/* Правая сторона (Discover) */}
        <div className="discover-section">
          <h2 className="discover-title">Discover</h2>
          <ul className="discover-list">
            {[
              "Apartment",
              "Condo",
              "House",
              "Office",
              "Shop",
              "Studio",
              "Villa",
            ].map((item) => (
              <li key={item} className="discover-item">
                {item} <span>(15)</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Пагинация */}
      <div className="pagination">
        <button
          className="prev"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        {/* Отображение номеров страниц */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="next"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Agency;
