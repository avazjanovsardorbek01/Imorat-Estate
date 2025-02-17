import React from "react";
import "./home.css";
import Carousel from "../../components/carousel/carousel";
import SearchHome from "../../assets/Images/SearchHome.jpg";
import Credit from "../../assets/Images/Credit.jpeg";
import ApartmentList from "../../components/products/apartmentlist";
import {
  FaStar,
  FaHome,
  FaMoneyBillWave,
  FaHandshake,
  FaClock,
  FaShieldAlt,
  FaTags,
  FaMapMarkerAlt,
  FaPercentage,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

const Index = () => {
  return (
    <div className="main-container">
      <section className="hero">
        <div className="carousel-home">
        <Carousel />
        </div>
      </section>
      <section className="apartments">
        <ApartmentList />
      </section>
      <section className="advantages">
        <h2 className="section-title">Наши преимущества</h2>
        <div className="advantages-grid">
          <div className="advantage-card">
            <FaHome className="advantage-icon" />
            <h3>Большой выбор</h3>
            <p>Более 1000 объектов недвижимости в базе</p>
          </div>
          <div className="advantage-card">
            <FaMoneyBillWave className="advantage-icon" />
            <h3>Выгодные цены</h3>
            <p>Лучшие предложения на рынке недвижимости</p>
          </div>
          <div className="advantage-card">
            <FaHandshake className="advantage-icon" />
            <h3>Надёжность</h3>
            <p>Все сделки юридически защищены</p>
          </div>
          <div className="advantage-card">
            <FaClock className="advantage-icon" />
            <h3>Быстрая сделка</h3>
            <p>Оформление документов за 24 часа</p>
          </div>
        </div>
      </section>

      <section className="dream">
        <div className="dream-content">
          <div className="text-content">
            <h2>Мы поможем вам найти дом мечты</h2>
            <p className="dream-description">
              Доверьте нам поиск вашего идеального дома. Мы предлагаем лучшие
              варианты недвижимости с учетом всех ваших пожеланий и требований.
            </p>

            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">
                  <FaShieldAlt />
                </div>
                <div className="feature-text">
                  <strong>Гарантия на всю жизнь</strong>
                  <p>Полная поддержка и сопровождение на всех этапах</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <FaTags />
                </div>
                <div className="feature-text">
                  <strong>Самые низкие цены</strong>
                  <p>Гарантируем лучшие цены на рынке недвижимости</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="feature-text">
                  <strong>Выгодное расположение</strong>
                  <p>Объекты в лучших районах города</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <FaPercentage />
                </div>
                <div className="feature-text">
                  <strong>Низкие налоги</strong>
                  <p>Оптимальные условия налогообложения</p>
                </div>
              </div>
            </div>
          </div>

          <div className="image-content">
            <img src={SearchHome} alt="Dream home" className="dream-image" />
            <div className="image-overlay"></div>
          </div>
        </div>
      </section>

      <section className="credit">
        <div className="credit-container">
          <div className="credit-content">
            <h2 className="credit-title">Нужен ипотечный кредит?</h2>
            <h3 className="credit-subtitle">Получите одобрение за 24 часа</h3>
            <div className="credit-description">
              <p>
                Мы сотрудничаем с ведущими банками и помогаем получить ипотеку
                на самых выгодных условиях. Наши специалисты проведут полную
                консультацию и подберут оптимальную программу кредитования.
              </p>
              <p>
                Благодаря нашему опыту и партнерским отношениям с банками, мы
                гарантируем высокий процент одобрения и минимальные процентные
                ставки для наших клиентов.
              </p>
              <ul className="credit-features">
                <li>
                  <FaCheckCircle />
                  Ставка от 4.5% годовых
                </li>
                <li>
                  <FaCheckCircle />
                  Срок до 30 лет
                </li>
                <li>
                  <FaCheckCircle />
                  Первоначальный взнос от 10%
                </li>
                <li>
                  <FaCheckCircle />
                  Быстрое рассмотрение заявки
                </li>
              </ul>
              <button className="credit-button">
                Получить консультацию
                <FaArrowRight />
              </button>
            </div>
          </div>

          <div className="credit-image-wrapper">
            <div className="background-shape"></div>
            <div className="image-container">
              <img src={Credit} alt="Ипотечный кредит" className="credit-img" />
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2 className="section-title">Отзывы наших клиентов</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-quote">"</div>
            <p className="testimonial-text">
              Выражаю огромную благодарность агентству недвижимости за помощь в
              покупке квартиры! Специалисты компании помогли найти именно то,
              что мы искали.
            </p>
            <div className="testimonial-rating">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <div className="testimonial-author">
              <div className="author-info">
                <h4>Екатерина Смирнова</h4>
                <span>Покупка 3-комнатной квартиры</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-quote">"</div>
            <p className="testimonial-text">
              Профессиональный подход к делу! Продали нашу квартиру по хорошей
              цене в короткие сроки. Все документы были оформлены грамотно.
            </p>
            <div className="testimonial-rating">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <div className="testimonial-author">
              <div className="author-info">
                <h4>Александр Иванов</h4>
                <span>Продажа недвижимости</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-quote">"</div>
            <p className="testimonial-text">
              Отличная компания! Помогли с выбором новостройки. Менеджер
              подробно рассказал о всех вариантах, показал несколько объектов.
            </p>
            <div className="testimonial-rating">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <div className="testimonial-author">
              <div className="author-info">
                <h4>Дмитрий Петров</h4>
                <span>Покупка квартиры в новостройке</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-quote">"</div>
            <p className="testimonial-text">
              Благодарю за помощь в поиске квартиры! Учли все пожелания,
              показали множество вариантов. Сделка прошла гладко.
            </p>
            <div className="testimonial-rating">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <div className="testimonial-author">
              <div className="author-info">
                <h4>Марина Козлова</h4>
                <span>Покупка 2-комнатной квартиры</span>
              </div>
            </div>
          </div>
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
