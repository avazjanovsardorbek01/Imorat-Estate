import React from "react";
import "./contact.css"; // Импортируйте CSS файл

const Contact = () => {
  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <h1>Свяжитесь с нами</h1>
          <p>
            Мы готовы помочь вам найти ваш дом мечты. Свяжитесь с нашей командой
            экспертов уже сегодня.
          </p>
        </div>
      </section>

      <div className="contact-container">
        <div className="info-cards">
          <div className="info-card">
            <i className="fas fa-phone"></i>
            <h3>Позвоните нам</h3>
            <p>+1 (234) 567-8900</p>
            <p>Пн-Пт 9:00-18:00</p>
          </div>
          <div className="info-card">
            <i className="fas fa-envelope"></i>
            <h3>Напишите нам</h3>
            <p>info@realestate.com</p>
            <p>Поддержка 24/7</p>
          </div>
          <div className="info-card">
            <i className="fas fa-map-marker-alt"></i>
            <h3>Посетите нас</h3>
            <p>123 Real Estate Ave</p>
            <p>Нью-Йорк, NY 10001</p>
          </div>
          <div className="info-card">
            <i className="fas fa-clock"></i>
            <h3>Часы работы</h3>
            <p>Понедельник - Пятница</p>
            <p>9:00 - 18:00</p>
          </div>
        </div>

        <div className="contact-form">
          <h2>Отправьте нам сообщение</h2>
          <form>
            <div className="form-group">
              <label>Полное имя</label>
              <input type="text" required />
            </div>
            <div className="form-group">
              <label>Электронная почта</label>
              <input type="email" required />
            </div>
            <div className="form-group">
              <label>Телефон</label>
              <input type="tel" required />
            </div>
            <div className="form-group">
              <label>Сообщение</label>
              <textarea rows="5" required></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Отправить сообщение
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
