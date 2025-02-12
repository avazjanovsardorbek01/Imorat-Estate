import { useEffect, useState } from "react";

export default function Apartments() {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Sahifa raqamini 1 dan boshlaymiz
  const [page, setPage] = useState(1);
  // Har bir sahifada nechta element ko'rsatilishini belgilaymiz
  const perPage = 12;

  useEffect(() => {
    async function fetchApartments() {
      setLoading(true);
      try {
        // Agar backendda barcha natijalarni bir martada olish mumkin bo'lsa,
        // limitni juda katta qilib yuborish mumkin (masalan, 1000)
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
            limit: 1000, // barcha natijalarni olish uchun
            page: 0, // barcha maʼlumotlar uchun offset 0
          }),
        });

        if (!response.ok) {
          throw new Error(`Server xatosi: ${response.status}`);
        }

        const result = await response.json();
        console.log("Server javobi:", result);

        if (Array.isArray(result?.data) && Array.isArray(result?.images)) {
          const mergedApartments = result.data.map((apartment, index) => ({
            ...apartment,
            image: result.images[index] || "/no-image.jpg",
          }));
          // Qayta so'rov natijasidagi barcha maʼlumotlarni saqlaymiz
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

  // Paginatsiya uchun: hozirgi sahifadagi 12 ta maʼlumotni ajratib olaylik
  let currentApartments = apartments.slice(
    (page - 1) * perPage,
    page * perPage
  );

  // Umumiy nechta sahifa borligini hisoblaymiz
  const totalPages = Math.ceil(apartments.length / perPage);
  // Agar maʼlumotlar 120 tadan oshsa, maksimal 10 ta button ko‘rsatamiz
  const pagesToShow = totalPages > 20 ? 20 : totalPages;

  return (
    <div className="apartment-list">
      <h1>Список квартир</h1>
      {error && <p className="error">{error}</p>}
      {!error && apartments.length === 0 && !loading && (
        <p>Нет доступных квартир</p>
      )}
      {loading && <p>Загрузка...</p>}

      <div className="apartment-grid">
        {currentApartments.map((item, index) => (
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

      {/* Paginatsiya buttonlari */}
      <div className="pagination">
        {Array.from({ length: pagesToShow }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>

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
        .pagination {
          margin-top: 20px;
          text-align: center;
        }
        .pagination button {
          margin: 0 5px;
          padding: 8px 12px;
          border: none;
          background-color: #f0f0f0;
          cursor: pointer;
          border-radius: 4px;
        }
        .pagination button.active {
          background-color: #0070f3;
          color: white;
        }
      `}</style>
    </div>
  );
}
