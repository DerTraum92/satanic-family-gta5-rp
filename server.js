import express from 'express';  // Используем import вместо require
import mongoose from 'mongoose'; 
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

// Подключение к базе данных MongoDB
mongoose.connect('YOUR_MONGODB_CONNECTION_STRING', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.log('MongoDB connection error: ', err);
});

// Использование CORS и body-parser
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
