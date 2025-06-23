const { poolPromise, sql } = require('../database/db');

async function getAll(req, res) {
  try {
    const { tipo, env, nombre } = req.query;
    let q = 'SELECT * FROM ConfigurationItems WHERE Activo=1';
    if (tipo) q += ` AND TipoCiId=${tipo}`;
    if (env)   q += ` AND AmbienteId=${env}`;
    if (nombre) q += ` AND Nombre LIKE '%${nombre}%'`;
    const pool = await poolPromise;
    const r = await pool.request().query(q);
    res.json(r.recordset);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getById(req, res) {
  try {
    const pool = await poolPromise;
    const r = await pool.request()
      .input('id', sql.Int, req.params.id)
      .query('SELECT * FROM ConfigurationItems WHERE Id=@id');
    res.json(r.recordset[0] || {});
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function create(req, res) {
  try {
    const { nombre, descripcion, tipoId, ambienteId, ip, so, fabricante } = req.body;
    const pool = await poolPromise;
    const r = await pool.request()
      .input('n', sql.NVarChar, nombre)
      .input('d', sql.NVarChar, descripcion)
      .input('t', sql.Int, tipoId)
      .input('e', sql.Int, ambienteId)
      .input('ip', sql.VarChar, ip)
      .input('so', sql.NVarChar, so)
      .input('f', sql.NVarChar, fabricante)
      .query(
        `INSERT INTO ConfigurationItems (Nombre,Descripcion,TipoCiId,AmbienteId,DireccionIp,SistemaOperativo,Fabricante)
         OUTPUT INSERTED.* VALUES(@n,@d,@t,@e,@ip,@so,@f)`
      );
    res.status(201).json(r.recordset[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function update(req, res) {
  try {
    const { nombre, descripcion, tipoId, ambienteId, ip, so, fabricante } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, req.params.id)
      .input('n', sql.NVarChar, nombre)
      .input('d', sql.NVarChar, descripcion)
      .input('t', sql.Int, tipoId)
      .input('e', sql.Int, ambienteId)
      .input('ip', sql.VarChar, ip)
      .input('so', sql.NVarChar, so)
      .input('f', sql.NVarChar, fabricante)
      .query(
        `UPDATE ConfigurationItems
         SET Nombre=@n,Descripcion=@d,TipoCiId=@t,AmbienteId=@e,
             DireccionIp=@ip,SistemaOperativo=@so,Fabricante=@f,
             FechaModificacion=SYSUTCDATETIME()
         WHERE Id=@id`
      );
    res.json({ msg: 'Actualizado' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function remove(req, res) {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, req.params.id)
      .query('UPDATE ConfigurationItems SET Activo=0,FechaModificacion=SYSUTCDATETIME() WHERE Id=@id');
    res.json({ msg: 'Eliminado' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = { getAll, getById, create, update, remove };