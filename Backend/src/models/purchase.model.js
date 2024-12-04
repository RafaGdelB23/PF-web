import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      offer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offer",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      price: {
        type: String,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
      dui: {
        type: String,
        required: false,
      },
      status: {
        type: String,
        enum: ["pendiente", "completado", "cancelado"],
        default: "pendiente",
      },
      time: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );
  
const Purchase = mongoose.model("Purchase", purchaseSchema);

export default Purchase;
