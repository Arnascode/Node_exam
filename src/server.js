const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT } = require('./config');
const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');
const accRoutes = require('./routes/accRoutes');
const billRoutes = require('./routes/billRoutes');

const app = express();

// middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello express');
});

// Routes
app.use('/', userRoutes);
app.use('/', groupRoutes);
app.use('/', accRoutes);
app.use('/', billRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
