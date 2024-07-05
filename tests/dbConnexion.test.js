require('dotenv').config();
const { Pool } = require('pg');

describe('Database Connection Tests', () => {
  let pool;

  beforeAll(() => {
    pool = new Pool({
      user: process.env.DB_USERNAME || 'yogann',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_DATABASE || 'allinone',
      password: process.env.DB_PASSWORD || 'yogann',
      port: process.env.DB_PORT || 5432,
    });
  });

  afterAll(async () => {
    await pool.end();
  });

  it('should connect to the database successfully', async () => {
    let client;
    try {
      client = await pool.connect();
      const res = await client.query('SELECT NOW()');
      console.log(res); // Debugging output
      expect(res).toBeTruthy();
      expect(res.rows.length).toBe(1);
    } catch (err) {
      console.error('Database connection failed:', err); // Debugging output
      throw new Error('Database connection failed');
    } finally {
      if (client) {
        client.release();
      }
    }
  });
});
