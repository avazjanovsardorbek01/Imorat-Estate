import React from "react";
import "./footer.css";

const Index = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <span>Недвижимость</span>
        </div>
        <div className="footer-content">
          <div className="footer-section">
            <h3>Сделайте ваш дом более современным</h3>
            <p>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim.
            </p>
          </div>
          <div className="footer-section">
            <h3>Наши услуги</h3>
            <ul>
              <li>Аренда домов</li>
              <li>Продажа квартир</li>
              <li>Аренда вилл</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Поддержка</h3>
            <ul>
              <li>Обслуживание клиентов</li>
              <li>Напишите нам</li>
              <li>Политика конфиденциальности</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Социальные сети</h3>
            <ul>
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Twitter</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <ul className="footer-links">
          <li>Главная</li>
          <li>Исследовать</li>
          <li>Агентство</li>
          <li>Блог</li>
          <li>О нас</li>
          <li>Контакты</li>
        </ul>
        <p>Copyright Tanah Air Studio</p>
      </div>
    </footer>
  );
};

export default Index;
