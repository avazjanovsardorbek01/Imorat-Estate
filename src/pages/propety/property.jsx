import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./property.css";
import ErrorPhoto from "../../assets/Images/404-error.jpg";
import HeroThree from "../../assets/Images/HeroThree.png";

const Property = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: "",
    priceMin: "",
    priceMax: "",
    areaMin: "",
    areaMax: "",
    microDistrict: "",
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1/api/server/virtuoso", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filter: {},
          limit: 1000,
          page: 0,
        }),
      });

      if (!response.ok)
        throw new Error(`HTTP error status: ${response.status}`);
      const result = await response.json();

      if (Array.isArray(result?.data)) {
        const mergedProperties = result.data.map((property, index) => ({
          ...property,
          image: result.images?.[index] || "/no-image.jpg",
        }));
        setProperties(mergedProperties);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchApartments();
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="property-page">
      {/* Hero Section */}
      <motion.section
        className="property-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          backgroundImage: `url(${HeroThree})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "150px", // Можно изменить по необходимости
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div className="hero-content">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          ></motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          ></motion.p>
        </div>
      </motion.section>

      {/* Filter Section */}
      <form onSubmit={handleSubmit} className="form-search">
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="first-select"
        >
          <option value="">Все</option>
          <option value="Жилая">Жилая</option>
          <option value="Коммерческая">Коммерческая</option>
        </select>

        <input
          type="number"
          name="priceMin"
          placeholder="Стоимость от ($)"
          value={filters.priceMin}
          onChange={handleFilterChange}
          className="input-field"
        />
        <input
          type="number"
          name="priceMax"
          placeholder="Стоимость до ($)"
          value={filters.priceMax}
          onChange={handleFilterChange}
          className="input-field"
        />

        <input
          type="number"
          name="areaMin"
          placeholder="Площадь от (м²)"
          value={filters.areaMin}
          onChange={handleFilterChange}
          className="input-field"
        />
        <input
          type="number"
          name="areaMax"
          placeholder="Площадь до (м²)"
          value={filters.areaMax}
          onChange={handleFilterChange}
          className="input-field"
        />

        <input
          type="text"
          name="microDistrict"
          placeholder="Микрорайон"
          value={filters.microDistrict}
          onChange={handleFilterChange}
          className="input-field"
        />

        <button type="submit" className="search-btn">
          Применить фильтры
        </button>
      </form>

      {/* Properties Grid */}
      <section className="properties-section">
        {loading ? (
          <div className="loader"></div>
        ) : error ? (
          <div className="error-property">
            <img src={ErrorPhoto} alt="Ошибка загрузки" />
          </div>
        ) : (
          <motion.div
            className="properties-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {properties.map((property) => (
              <motion.div
                key={property.id}
                className="property-card"
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                onClick={() => navigate(`/show/${property.id}`)}
              >
                <div className="card-image">
                  <img
                    src={`http://127.0.0.1${property.image[0]}`}
                    alt={property.zagolovok}
                  />
                  y{" "}
                </div>
                <div className="card-content">
                  <h3 className="price-card">
                    ${property.system_prod_price || "Цена не указанна "}
                  </h3>
                  <h3>{property.zagolovok || "Без названия"}</h3>
                  <div className="property-details">
                    <span>
                      <i className="fas fa-map-marker-alt"></i>{" "}
                      {property.gorod || "Не указан"}
                    </span>
                    <span>
                      <i className="fas fa-ruler-combined"></i>{" "}
                      {property.obshhaya_ploshhad
                        ? `${property.obshhaya_ploshhad} м²`
                        : "Не указана"}
                    </span>
                    <span>
                      <i className="fas fa-home"></i>{" "}
                      {property.tip_nedvizhimosti?.[0] || "Не указан"}
                    </span>
                    <button className="btn-more">Подробнее</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Property;
