import request from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';
import { connectToDatabase, disconnectFromDatabase } from '../config/database.js';

beforeAll(async () => {
  await connectToDatabase();
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await disconnectFromDatabase();
});

afterEach(async () => {
  await mongoose.connection.db.collection('users').deleteMany({});
});

describe('User API', () => {

  describe('POST /api/users/register', () => {
    it('should register a user successfully', async () => {
      const res = await request(app).post('/api/users/register').send({
        email: 'prueba123@example.com',
        password: 'Password123!',
        phone: '1234-5678',
        firstName: 'Test',
        lastName: 'User',
      });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message', 'Usuario registrado exitosamente');
    });

    it('should return validation errors for missing required fields', async () => {
      const res = await request(app).post('/api/users/register').send({
        email: 'prueba123@example.com',
        password: 'Password123!',
        phone: '',
        firstName: 'Test',
        lastName: '',
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body.errors).toHaveLength(2); 
    });

    it('should return validation error for invalid email format', async () => {
      const res = await request(app).post('/api/users/register').send({
        email: 'invalidemail',
        password: 'Password123!',
        phone: '1234-5678',
        firstName: 'Test',
        lastName: 'User',
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body.errors).toHaveLength(1);
      expect(res.body.errors[0]).toHaveProperty('msg', 'Correo electrónico válido es requerido');
    });
  });

  describe('POST /api/users/login', () => {
    it('should login a user successfully', async () => {
      await request(app).post('/api/users/register').send({
        email: 'prueba123@example.com',
        password: 'Password123!',
        phone: '1234-5678',
        firstName: 'Test',
        lastName: 'User',
      });

      const res = await request(app).post('/api/users/login').send({
        email: 'prueba123@example.com',
        password: 'Password123!',
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should return validation errors for invalid login data', async () => {
      const res = await request(app).post('/api/users/login').send({
        email: '',
        password: '',
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('errors');
      expect(res.body.errors).toHaveLength(2);  // Faltan los campos de email y contraseña
    });

    it('should return error for invalid credentials', async () => {
      const res = await request(app).post('/api/users/login').send({
        email: 'prueba123@example.com',
        password: 'WrongPassword!',
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Credenciales incorrectas');
    });
  });

  describe('PUT /api/users/changePass', () => {
    it('should change the password successfully', async () => {
      await request(app).post('/api/users/register').send({
        email: 'prueba123@example.com',
        password: 'Password123!',
        phone: '1234-5678',
        firstName: 'Test',
        lastName: 'User',
      });

      const res = await request(app)
        .put('/api/users/changePass')
        .send({
          email: 'prueba123@example.com',
          oldPassword: 'Password123!',
          newPassword: 'NewPassword123!',
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Contraseña cambiada exitosamente');
    });

    it('should return error if old password is incorrect', async () => {
      await request(app).post('/api/users/register').send({
        email: 'prueba123@example.com',
        password: 'Password123!',
        phone: '1234-5678',
        firstName: 'Test',
        lastName: 'User',
      });

      const res = await request(app)
        .put('/api/users/changePass')
        .send({
          email: 'prueba123@example.com',
          oldPassword: 'WrongPassword!',
          newPassword: 'NewPassword123!',
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Credenciales inválidas, intente de nuevo');
    });

    it('should return error if missing fields', async () => {
      await request(app).post('/api/users/register').send({
        email: 'prueba123@example.com',
        password: 'Password123!',
        phone: '1234-5678',
        firstName: 'Test',
        lastName: 'User',
      });

      const res = await request(app)
        .put('/api/users/changePass')
        .send({
          email: 'prueba123@example.com',
          newPassword: 'NewPassword123!',
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Faltan campos obligatorios: email, oldPassword, newPassword.');
    });
  });

  describe('POST /api/users/favorites/:userId', () => {
    it('should add a favorite successfully', async () => {
      const userId = new mongoose.Types.ObjectId();

      const res = await request(app)
        .post(`/api/users/favorites/${userId}`)
        .set('Authorization', `Bearer some_valid_token_here`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Favorito agregado exitosamente');
    });
  });

  describe('DELETE /api/users/favorites/:userId', () => {
    it('should remove a favorite successfully', async () => {
      const userId = new mongoose.Types.ObjectId();

      const res = await request(app)
        .delete(`/api/users/favorites/${userId}`)
        .set('Authorization', `Bearer some_valid_token_here`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Favorito eliminado exitosamente');
    });
  });

  describe('DELETE /api/users/deleteUser/:id', () => {
    it('should delete a user successfully', async () => {
      const userId = new mongoose.Types.ObjectId();

      const res = await request(app)
        .delete(`/api/users/deleteUser/${userId}`)
        .set('Authorization', `Bearer some_valid_token_here`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Usuario eliminado exitosamente');
    });
  });
});
