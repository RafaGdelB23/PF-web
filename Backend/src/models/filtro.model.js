import mongoose from "mongoose";

const FiltroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    trim: true,
    maxlength: [100, "El nombre no puede exceder 100 caracteres"]
  },
  budget: {
    type: Number,
    required: [true, "El presupuesto es obligatorio"],
    min: [0, "El presupuesto debe ser mayor a 0"],
    max: [2000, "El presupuesto excede el límite máximo"]
  },
  days: {
    type: Number,
    required: [true, "Los días son obligatorios"],
    min: [1, "Debe ser al menos 1 día"],
    max: [30, "No pueden ser más de 30 días"]
  },
  masInfo: {
    type: String,
    required: [true, "La información adicional es obligatoria"]
  },
  img: {
    type: String,
    required: [true, "La imagen es obligatoria"],
  },
  activities: {
    type: [String],
    required : false,
    enum: {
      values: ["Actividades acuáticas", "Senderismo", "Ciclismo", "Camping", "Visitar pueblos",],
      message: "{VALUE} no es una actividad válida"
    },
    default: []
  },
  food: {
    type: [String],
    required : false,
    enum: {
      values: ["Mariscos", "Comida rápida", "Gastronomia local", "Steakhouse", "Comida internacional"],
      message: "{VALUE} no es una opción de comida válida"
    },
    default: []
  },
  interests: {
    type: [String],
    required : false,
    enum: {
      values: ["Museos", "Sitios arqueológicos", "Deportes", "Naturaleza", "Volcanes"],
      message: "{VALUE} no es un interés válido"
    },
    default: []
  }
}, { 
  timestamps: true,
});

const Filtro = mongoose.model("Filtro", FiltroSchema);
export default Filtro;