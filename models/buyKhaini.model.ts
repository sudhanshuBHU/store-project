
import { model, Schema, models } from "mongoose";

const buySchema = new Schema({
    stock: {
        type: Number, required : true,
    },
    amount: {
        type: Number, required: true,
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

export default models.BuyKhaini || model('BuyKhaini', buySchema);