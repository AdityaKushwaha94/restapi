import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './routes/routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files

app.use('/api/users', router);

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
