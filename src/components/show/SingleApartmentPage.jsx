import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaRulerCombined,
  FaHome,
  FaPhone,
  FaHeart,
  FaBed,
  FaBath,
  FaParking,
  FaPlayCircle,
  FaPauseCircle,
  FaMoneyBillWave,
} from "react-icons/fa";
import "./singleapartmentpage.css";

const SingleApartmentPage = () => {
  const { id } = useParams();
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    const fetchApartment = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://127.0.0.1/api/server/object", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          throw new Error(`Ошибка сервера: ${response.status}`);
        }

        const result = await response.json();
        if (Array.isArray(result?.data) && result.data.length > 0) {
          const apartmentData = result.data[0];
          apartmentData.images = result.images?.[0] || [];
          setApartment(apartmentData);
        } else {
          throw new Error("Квартира не найдена");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApartment();
  }, [id]);

  const handleImageClick = (index) => {
    setActiveImage(index);
    setIsImageModalOpen(true);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Загрузка данных...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h2>Произошла ошибка</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!apartment) {
    return (
      <div className="not-found-container">
        <h2>Квартира не найдена</h2>
        <p>Запрашиваемая недвижимость не существует или была удалена.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="single-apartment-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="apartment-container">
        <motion.div className="image-gallery-section">
          <div className="main-image-container">
            <motion.img
              src={`http://127.0.0.1${apartment.images[activeImage]}`}
              alt="Основное фото"
              layoutId={`main-image-${activeImage}`}
              onClick={() => setIsImageModalOpen(true)}
            />
          </div>

          <motion.div className="image-thumbnails">
            {apartment.images.map((img, index) => (
              <motion.div
                key={index}
                className={`thumbnail ${activeImage === index ? "active" : ""}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveImage(index)}
              >
                <img
                  src={`http://127.0.0.1${img}`}
                  alt={`Фото ${index + 1}`}
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="details-section"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="property-header">
            <motion.h1>{apartment.name}</motion.h1>
          </div>

          <div className="property-main-features">
            <div className="feature">
              <FaMoneyBillWave />
              <span>${apartment.system_prod_price || "Цена не указан"}</span>
            </div>
            <div className="feature">
              <FaRulerCombined />
              <span>
                {apartment.obshhaya_ploshhad
                  ? `${apartment.obshhaya_ploshhad} м²`
                  : "Площадь не указана"}
              </span>
            </div>
            <div className="feature">
              <FaHome />
              <span>{apartment.tip_nedvizhimosti?.[0] || "Тип не указан"}</span>
            </div>
          </div>

          <div className="property-additional-features">
            <div className="feature">
              <FaBed />
              <span>{apartment.kolichestvo_komnat || "N/A"} комнат</span>
            </div>
            <div className="feature">
              <FaBath />
              <span>{apartment.kolichestvo_sanuzlov || "N/A"} с/у</span>
            </div>
            <div className="feature">
              <FaParking />
              <span>
                {apartment.parkovka ? "Есть парковка" : "Нет парковки"}
              </span>
            </div>
          </div>

          <div className="property-description">
            <h3>Описание</h3>
            <p style={{ maxHeight: "200px", overflowY: "auto" }}>
              {apartment.opisanie || "Описание отсутствует"}
            </p>
          </div>
          <div className="action-buttons">
            <motion.a
              href="https://t.me/mehagulyamova"
              target="_blank"
              className="btn-contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPhone /> Связаться
            </motion.a>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div
            className="image-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsImageModalOpen(false)}
          >
            <motion.img
              src={`http://127.0.0.1${apartment.images[activeImage]}`}
              alt="Увеличенное фото"
              layoutId={`main-image-${activeImage}`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SingleApartmentPage;
