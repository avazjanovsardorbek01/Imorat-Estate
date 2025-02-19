import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import { postContact } from "../../api/api";
import "./contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      await postContact(formData);
      setSubmitSuccess(true);
      setFormData({ fullName: "", email: "", phone: "", message: "" });
    } catch (error) {
      setSubmitError("Ошибка при отправке, попробуйте снова.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Адрес",
      content: "Массив Кашгар, 12, Ташкент",
    },
    {
      icon: <FaPhone />,
      title: "Телефон",
      content: "(97) 777-79-31",
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      content: "info@example.com",
    },
    {
      icon: <FaClock />,
      title: "Режим работы",
      content: "Пн-Пт: 9:00 - 20:00",
    },
  ];
  return (
    <div className="contact-page">
      <motion.section
        className="contact-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Свяжитесь с нами</h1>
          <p>Мы готовы помочь вам найти идеальную недвижимость</p>
        </div>
      </motion.section>

      <div className="contact-content">
        <motion.div
          className="contact-info-section"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2>Контактная информация</h2>
          <div className="info-grid">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="info-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="info-icon">{info.icon}</div>
                <h3>{info.title}</h3>
                <p>{info.content}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="contact-form-section"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="form-container">
            <h2>Отправить сообщение</h2>

            {submitSuccess && (
              <motion.div
                className="success-message"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Ваше сообщение успешно отправлено!
              </motion.div>
            )}

            {submitError && (
              <motion.div
                className="error-message"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {submitError}
              </motion.div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="input-icon">
                  <FaUser />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Ваше имя"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-icon">
                  <FaEnvelope />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Ваш email"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-icon">
                  <FaPhone />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Ваш телефон"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Ваше сообщение"
                  required
                  rows="5"
                />
              </div>

              <motion.button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? "Отправка..." : "Отправить сообщение"}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* <motion.div
      className="map-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000!2d0!3d0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM40zMCcwLjAiTiAwwrAwJzAuMCJF!5e0!3m2!1sen!2sus!4v1234567890"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </motion.div> */}
    </div>
  );
};

export default Contact;
