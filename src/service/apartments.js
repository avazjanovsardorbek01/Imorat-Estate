export async function POST(req) {
  try {
    const { page = 0, limit = 10 } = await req.json();

    const response = await fetch(`http://127.0.0.1/api/server/virtuoso`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filter: { category: "Жилая", price_min: 50000, price_max: 100000 },
        limit,
        offset: page * limit, // Используем offset для постраничной загрузки
      }),
    });

    if (!response.ok) {
      throw new Error(`Ошибка сервера CRM: ${response.status}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return Response.json(
      { message: "Ошибка загрузки данных" },
      { status: 500 }
    );
  }
}
