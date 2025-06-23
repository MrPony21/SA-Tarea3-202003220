const { poolPromise } = require('../database/db');

async function listTypes(req, res) {
  try {
    const pool = await poolPromise;
    const r = await pool.request().query('SELECT * FROM CITypes');
    res.json(r.recordset);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function listEnvs(req, res) {
  try {
    const pool = await poolPromise;
    const r = await pool.request().query('SELECT * FROM Environments');
    res.json(r.recordset);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = { listTypes, listEnvs };
