const request = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../index');
const pool = require('../database.connexion');

describe('User Controller - register', () => {
  beforeAll(async () => {
    // Clean the database before running tests
    await pool.query('DELETE FROM "user"');
  });

  afterEach(async () => {
    // Clean the database after each test
    await pool.query('DELETE FROM "user"');
  });

  it('should register a new user', async () => {
    const userData = {
      pseudo: 'TestUser',
      email: 'test@example.com',
      password: 'yoooooo!*',
    };

    const response = await request(app)
      .post('/api/register')
      .send(userData);

    expect(response.status).toBe(200);
    expect(response.body.registered).toBe(true);


    // Check if the user was really added to the database
    const user = await pool.query('SELECT * FROM "user" WHERE email = $1', [userData.email]);
    expect(user.rows.length).toBe(1);
    expect(user.rows[0].pseudo).toBe(userData.pseudo);
  });

  it('should return error if email already exists', async () => {
    // First, insert a user with the same email
    await pool.query(
      'INSERT INTO "user" (pseudo, email, password) VALUES ($1, $2, $3)',
      ['TestUser', 'test@example.com', await bcrypt.hash('yoooooo!*', 10)]
    );

    // Try to register with the same email
    const userData = {
      pseudo: 'TestUser',
      email: 'test@example.com',
      password: 'yoooooo!*',
    };

    const response = await request(app)
      .post('/api/register')
      .send(userData);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Cet email existe déjà' });
  });
});
