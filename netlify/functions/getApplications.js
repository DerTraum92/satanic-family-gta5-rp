// netlify/functions/getApplications.js
export async function handler(event, context) {
  const applications = [
    {
      id: 1,
      discord: "eva#1313",
      department: "Тул",
      status: "Ожидает",
      date: "2025-07-03",
      comment: "",
    },
    {
      id: 2,
      discord: "arise#4567",
      department: "Фарм",
      status: "Ожидает",
      date: "2025-07-02",
      comment: "",
    },
    {
      id: 3,
      discord: "yasmi#9876",
      department: "Тул",
      status: "Ожидает",
      date: "2025-07-01",
      comment: "",
    },
  ];

  return {
    statusCode: 200,
    body: JSON.stringify(applications),
  };
}
