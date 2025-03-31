import mongoose from "mongoose";

const Schema = mongoose.Schema;

const directionSchema = new Schema({
	recipe: {type: Schema.Types.ObjectId, ref: 'Recipe', required: [true, 'Recipe is required']},
	index: { type: Number, required: [true, 'Index is requred']},
	instruction: { type: String }
},
	{timestamps: true}
)

export default mongoose.model("Direction", directionSchema);