const express = require('express');
// const connectDB = require('./config/db');
const bodyParser = require('body-parser');
var cors = require('cors');
const db = require('./config/dbConfig')
require('dotenv').config()
const scheduler = require('./cron/schedule')
// scheduler.initialize();


const authRoutes = require('./routes/auth/auth')
const mainRoutes = require('./routes/api/main.routes')
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/Paynet.json');

// cors
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Init Middleware
app.use(express.json({ extended:false }));

app.get('/', (req, res) => res.send('Hello Nupay pankaj!'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api',mainRoutes)
app.use('/api/auth',authRoutes)


const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
