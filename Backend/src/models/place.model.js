import mongoose from "mongoose";

const placeSchema = new mongoose.Schema(
  {
    namePlace: {
      type: String,
      required: true,
    },
    mainImg: {
      type: String,
      required: true,
    },
    subImg1: {
      type: String,
      required: true,
    },
    subImg2: {
      type: String,
      required: true,
    },
    aboutPlace: {
      type: String,
      required: true,
    },
    placeAdvices: {
      type: String,
      required: true,
    },
    map: {
      type: String,
      required: true,
    },
    package: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Volcán",
        "Playa",
        "LagosLagunas",
        "SitiosArqueologicos",
        "Parque",
      ],
      required: true,
    }
  },
  { timestamps: true }
);

const Place = mongoose.model("Place", placeSchema);

export default Place;
