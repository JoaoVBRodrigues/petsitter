const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

const authRoutes = require('./modules/auth/auth.routes');
const sitterProfilesRoutes = require('./modules/sitterProfiles/sitterProfiles.routes');
const bookingsRoutes = require('./modules/bookings/bookings.routes');

app.use('/auth', authRoutes);
app.use('/sitter-profiles', sitterProfilesRoutes);
app.use('/bookings', bookingsRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
