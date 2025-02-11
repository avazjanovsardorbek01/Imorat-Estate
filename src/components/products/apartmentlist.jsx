import { useEffect, useState } from "react";

export default function Apartments() {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  async function fetchApartments() {
    if (!hasMore) return;
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
          limit: 10,
          page: page * 10,
        }),
      });

      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }

      const result = await response.json();
      console.log("Ответ сервера:", result);

      if (Array.isArray(result?.data) && Array.isArray(result?.images)) {
        const mergedApartments = result.data.map((apartment, index) => ({
          ...apartment,
          image: result.images[index] || "/no-image.jpg",
        }));

        setApartments((prev) => [...prev, ...mergedApartments]);
        if (result.data.length < 10) {
          setHasMore(false);
        }
      } else {
        throw new Error("Некорректный формат данных от сервера");
      }
    } catch (error) {
      console.error("Ошибка загрузки:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApartments();
  }, [page]);

  return (
    <div className="apartment-list">
      <h1>Список квартир</h1>
      {error && <p className="error">{error}</p>}
      {!error && apartments.length === 0 && !loading && (
        <p>Нет доступных квартир</p>
      )}

      <div className="apartment-grid">
        {apartments.map((item, index) => (
          <div key={index} className="property-item">
            <img
              src={`http://127.0.0.1${item.image[0]}`}
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

      {hasMore && (
        <button
          className="view_more_btn"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={loading}
        >
          {loading ? "Загрузка..." : "Загрузить еще"}
        </button>
      )}

      <style jsx>{`
        .apartment-list {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .apartment-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }

        .property-item {
          position: relative;
          margin: 20px !important;
          transition: 400ms ease;
          border-radius: 10px !important;
          overflow: hidden !important;
          border: 1px solid lightgrey !important;
        }

        .property-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 0 10px 2px lightgrey;
          cursor: pointer;
        }

        .apartment-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .apartment-info {
          padding: 15px;
        }

        .apartment-info h3 {
          margin: 0 0 10px;
          font-size: 18px;
        }

        .apartment-info p {
          margin: 5px 0;
          font-size: 14px;
        }

        .error {
          color: red;
          text-align: center;
          font-size: 18px;
        }

        .view_more_btn {
          display: block;
          margin: 30px auto;
          height: 55px;
          width: 215px;
          background-color: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          box-shadow: 0 0 45px 35px #fff;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
