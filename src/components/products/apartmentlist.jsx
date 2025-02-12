import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./apartmentlist.css";

export default function Apartments() {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchApartments() {
      setLoading(true);
      try {
        const response = await fetch("http://127.0.0.1/api/server/virtuoso", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filter: {
              category: "Жилая",
              price_min: 50000,
              price_max: 100000,
            },
            limit: 1000,
            page: 0,
          }),
        });

        if (!response.ok) {
          throw new Error(`Server xatosi: ${response.status}`);
        }

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
    }

    fetchApartments();
  }, []);

  const currentApartments = apartments.slice(
    (page - 1) * perPage,
    page * perPage
  );
  const totalPages = Math.ceil(apartments.length / perPage);

  return (
    <div className="apartment-list">
      <h1>Список квартир</h1>
      {error && <p className="error">{error}</p>}
      {!error && apartments.length === 0 && !loading && (
        <p>Нет доступных квартир</p>
      )}
      {loading && <p>Загрузка...</p>}

      <div className="apartment-grid">
        {currentApartments.map((item) => (
          <div
            key={item.id}
            className="property-item"
            onClick={() => navigate(`/show/${item.id}`)} // TO'G'RI YO'NALISH
          >
            <img
              src={`http://127.0.0.1${item.image}`}
              alt="Фото квартиры"
              className="apartment-image"
            />
            <div className="apartment-info">
              <h3>{item.zagolovok || "Без названия"}</h3>
              <p>
                Цена:{" "}
                {item.system_prod_price
                  ? `${item.system_prod_price} $`
                  : "Не указана"}
              </p>
              <p>Город: {item.gorod || "Не указан"}</p>
              <p>
                Площадь:{" "}
                {item.obshhaya_ploshhad
                  ? `${item.obshhaya_ploshhad} м²`
                  : "Не указана"}
              </p>
              <p>Адрес: {item.subrajon || "Не указан"}</p>
              <p>
                Тип недвижимости: {item.tip_nedvizhimosti?.[0] || "Не указан"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
