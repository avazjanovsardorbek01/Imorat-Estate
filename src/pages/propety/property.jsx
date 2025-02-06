import React, { useState, useEffect } from "react";
import Map from "../../assets/Images/Map.png";
import "./property.css";
import Listings from "../../components/cards/listings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons"; // FontAwesome Search Icon
import axios from "axios";

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Делаем запрос для получения количества объектов недвижимости
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.example.com/properties", {
          params: {
            page: currentPage, // Текущая страница
            limit: 10, // Количество объектов на странице
          },
        });
        const totalItems = response.data.totalCount; // Получаем общее количество объектов
        setTotalPages(Math.ceil(totalItems / 10)); // Расчет количества страниц
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchData();
  }, [currentPage]); // Срабатывает при изменении страницы

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container">
      <section className="Property-Hero">
        <img src={Map} alt="Map" className="hero-img" />
        <div className="bottom-carousel">
          <div className="buttons-trade">
            <button className="btn rent">Покупка</button>
            <button className="btn sell">Аренда</button>
          </div>
          <div className="form-search">
            <select className="first-select">
              <option value="">Выберите город</option>
              <option value="Toshkent">Ташкент</option>
              <option value="Samarqand">Самарканд</option>
              <option value="Buxoro">Бухара</option>
              <option value="Xiva">Хива</option>
              <option value="Namangan">Наманган</option>
              <option value="Andijon">Андижан</option>
              <option value="Farg'ona">Фергана</option>
            </select>

            <input
              type="number"
              placeholder="Минимальная цена ($)"
              className="input-field"
            />
            <input
              type="number"
              placeholder="Максимальная цена ($)"
              className="input-field"
            />

            <input
              type="number"
              placeholder="Площадь (м²)"
              className="input-field"
            />

            <select className="first-select">
              <option value="">Выберите категорию</option>
              <option value="Kvartira">Квартира</option>
              <option value="Uy">Дом</option>
              <option value="Ofis">Офис</option>
              <option value="Yer uchastkasi">Земельный участок</option>
            </select>

            <button className="search-btn">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              Поиск
            </button>
          </div>
        </div>
      </section>
      <section className="Property-cards">
        <Listings currentPage={currentPage} />
        <Listings currentPage={currentPage} />
        <Listings currentPage={currentPage} />
      </section>
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

export default Index;
