import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
	ingredientName: { type: String, required: [true, 'Ingredient Name is required'], unique: [true, 'Ingredient already exists']},
	unit: { type: String, required: [true, 'Unit is required']},
},
	{timestamps: true}
)

export default mongoose.model("Ingredient", ingredientSchema);