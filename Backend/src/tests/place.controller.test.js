import request from 'supertest';
import app from '../../app.js'; // Ajusta el path según la estructura de tu proyecto
import mongoose from 'mongoose';
import { connectToDatabase, disconnectFromDatabase } from '../config/database.js'; // Ajusta el path según tu configuración

beforeAll(async () => {
  await connectToDatabase();
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await disconnectFromDatabase();
});

describe('Place API', () => {
  describe('POST /api/places/addPlace', () => {
    it('should add a new place successfully', async () => {
      const res = await request(app).post('/api/places/addPlace').send({
        namePlace: "Cerro Verde",
        mainImg: "https://www.visitcentroamerica.com/wp-content/uploads/2017/08/ver-centroamerica-cerro-verde-el-salvador-08.jpg",
        subImg1: "https://istu.gob.sv/wp-content/uploads/2020/09/Cerro02-min-scaled.jpg",
        subImg2: "https://elsalvador.travel/system/wp-content/uploads/2024/08/cerroverde-01.jpg",
        aboutPlace: "El Parque Nacional Cerro Verde es un destino impresionante en El Salvador...",
        placeAdvices: "Para disfrutar al máximo de tu visita al Parque Nacional Cerro Verde...",
        map: "https://www.google.com/maps/embed?pb=!1m18...",
        location: "Santa Ana",
        category: "Parque"
      });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message', 'Lugar agregado exitosamente');
      expect(res.body.result).toHaveProperty('namePlace', 'Cerro Verde');
    });

    it('should return an error if the place already exists', async () => {
      await request(app).post('/api/places/addPlace').send({
        namePlace: "Cerro Verde",
        mainImg: "https://www.visitcentroamerica.com/wp-content/uploads/2017/08/ver-centroamerica-cerro-verde-el-salvador-08.jpg",
        subImg1: "https://istu.gob.sv/wp-content/uploads/2020/09/Cerro02-min-scaled.jpg",
        subImg2: "https://elsalvador.travel/system/wp-content/uploads/2024/08/cerroverde-01.jpg",
        aboutPlace: "El Parque Nacional Cerro Verde es un destino impresionante en El Salvador...",
        placeAdvices: "Para disfrutar al máximo de tu visita al Parque Nacional Cerro Verde...",
        map: "https://www.google.com/maps/embed?pb=!1m18...",
        location: "Santa Ana",
        category: "Parque"
      });

      const res = await request(app).post('/api/places/addPlace').send({
        namePlace: "Cerro Verde",
        mainImg: "https://www.visitcentroamerica.com/wp-content/uploads/2017/08/ver-centroamerica-cerro-verde-el-salvador-08.jpg",
        subImg1: "https://istu.gob.sv/wp-content/uploads/2020/09/Cerro02-min-scaled.jpg",
        subImg2: "https://elsalvador.travel/system/wp-content/uploads/2024/08/cerroverde-01.jpg",
        aboutPlace: "El Parque Nacional Cerro Verde es un destino impresionante en El Salvador...",
        placeAdvices: "Para disfrutar al máximo de tu visita al Parque Nacional Cerro Verde...",
        map: "https://www.google.com/maps/embed?pb=!1m18...",
        location: "Santa Ana",
        category: "Parque"
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'El lugar ya existe');
    });
  });

  describe('GET /api/places/Destino/:id', () => {
    let placeId;

    beforeAll(async () => {
      const place = await request(app).post('/api/places/addPlace').send({
        namePlace: "Cerro Verde",
        mainImg: "https://www.visitcentroamerica.com/wp-content/uploads/2017/08/ver-centroamerica-cerro-verde-el-salvador-08.jpg",
        subImg1: "https://istu.gob.sv/wp-content/uploads/2020/09/Cerro02-min-scaled.jpg",
        subImg2: "https://elsalvador.travel/system/wp-content/uploads/2024/08/cerroverde-01.jpg",
        aboutPlace: "El Parque Nacional Cerro Verde es un destino impresionante en El Salvador...",
        placeAdvices: "Para disfrutar al máximo de tu visita al Parque Nacional Cerro Verde...",
        map: "https://www.google.com/maps/embed?pb=!1m18...",
        location: "Santa Ana",
        category: "Parque"
      });
      placeId = place.body.result._id;
    });

    it('should return a place by id', async () => {
      const res = await request(app).get(`/api/places/Destino/${placeId}`).send();

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('namePlace', 'Cerro Verde');
    });

    it('should return error if place not found', async () => {
      const res = await request(app).get('/api/places/Destino/nonexistentid').send();

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Lugar no encontrado');
    });
  });

  describe('DELETE /api/places/deletePlace/:id', () => {
    let placeId;

    beforeAll(async () => {
      const place = await request(app).post('/api/places/addPlace').send({
        namePlace: "Cerro Verde",
        mainImg: "https://www.visitcentroamerica.com/wp-content/uploads/2017/08/ver-centroamerica-cerro-verde-el-salvador-08.jpg",
        subImg1: "https://istu.gob.sv/wp-content/uploads/2020/09/Cerro02-min-scaled.jpg",
        subImg2: "https://elsalvador.travel/system/wp-content/uploads/2024/08/cerroverde-01.jpg",
        aboutPlace: "El Parque Nacional Cerro Verde es un destino impresionante en El Salvador...",
        placeAdvices: "Para disfrutar al máximo de tu visita al Parque Nacional Cerro Verde...",
        map: "https://www.google.com/maps/embed?pb=!1m18...",
        location: "Santa Ana",
        category: "Parque"
      });
      placeId = place.body.result._id;
    });

    it('should delete a place successfully', async () => {
      const res = await request(app).delete(`/api/places/deletePlace/${placeId}`).send();

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Lugar eliminado exitosamente');
    });

    it('should return an error if place not found', async () => {
      const res = await request(app).delete('/api/places/deletePlace/nonexistentid').send();

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'El lugar no existe');
    });
  });

  describe('GET /api/places/Destinos/:category', () => {
    it('should return places by category', async () => {
      const res = await request(app).get('/api/places/Destinos/Parque').send();

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Lugares disponibles en la categoría Parque');
      expect(res.body.places).toBeInstanceOf(Array);
    });

    it('should return error if no places found in category', async () => {
      const res = await request(app).get('/api/places/Destinos/NoExistentCategory').send();

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'No se encontraron lugares para esta categoría');
    });
  });
});
