
import { model, Schema, models } from "mongoose";

const sellSchema = new Schema({
    category:{
        type: String, required: true,
    },
    packets: {
        type: Number, required: true, default: 0,
    },
    amount: {
        type: Number, required: true, default: 0,
    },
    day: {
        type: Number
    },
    month: {
        type: Number
    },
    year: {
        type: Number
    }
}, { timestamps: true });

export default models.SellKhaini || model('SellKhaini', sellSchema);