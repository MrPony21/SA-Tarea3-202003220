// app.js
require('dotenv').config();
const express = require('express');

const ciRoutes      = require('./src/routes/ci');
const catalogRoutes= require('./src/routes/catalog');
const { poolPromise } = require('./src/database/db');

const app = express();
app.use(express.json());

app.use('/cis',     ciRoutes);
app.use('/catalog', catalogRoutes);

app.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    await pool.request().query('SELECT 1');
    res.send('API OK');
  } catch (err) {
    res.status(500).send('DB unavailable');
  }
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Listening on ${PORT}`));
}
