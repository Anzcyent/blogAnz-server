const express = require('express');
const cors = require('cors');
const connectDB = require('./helpers/db/connectDB');
const routers = require('./routers');
const errorHandler = require('./middlewares/error/errorHandler');

require('dotenv').config();

const PORT = process.env.PORT;
const app = express();


app.use(express.json());
app.use(cors());
app.use('/api', routers);
app.use(errorHandler);

connectDB();

app.listen(PORT, console.log(`Server started on port ${PORT} : ${process.env.NODE_ENV}`))
