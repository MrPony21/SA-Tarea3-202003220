const request = require('supertest');
const app = require('../../app');  

describe('CI API Endpoints', () => {
  let createdCiId;

  it('GET / should return API OK', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('API OK');
  });

  it('GET /catalog/types should return list of types', async () => {
    const res = await request(app).get('/catalog/types');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('Id');
    expect(res.body[0]).toHaveProperty('Nombre');
  });

  it('GET /catalog/environments should return list of environments', async () => {
    const res = await request(app).get('/catalog/environments');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('Id');
    expect(res.body[0]).toHaveProperty('Nombre');
  });

  it('POST /cis should create a new CI', async () => {
    const newCi = {
      nombre: 'Test-CI',
      descripcion: 'Descripción de prueba',
      tipoId: 1,
      ambienteId: 1,
      ip: '192.168.0.1',
      so: 'TestOS',
      fabricante: 'TestCorp'
    };

    const res = await request(app)
      .post('/cis')
      .send(newCi)
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('Id');
    expect(res.body.Nombre).toBe(newCi.nombre);
    createdCiId = res.body.Id;
  });

  it('GET /cis should include the created CI', async () => {
    const res = await request(app).get('/cis');
    expect(res.statusCode).toBe(200);
    const found = res.body.find(ci => ci.Id === createdCiId);
    expect(found).toBeDefined();
  });

  it('GET /cis/:id should return the specific CI', async () => {
    const res = await request(app).get(`/cis/${createdCiId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('Id', createdCiId);
  });
});
