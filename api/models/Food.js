const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user who logged the intake
    foodname: { type: String, required: true },
    foodimg: { type: String, required: true },
    quantity: { type: Number, required: true },
    servingSize: { type: Number, required: true },
    calories: { type: Number, required: true },
    proteins: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fats: { type: Number, required: true },
    fiber: { type: Number, required: true },
    cholesterol: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
