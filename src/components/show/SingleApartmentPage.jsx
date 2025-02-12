import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

const SingleApartmentPage = () => {
  const { id } = useParams();
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchApartment() {
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
        console.log("Данные квартиры:", result);

        if (Array.isArray(result?.data) && result.data.length > 0) {
          const apartmentData = result.data[0];
          apartmentData.image = result.images?.[0] || [];
          setApartment(apartmentData);
        } else {
          setApartment(null);
        }
      } catch (error) {
        console.error("Ошибка:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchApartment();
  }, [id]);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" textAlign="center" mt={4}>
        Ошибка: {error}
      </Typography>
    );

  if (!apartment)
    return (
      <Typography textAlign="center" mt={4}>
        Квартира не найдена
      </Typography>
    );

  return (
    <Box
      display="flex"
      justifyContent="center"
      mt={5}
      style={{ marginTop: "100px" }}
    >
      <Card sx={{ maxWidth: 600, boxShadow: 5 }}>
        <CardMedia
          component="img"
          height="300"
          image={`http://127.0.0.1${apartment.image[0]}`}
          alt="Фото квартиры"
        />
        <CardContent>
          <Typography variant="h5" fontWeight="bold">
            {apartment.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {apartment.zagolovok || "Без названия"}
          </Typography>
          <Typography variant="body1" mt={1}>
            <strong>Цена:</strong>{" "}
            {apartment.system_prod_price
              ? `${apartment.system_prod_price} $`
              : "Не указана"}
          </Typography>
          <Typography variant="body1">
            <strong>Город:</strong> {apartment.gorod || "Не указан"}
          </Typography>
          <Typography variant="body1">
            <strong>Площадь:</strong>{" "}
            {apartment.obshhaya_ploshhad
              ? `${apartment.obshhaya_ploshhad} м²`
              : "Не указана"}
          </Typography>
          <Typography variant="body1">
            <strong>Адрес:</strong> {apartment.subrajon || "Не указан"}
          </Typography>
          <Typography variant="body1">
            <strong>Тип недвижимости:</strong>{" "}
            {apartment.tip_nedvizhimosti?.[0] || "Не указан"}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SingleApartmentPage;
