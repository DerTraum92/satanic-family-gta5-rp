// Загружаем заявки с сервера
async function fetchApplications() {
  try {
    // Имитация загрузки данных с сервера
    const response = await fetch('/api/get-applications');  // Заменить на свой серверный API
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

// Отображение заявок
function displayApplications(filteredApplications) {
  const requestList = document.getElementById("requestList");
  requestList.innerHTML = ""; // Очистка текущего списка заявок

  filteredApplications.forEach((application) => {
    const row = document.createElement("tr");
    row.classList.add("hover:bg-gray-700", "transition");

    row.innerHTML = `
      <td class="p-2 border border-white">${application.date}</td>
      <td class="p-2 border border-white">${application.discord}</td>
      <td class="p-2 border border-white">${application.department}</td>
      <td class="p-2 border border-white">${application.discord}</td>
      <td class="p-2 border border-white">
        <input type="text" class="bg-transparent border border-white p-1 w-full text-white" placeholder="Комментарий..." value="${application.comment}" />
      </td>
      <td class="p-2 border border-white flex gap-2">
        <button class="bg-green-700 px-2 py-1 rounded hover:bg-green-600" onclick="acceptApplication(${application.id})">
          Принять
        </button>
        <button class="bg-red-700 px-2 py-1 rounded hover:bg-red-600" onclick="rejectApplication(${application.id})">
          Отклонить
        </button>
      </td>
    `;

    requestList.appendChild(row);
  });
}

// Фильтрация заявок
function filterApplications() {
  const searchNick = document.getElementById("search-nick").value.toLowerCase();
  const filterDepartment = document.getElementById("filter-department").value;
  const filterDate = document.getElementById("filter-date").value;

  // Загружаем заявок и фильтруем их
  fetchApplications().then(applications => {
    const filteredApplications = applications.filter((application) => {
      const matchesNick = application.discord.toLowerCase().includes(searchNick);
      const matchesDepartment = filterDepartment ? application.department === filterDepartment : true;
      const matchesDate = filterDate ? application.date === filterDate : true;

      return matchesNick && matchesDepartment && matchesDate;
    });

    displayApplications(filteredApplications); // Отображаем отфильтрованные заявки
  });
}

// Принять заявку
function acceptApplication(id) {
  const application = applications.find((app) => app.id === id);
  application.status = "Принято";
  displayApplications();
}

// Отклонить заявку
function rejectApplication(id) {
  const application = applications.find((app) => app.id === id);
  application.status = "Отклонено";
  displayApplications();
}

// Слушатели событий для фильтров
document.getElementById("search-nick").addEventListener("input", filterApplications);
document.getElementById("filter-department").addEventListener("change", filterApplications);
document.getElementById("filter-date").addEventListener("change", filterApplications);

// Инициализация загрузки заявок
fetchApplications(); // Загружаем заявки с сервера при старте страницы
