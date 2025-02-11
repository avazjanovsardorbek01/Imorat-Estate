import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import "./about.css";

const About = () => {
  const teamMembers = [
    {
      name: "Анна Смирнова",
      position: "CEO",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
    },
    {
      name: "Михаил Петров",
      position: "Главный риелтор",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
    },
    {
      name: "Елена Иванова",
      position: "Финансовый директор",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    },
    {
      name: "Дмитрий Козлов",
      position: "Руководитель отдела продаж",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    },
  ];

  // Данные для отзывов
  const testimonials = [
    {
      name: "Мария Соколова",
      role: "Владелец квартиры",
      text: "Благодаря команде профессионалов мы нашли идеальную квартиру за короткий срок. Очень довольны сервисом и отношением к клиентам.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
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
      <section
        className="about-hero-section"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
          url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3')`,
        }}
      >
        <div className="about-hero-content">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Создаем пространство для жизни
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Более 10 лет опыта в сфере недвижимости
          </motion.p>
          <motion.button
            className="cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Узнать больше
          </motion.button>
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
          <h2 data-aos="fade-up">Готовы найти дом мечты?</h2>
          <motion.button
            className="cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Связаться с нами
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default About;
