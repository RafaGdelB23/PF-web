import request from "supertest";
import app from "../../app.js";
import mongoose from "mongoose";
import { connectToDatabase, disconnectFromDatabase } from "../config/database.js";

beforeAll(async () => {
  await connectToDatabase();
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await disconnectFromDatabase();
});

describe("Purchase API", () => {
  describe("POST /api/purchases/create", () => {
    it("should create a new purchase successfully", async () => {
      const res = await request(app).post("/api/purchases/create").send({
        user: "648fcdabcd1234567890abcd",
        items: [
          {
            offer: "648fcdabcd1234567890efgh",
            quantity: 2,
            price: 50,
          },
        ],
        total: 100,
        dui: "12345678-9",
        status: "pendiente",
      });

      expect(res.statusCode).toEqual(201);
      expect(res.body.purchase).toHaveProperty("user");
      expect(res.body.purchase).toHaveProperty("total", 100);
    });

    it("should return an error if items are missing", async () => {
      const res = await request(app).post("/api/purchases/create").send({
        user: "648fcdabcd1234567890abcd",
        total: 100,
        dui: "12345678-9",
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("message", "La compra debe incluir al menos un ítem");
    });
  });

  describe("GET /api/purchases/:id", () => {
    let purchaseId;

    beforeAll(async () => {
      const purchase = await request(app).post("/api/purchases/create").send({
        user: "648fcdabcd1234567890abcd",
        items: [
          {
            offer: "648fcdabcd1234567890efgh",
            quantity: 2,
            price: 50,
          },
        ],
        total: 100,
        dui: "12345678-9",
        status: "pendiente",
      });
      purchaseId = purchase.body.purchase._id;
    });

    it("should return a purchase by ID", async () => {
      const res = await request(app).get(`/api/purchases/${purchaseId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.purchase).toHaveProperty("user");
      expect(res.body.purchase).toHaveProperty("total", 100);
    });

    it("should return an error if purchase not found", async () => {
      const res = await request(app).get("/api/purchases/invalidPurchaseId");

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("message", "Compra no encontrada");
    });
  });

  describe("PUT /api/purchases/edit/:id", () => {
    let purchaseId;

    beforeAll(async () => {
      const purchase = await request(app).post("/api/purchases/create").send({
        user: "648fcdabcd1234567890abcd",
        items: [
          {
            offer: "648fcdabcd1234567890efgh",
            quantity: 2,
            price: 50,
          },
        ],
        total: 100,
        dui: "12345678-9",
        status: "pendiente",
      });
      purchaseId = purchase.body.purchase._id;
    });

    it("should update a purchase successfully", async () => {
      const res = await request(app).put(`/api/purchases/edit/${purchaseId}`).send({
        total: 120,
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body.purchase).toHaveProperty("total", 120);
    });

    it("should return an error if purchase not found", async () => {
      const res = await request(app).put("/api/purchases/edit/nonexistentId").send({
        total: 120,
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("message", "Compra no encontrada");
    });
  });

  describe("DELETE /api/purchases/delete/:id", () => {
    let purchaseId;

    beforeAll(async () => {
      const purchase = await request(app).post("/api/purchases/create").send({
        user: "648fcdabcd1234567890abcd",
        items: [
          {
            offer: "648fcdabcd1234567890efgh",
            quantity: 2,
            price: 50,
          },
        ],
        total: 100,
        dui: "12345678-9",
        status: "pendiente",
      });
      purchaseId = purchase.body.purchase._id;
    });

    it("should delete a purchase successfully", async () => {
      const res = await request(app).delete(`/api/purchases/delete/${purchaseId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("message", "Compra eliminada exitosamente");
    });

    it("should return an error if purchase not found", async () => {
      const res = await request(app).delete("/api/purchases/delete/nonexistentId");

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("message", "Compra no encontrada");
    });
  });

  describe("POST /api/purchases/pay/:purchaseId", () => {
    let purchaseId;

    beforeAll(async () => {
      const purchase = await request(app).post("/api/purchases/create").send({
        user: "648fcdabcd1234567890abcd",
        items: [
          {
            offer: "648fcdabcd1234567890efgh",
            quantity: 2,
            price: 50,
          },
        ],
        total: 100,
        dui: "12345678-9",
        status: "pendiente",
      });
      purchaseId = purchase.body.purchase._id;
    });

    it("should process a payment successfully", async () => {
      const res = await request(app).post(`/api/purchases/pay/${purchaseId}`).send({
        cardNumber: "1234567812345678",
        cardName: "Test User",
        expMonth: "12",
        expYear: "2025",
        cvc: "123",
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body.purchase).toHaveProperty("status", "completado");
    });

    it("should return an error if payment data is invalid", async () => {
      const res = await request(app).post(`/api/purchases/pay/${purchaseId}`).send({
        cardNumber: "",
        cardName: "Test User",
        expMonth: "12",
        expYear: "2025",
        cvc: "123",
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("message", "Todos los datos de la tarjeta son obligatorios");
    });
  });
});
