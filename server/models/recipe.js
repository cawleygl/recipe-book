import mongoose from "mongoose";

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
	dishName: { type: String, required: [true, 'Dish Name is requred']},
	description: { type: String, required: [true, 'Description is requred']}
},
	{timestamps: true}
)

export default mongoose.model("Recipe", recipeSchema);