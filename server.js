// Подключаем необходимые библиотеки
import express from 'express';  // Используем ES-модули, так как у вас указан "type": "module"
import mongoose from 'mongoose'; 
import bodyParser from 'body-parser';
import cors from 'cors';

// Инициализируем приложение Express
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

// Схема для заявки
const applicationSchema = new mongoose.Schema({
  discord: String,
  department: String,
  status: { type: String, default: 'Ожидает' },
  date: { type: Date, default: Date.now },
  comment: String
});

// Модель для заявок
const Application = mongoose.model('Application', applicationSchema);

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

// Старт сервера
app.listen(port, () => {
  console.log(`Сервер работает на порту ${port}`);
});
