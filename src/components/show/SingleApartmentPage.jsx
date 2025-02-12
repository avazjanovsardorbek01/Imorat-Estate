import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./singleapartmentpage.css";

const SingleApartmentPage = () => {
  const { id } = useParams();
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchApartment() {
      setLoading(true);
      try {
        const response = await fetch("http://127.0.0.1/api/server/virtuoso", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filter: {
              id: [id], // Передаем ID как массив
            },
            limit: 1,
            page: 0,
          }),
        });

        if (!response.ok) {
          throw new Error(`Ошибка сервера: ${response.status}`);
        }

        const result = await response.json();
        console.log("Данные квартиры:", result);

        if (Array.isArray(result?.data) && result.data.length > 0) {
          const apartmentData = result.data[0];
          apartmentData.image = result.images?.[0] || "/no-image.jpg"; // Добавляем картинку
          setApartment(apartmentData);
        } else {
          throw new Error("Квартира не найдена");
        }
      } catch (error) {
        console.error("Ошибка загрузки:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchApartment();
  }, [id]);

  if (loading) return <p className="loading">Загрузка...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!apartment) return <p className="not-found">Квартира не найдена</p>;

  return (
    <div className="single-apartment-container">
      <h1>{apartment.zagolovok || "Без названия"}</h1>
      <img
        src={`http://127.0.0.1${apartment.image[0]}`}
        alt="Фото квартиры"
        className="apartment-image"
      />
      <div className="apartment-details">
        <p>
          <strong>Цена:</strong> {apartment.system_prod_price || "Не указана"} $
        </p>
        <p>
          <strong>Город:</strong> {apartment.gorod || "Не указан"}
        </p>
        <p>
          <strong>Площадь:</strong>{" "}
          {apartment.obshhaya_ploshhad || "Не указана"} м²
        </p>
        <p>
          <strong>Адрес:</strong> {apartment.subrajon || "Не указан"}
        </p>
        <p>
          <strong>Тип недвижимости:</strong>{" "}
          {apartment.tip_nedvizhimosti?.[0] || "Не указан"}
        </p>
        <p>
          <strong>Описание:</strong> {apartment.description || "Нет описания"}
        </p>
      </div>
    </div>
  );
};

export default SingleApartmentPage;
