import React, { useEffect } from "react";
import axios from "axios"; // Axiosni import qilish
import "./home.css";
import Carousel from "../../components/carousel/carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons"; // FontAwesome Search Icon
import Listings from "../../components/cards/listings";
import SearchHome from "../../assets/Images/SearchHome.jpg";
import Credit from "../../assets/Images/Credit.jpeg";
import FamilyHouse from "../../assets/Images/happy-family-house.avif";

const Index = () => {
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="container">
      <section className="hero">
        <div className="hero-content">
          <div className="search-container">
            <Carousel />
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
          </div>
        </div>
      </section>
      <section className="Listings">
        <div className="listings-head">
          <h3>Последние объявления</h3>
          <button className="view-btn">Посмотреть все</button>
        </div>
        <Listings />
      </section>
      <section className="Dream">
        <div className="text-content">
          <h2>Мы поможем вам найти дом мечты</h2>
          <p>
            Краткое описание услуги, например: "Наш сервис предлагает лучшие
            варианты недвижимости для покупки и аренды."
          </p>

          <div className="features">
            <div className="feature-item">
              <strong>Гарантия на всю жизнь</strong>
              <p>
                Описание гарантии, например: "Мы предоставляем долгосрочную
                поддержку."
              </p>
            </div>
            <div className="feature-item">
              <strong>Самые низкие цены среди конкурентов</strong>
            </div>
            <div className="feature-item">
              <strong>Выгодное расположение</strong>
            </div>
            <div className="feature-item">
              <strong>Низкие налоги</strong>
            </div>
          </div>
        </div>

        <div className="image-placeholder">
          <img src={SearchHome} alt="Dream home" />
        </div>
      </section>
      <section className="credit">
        <div className="credit-content">
          <h2>Нужен ипотечный кредит? Получите одобрение</h2>
          <p>
            Создание красивого дизайна веб-сайта в соответствии с
            фундаментальными принципами пользовательского опыта, которые
            тщательно анализируются нашими UX-дизайнерами.
          </p>
          <p>
            Мы создаем привлекательные визуальные решения, чтобы клиенты
            оставались довольны и могли легко воспринимать информацию. Первое
            впечатление — это наш главный инструмент для привлечения внимания
            пользователей к создаваемому нами сайту.
          </p>
          <button className="credit-button">Подробнее</button>
        </div>

        <div className="credit-image">
          <div className="background-shape"></div>
          <div className="image-credit">
            <img src={Credit} alt="Изображение кредита" />
          </div>
        </div>
      </section>
      <section className="listing-categories">
        <div className="listing-categories__header">
          <h1>Категории объявлений</h1>
          <p>
            Выберите категорию объявлений, чтобы найти идеальное жилье. У нас
            есть дома, виллы и квартиры на любой вкус!
          </p>

          <div className="categories-buttons">
            <button className="listing-categories__button">Все</button>
            <button className="listing-categories__button">Дома</button>
            <button className="listing-categories__button">Виллы</button>
            <button className="listing-categories__button">Квартиры</button>
          </div>
        </div>
        <div className="listing-categories__listings">
          <Listings />
          <Listings />
        </div>
      </section>
      <section className="house-family">
        <div className="house-family__content">
          <h2>Уютный и комфортабельный дом для семьи</h2>
          <p>
            Небольшие детали, которые делают дом идеальным местом для вашего
            комфорта и уюта. Здесь каждый уголок наполнен теплом и заботой.
          </p>
          <div className="house-family__rating">⭐ ⭐ ⭐ ⭐ ⭐</div>
          <div className="house-family__author">
            <strong>Парк Тиа Хён</strong>
            <span>Продавец баксо</span>
          </div>
          <div className="house-family__arrows">
            <button className="house-family__arrow">←</button>
            <button className="house-family__arrow">→</button>
          </div>
        </div>
        <div className="house-family__image">
          <img src={FamilyHouse} alt="" />
        </div>
      </section>
      <section className="life-house">
        <p>Получите роскошное и дешевое жилье с гарантией на всю жизнь.</p>
        <button>Связаться сейчас</button>
      </section>
    </div>
  );
};

export default Index;
