import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./apartmentlist.css";
import ErrorPhoto from "../../assets/Images/404-error.jpg";

export default function Apartments() {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    category: "",
    priceMin: "",
    priceMax: "",
    areaMin: "",
    areaMax: "",
    microDistrict: "",
  });
  const perPage = 6;
  const navigate = useNavigate();

  const fetchApartments = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1/api/server/virtuoso", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: {
            kategoriya_obekta: filters.category,
            price_ot: filters.priceMin,
            price_do: filters.priceMax,
            obshhaya_ploshhad_ot: filters.areaMin,
            obshhaya_ploshhad_do: filters.areaMax,
            subrajon: filters.microDistrict,
          },
          limit: 1000,
          page: 0,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server xatosi: ${response.status}`);
      }
      console.log(response.status);

      const result = await response.json();
      console.log("Server javobi:", result);

      if (Array.isArray(result?.data)) {
        const mergedApartments = result.data.map((apartment, index) => ({
          ...apartment,
          image: result.images?.[index] || "/no-image.jpg",
        }));
        setApartments(mergedApartments);
      } else {
        throw new Error("Serverdan noto‘g‘ri formatdagi maʼlumotlar keldi");
      }
    } catch (error) {
      console.error("Yuklashda xatolik:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, []);

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

  const currentApartments = apartments.slice(
    (page - 1) * perPage,
    page * perPage
  );
  const totalPages = Math.ceil(apartments.length / perPage);

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="apartment-list">
      {/* Filter Form */}
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

      {error && <img className="error" src={ErrorPhoto}></img>}
      {!error && apartments.length === 0 && !loading && (
        <p>Нет доступных квартир</p>
      )}
      {loading && <p>Загрузка...</p>}

      <div className="apartment-grid">
        {currentApartments.map((item) => (
          <div
            key={item.id}
            className="property-item"
            onClick={() => navigate(`/show/${item.id}`)}
          >
            <div className="apartment-image">
              <img
                src={`http://127.0.0.1${item.image[0]}`}
                alt="Фото квартиры"
              />
            </div>
            <div className="apartment-info">
              <h3 className="apartment-price">
                Цена:{" "}
                {item.system_prod_price
                  ? `${item.system_prod_price || item.system_prod_kom_price} $`
                  : ` ${
                      item.system_rent_price || item.system_rent_kom_price
                    } $`}
              </h3>
              <h3>{item.zagolovok || "Без названия"}</h3>
              <div className="apartment-details">
                <span>
                  <i id="housecha" className="fas fa-map-marker-alt"></i>{" "}
                  {item.gorod || "Не указан"}
                </span>
                <span>
                  <i className="fas fa-ruler-combined"></i>{" "}
                  {item.obshhaya_ploshhad
                    ? `${item.obshhaya_ploshhad} м²`
                    : "Не указана"}
                </span>
                <span>
                  <i className="fas fa-home"></i>{" "}
                  {item.tip_nedvizhimosti?.[0] || "Не указан"}
                </span>
                <button className="btn-more">Подробнее</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Предыдущий
        </button>
        <button
          className="pagination-button"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Следующий
        </button>
      </div>
    </div>
  );
}
