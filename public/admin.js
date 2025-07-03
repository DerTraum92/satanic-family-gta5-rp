// Загружаем заявки с сервера Render
async function fetchApplications() {
  try {
    const response = await fetch('https://satanic-family-gta5-rp.onrender.com/api/get-applications');  // API на Render
    if (response.ok) {
      const data = await response.json(); // Получаем данные с сервера в формате JSON
      displayApplications(data); // Отображаем заявки
    } else {
      console.error("Ошибка загрузки заявок");
    }
  } catch (error) {
    console.error("Ошибка:", error);
  }
}

// Логика авторизации
document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Новые логин и пароль
  const adminUsername = "nanami";  // Новый логин
  const adminPassword = "ds311002";  // Новый пароль

  if (username === adminUsername && password === adminPassword) {
    // Переход в админ-панель
    document.getElementById("login").style.display = "none"; // скрываем форму
    document.getElementById("request").style.display = "block"; // показываем админ панель
    fetchApplications();  // Загружаем заявки
  } else {
    alert("Неверный логин или пароль!");
  }
});

// Отображение заявок
function displayApplications(filteredApplications) {
  const requestList = document.getElementById("requestList");
  requestList.innerHTML = ""; // Очистка текущего списка заявок

  filteredApplications.forEach((application) => {
    const row = document.createElement("tr");
    row.classList.add("hover:bg-gray-700", "transition");

    row.innerHTML = `
      <td class="p-2 border border-white">${application.date}</td>
      <td class="p-2 border border-white">${application.nickname || 'Не указано'}</td>
      <td class="p-2 border border-white">${application.department || 'Не указано'}</td>
      <td class="p-2 border border-white">${application.discord || 'Не указано'}</td>
      <td class="p-2 border border-white">${application.comment || 'Нет комментария'}</td>
      <td class="p-2 border border-white">${application.url || 'Не указано'}</td> <!-- Ссылка на откат -->
      <td class="p-2 border border-white">${application.realName || 'Не указано'}</td> <!-- Реальное имя -->
      <td class="p-2 border border-white">${application.age || 'Не указано'}</td> <!-- Возраст -->
      <td class="p-2 border border-white">${application.timezone || 'Не указано'}</td> <!-- Часовой пояс -->
      <td class="p-2 border border-white">${application.experience || 'Не указано'}</td> <!-- Опыт игры -->
      <td class="p-2 border border-white">${application.previousFamilies || 'Не указано'}</td> <!-- В каких семьях был -->
      <td class="p-2 border border-white">${application.discordForContact || 'Не указано'}</td> <!-- Discord для связи -->
      <td class="p-2 border border-white flex gap-2">
        <button class="bg-green-700 px-2 py-1 rounded hover:bg-green-600" onclick="acceptApplication('${application._id}')">
          Принять
        </button>
        <button class="bg-red-700 px-2 py-1 rounded hover:bg-red-600" onclick="rejectApplication('${application._id}')">
          Отклонить
        </button>
      </td>
    `;

    requestList.appendChild(row);
  });
}

// Принять заявку
async function acceptApplication(id) {
  const response = await fetch(`https://satanic-family-gta5-rp.onrender.com/api/accept-application/${id}`, { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    alert("Заявка принята");
    fetchApplications();  // Перезагружаем заявки
  } else {
    alert("Ошибка при принятии заявки");
  }
}

// Отклонить заявку
async function rejectApplication(id) {
  const response = await fetch(`https://satanic-family-gta5-rp.onrender.com/api/reject-application/${id}`, { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    alert("Заявка отклонена");
    fetchApplications();  // Перезагружаем заявки
  } else {
    alert("Ошибка при отклонении заявки");
  }
}

// Слушатели событий для фильтров
document.getElementById("search-nick").addEventListener("input", filterApplications);
document.getElementById("filter-department").addEventListener("change", filterApplications);
document.getElementById("filter-date").addEventListener("change", filterApplications);

// Инициализация загрузки заявок
fetchApplications();  // Загружаем заявки с сервера при старте страницы
