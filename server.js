import express from 'express';  
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Получаем путь к текущей директории
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Строка подключения к MongoDB
const mongoURI = 'mongodb+srv://arise:ScnHloRBNe6Nu3gq@cluster0.yn96q1u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Подключаемся к MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.log('MongoDB connection error: ', err);
});

// Используем body-parser и CORS
app.use(cors());
app.use(bodyParser.json());

// Отдача статических файлов
app.use(express.static(path.join(__dirname, 'public')));

// Схема для заявки
const applicationSchema = new mongoose.Schema({
  discord: String,
  department: String,
  status: { type: String, default: 'Ожидает' },
  date: { type: Date, default: Date.now },
  comment: String
});

const Application = mongoose.model('Application', applicationSchema);

// Простая проверка на админа
const admin = { username: 'admin', password: 'password' }; // Для простоты

// API для получения заявок
app.get('/api/get-applications', async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (error) {
    res.status(500).send('Ошибка при получении заявок');
  }
});

// API для отправки заявки
app.post('/api/submit-application', async (req, res) => {
  const { discord, department, comment } = req.body;
  const newApplication = new Application({
    discord,
    department,
    comment
  });
  try {
    await newApplication.save();
    res.status(200).send('Заявка успешно отправлена');
  } catch (error) {
    res.status(500).send('Ошибка при отправке заявки');
  }
});

// API для авторизации
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === admin.username && password === admin.password) {
    res.status(200).send('Авторизация прошла успешно');
  } else {
    res.status(401).send('Неверные данные');
  }
});

// Маршрут для принятия заявки
app.post('/api/accept-application/:id', async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    application.status = "Принято";
    await application.save();
    res.send("Заявка принята");
  } catch (error) {
    res.status(500).send("Ошибка при принятии заявки");
  }
});

// Маршрут для отклонения заявки
app.post('/api/reject-application/:id', async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    application.status = "Отклонено";
    await application.save();
    res.send("Заявка отклонена");
  } catch (error) {
    res.status(500).send("Ошибка при отклонении заявки");
  }
});

// Отдача главной страницы
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Старт сервера
app.listen(port, () => {
  console.log(`Сервер работает на порту ${port}`);
});
