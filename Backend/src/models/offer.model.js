import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio.'],
      minlength: [3, 'El nombre debe tener al menos 3 caracteres.']
    },
    category: {
      type: String,
      enum: ['Package', 'Activity'],
      required: [true, 'La categoría es obligatoria.']
    },
    subcategory: {
      type: String,
      enum: ['Volcanes', 'Playas', 'Sitios Arqueologicos', 'Parques', 'Lagos y Lagunas'],
      required: true,
    },
    duration: {
      type: String,
      required: [true, 'La duración es obligatoria.']
    },
    price: {
      type: String,
      required: [true, 'El precio es obligatorio.'],
      min: [0, 'El precio no puede ser negativo.']
    },
    location: {
      type: String,
      required: [true, 'La ubicación es obligatoria.'],
      minlength: [3, 'La ubicación debe tener al menos 3 caracteres.']
    },
    img: {
      type: String,
      required: true
    },
    mainImg: {
      type: String,
      required: true
    },
    categoryImg: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: [true, 'La descripción es obligatoria.'],
      minlength: [10, 'La descripción debe tener al menos 10 caracteres.']
    },
    horario1: {
      type: String,
      required: true
    },
    horario2: {
      type: String,
      required: true
    },
    horario3: {
      type: String,
      required: true
    },
  },

  { timestamps: true }
);

const Offer = mongoose.model("Offer", offerSchema);

export default Offer;