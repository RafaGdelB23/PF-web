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

describe('Offer Controller', () => {
  describe('POST /api/offers/addOffer', () => {
    it('should create a new offer successfully', async () => {
      const res = await request(app).post('/api/offers/addOffer').send({
        name: "Observación de vida silvestre en el Volcán Chaparrastique",
        category: "Package",
        subcategory: "Volcanes",
        duration: "2 horas",
        price: "$55.00",
        location: "San Miguel",
        img: "https://media.diariolahuella.com/wp-content/uploads/2023/05/11104155/IMG_1244.jpeg",
        categoryImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAAAXNSR0IArs4c6QAAIABJ...",
        description: "Además de las recomendaciones mencionadas...",
        edadMinima: "Edades desde 12 a 65 años",
        horario1: "10:00 AM",
        horario2: "1:00 PM",
        horario3: "3:00 PM",
        mainImg: "https://farm4.static.flickr.com/3203/3120416113_29068ef3dd_o.jpg"
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('message', 'Oferta creada exitosamente');
      expect(res.body.result).toHaveProperty('name', 'Observación de vida silvestre en el Volcán Chaparrastique');
    });

    it('should return an error if required fields are missing', async () => {
      const res = await request(app).post('/api/offers/addOffer').send({
        // Intentionally omitting required fields like name, category, etc.
        duration: "2 horas",
        price: "$55.00"
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('errors');
      expect(res.body.errors[0]).toHaveProperty('msg', 'El nombre de la oferta es requerido');
    });
  });

  describe('GET /api/offers/:category', () => {
    it('should return offers by category', async () => {
      const res = await request(app).get('/api/offers/Package').send();

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('offers');
      expect(res.body.offers).toBeInstanceOf(Array);
    });

    it('should return 404 if no offers found for category', async () => {
      const res = await request(app).get('/api/offers/NonExistentCategory').send();

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'No se encontraron ofertas para esta categoría');
    });
  });

  describe('GET /api/offers/:category/:id', () => {
    let offerId;

    beforeAll(async () => {
      const res = await request(app).post('/api/offers/addOffer').send({
        name: "Observación de vida silvestre en el Volcán Chaparrastique",
        category: "Package",
        subcategory: "Volcanes",
        duration: "2 horas",
        price: "$55.00",
        location: "San Miguel",
        img: "https://media.diariolahuella.com/wp-content/uploads/2023/05/11104155/IMG_1244.jpeg",
        categoryImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAAAXNSR0IArs4c6QAAIABJ...",
        description: "Además de las recomendaciones mencionadas...",
        edadMinima: "Edades desde 12 a 65 años",
        horario1: "10:00 AM",
        horario2: "1:00 PM",
        horario3: "3:00 PM",
        mainImg: "https://farm4.static.flickr.com/3203/3120416113_29068ef3dd_o.jpg"
      });
      offerId = res.body.result._id;
    });

    it('should return an offer by id', async () => {
      const res = await request(app).get(`/api/offers/Package/${offerId}`).send();

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('name', 'Observación de vida silvestre en el Volcán Chaparrastique');
    });

    it('should return 404 if offer not found', async () => {
      const res = await request(app).get('/api/offers/Package/60d2f92c998c0f3d2a334b1a').send();

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Oferta no encontrada');
    });
  });

  describe('DELETE /api/offers/deleteOffer/:id', () => {
    let offerId;

    beforeAll(async () => {
      const res = await request(app).post('/api/offers/addOffer').send({
        name: "Observación de vida silvestre en el Volcán Chaparrastique",
        category: "Package",
        subcategory: "Volcanes",
        duration: "2 horas",
        price: "$55.00",
        location: "San Miguel",
        img: "https://media.diariolahuella.com/wp-content/uploads/2023/05/11104155/IMG_1244.jpeg",
        categoryImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAAAXNSR0IArs4c6QAAIABJ...",
        description: "Además de las recomendaciones mencionadas...",
        edadMinima: "Edades desde 12 a 65 años",
        horario1: "10:00 AM",
        horario2: "1:00 PM",
        horario3: "3:00 PM",
        mainImg: "https://farm4.static.flickr.com/3203/3120416113_29068ef3dd_o.jpg"
      });
      offerId = res.body.result._id;
    });

    it('should delete an offer by id', async () => {
      const res = await request(app).delete(`/api/offers/deleteOffer/${offerId}`).send();

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Oferta eliminada exitosamente');
    });

    it('should return 404 if offer to delete is not found', async () => {
      const res = await request(app).delete('/api/offers/deleteOffer/60d2f92c998c0f3d2a334b1a').send();

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Oferta no encontrada');
    });
  });
});
