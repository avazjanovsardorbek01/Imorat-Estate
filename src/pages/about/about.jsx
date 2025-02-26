import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import "./about.css";
import HeroAbout from "../../assets/Images/HeroOne.jpg";
import { Carousel } from "antd";
import CarouselContainer from "../../components/carousel/carousel";
import Manager from "../../assets/Images/manager.png";
import Agent from "../../assets/Images/agent.png";
import Marketolog from "../../assets/Images/marketolog.jpg";
import ClientOne from "../../assets/Images/ClientOne.jpg";
const About = () => {
  const teamMembers = [
    {
      name: "Мехри Гулямова",
      position: "Manager",
      image: Manager,
    },
    {
      name: "Полторан Егор",
      position: "Главный операционный директор",
      image: Agent,
    },
    {
      name: "Бауетдинов Рауф",
      position: "Маркетолог",
      image: Marketolog,
    },
  ];

  // Данные для отзывов
  const testimonials = [
    {
      name: "Хуршид Жораев",
      role: "Владелец квартиры",
      text: "Благодаря команде профессионалов мы нашли идеальную квартиру за короткий срок. Очень довольны сервисом и отношением к клиентам.",
      image: ClientOne,
    },
    {
      name: "Александр Волков",
      role: "Инвестор",
      text: "Отличная компания с профессиональным подходом к работе. Помогли с выбором инвестиционной недвижимости.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    },
  ];

  // Данные для преимуществ
  const advantages = [
    {
      icon: "🏠",
      title: "Качественные объекты",
      description: "Тщательная проверка каждого объекта недвижимости",
    },
    {
      icon: "💎",
      title: "Выгодные условия",
      description: "Индивидуальный подход и гибкая система скидок",
    },
    {
      icon: "🤝",
      title: "Экспертная поддержка",
      description: "Сопровождение сделки на всех этапах",
    },
    {
      icon: "📋",
      title: "Юридическая чистота",
      description: "Полная проверка документов и правовая поддержка",
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    // Анимация чисел
    const animateValue = (element, start, end, duration) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const endValue = parseInt(element.getAttribute("data-value"));
          animateValue(element, 0, endValue, 2000);
          observer.unobserve(element);
        }
      });
    });

    document
      .querySelectorAll(".stat-number")
      .forEach((el) => observer.observe(el));
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="carousel-about">
          <CarouselContainer />
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-card" data-aos="fade-up">
            <span className="stat-number" data-value="1200">
              0
            </span>
            <p>Довольных клиентов</p>
          </div>
          <div className="stat-card" data-aos="fade-up" data-aos-delay="100">
            <span className="stat-number" data-value="150">
              0
            </span>
            <p>Реализованных проектов</p>
          </div>
          <div className="stat-card" data-aos="fade-up" data-aos-delay="200">
            <span className="stat-number" data-value="10">
              0
            </span>
            <p>Лет опыта</p>
          </div>
          <div className="stat-card" data-aos="fade-up" data-aos-delay="300">
            <span className="stat-number" data-value="25">
              0
            </span>
            <p>Профессионалов</p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-container">
          <div className="mission-text" data-aos="fade-right">
            <h2>Наша миссия</h2>
            <p>
              Мы стремимся создавать комфортное пространство для жизни, где
              каждый клиент находит свой идеальный дом. Наша команда
              профессионалов работает над тем, чтобы процесс выбора и покупки
              недвижимости был максимально простым и приятным.
            </p>
          </div>
          <div className="mission-image" data-aos="fade-left">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
              alt="Our Mission"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-us-section">
        <h2 data-aos="fade-up">Почему выбирают нас?</h2>
        <div className="advantages-grid">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              className="advantage-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              whileHover={{ scale: 1.05 }}
            >
              <div className="advantage-icon">{advantage.icon}</div>
              <h3>{advantage.title}</h3>
              <p>{advantage.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2 data-aos="fade-up">Наша команда</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="team-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              whileHover={{ scale: 1.05 }}
            >
              <div className="team-image">
                <img src={member.image} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <p>{member.position}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2 data-aos="fade-up">Отзывы клиентов</h2>
        <div className="testimonials-container">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="testimonial-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              whileHover={{ scale: 1.02 }}
            >
              <div className="testimonial-image">
                <img src={testimonial.image} alt={testimonial.name} />
              </div>
              <p className="testimonial-text">{testimonial.text}</p>
              <h4>{testimonial.name}</h4>
              <p className="testimonial-role">{testimonial.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 style={{ color: "white" }} data-aos="fade-up">
            Готовы найти дом мечты?
          </h2>
          <motion.a
            href="https://t.me/mehagulyamova"
            className="cta-button"
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.95 }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Связаться с нами
          </motion.a>
        </div>
      </section>
    </div>
  );
};

export default About;
