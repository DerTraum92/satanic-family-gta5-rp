// netlify/functions/updateApplication.js
exports.handler = async function(event, context) {
  const { id } = event.pathParameters;
  const application = JSON.parse(event.body); // Получаем обновленные данные заявки

  // Здесь тебе нужно будет обновить данные заявки (например, в базе данных или другом хранилище)
  // Пока что просто выводим данные в консоль для примера
  console.log(`Обновляем заявку с ID ${id}:`, application);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Заявка обновлена" }),
  };
};
