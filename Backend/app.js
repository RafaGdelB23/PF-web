import express from 'express';
import cors from 'cors';
import userRoutes from './src/routes/user.routes.js';
import offerRoutes from './src/routes/offer.routes.js';
import PlacesRoutes from './src/routes/place.routes.js';
import FilterRouter from './src/routes/filtro.routes.js';
import purchaseRoutes from './src/routes/purchase.routes.js';
import errorHandler from './src/middlewares/errorHandler.middleware.js';
import { connectToDatabase } from './src/config/database.js';
import { config } from './src/config/config.js';


const app = express();
connectToDatabase();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/places', PlacesRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/filtro', FilterRouter);

// Middleware de manejo de errores
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on port http://localhost:${config.port}`);
});
