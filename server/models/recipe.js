import mongoose from "mongoose";

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
	dishName: { type: String, required: [true, 'Dish Name is requred']},
	description: { type: String }
},
	{timestamps: true}
)

export default mongoose.model("Recipe", recipeSchema);