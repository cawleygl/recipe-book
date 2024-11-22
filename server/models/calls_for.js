import mongoose from "mongoose";

const Schema = mongoose.Schema;

const calls_forSchema = new Schema({
	recipe: {type: Schema.Types.ObjectId, ref: 'Recipe', required: [true, 'Recipe is required']},
	ingredient: {type: Schema.Types.ObjectId, ref: 'Ingredient', required: [true, 'Ingredient is required']},
	amount: { type: Number, min: [0, 'Amount cannot be negative']},
	unit: { type: String, enum: [
		"teaspoon",
		"tablespoon",
		"fluid ounce",
		"cup",
		"pint",
		"quart",
		"gallon",
		"whole",
	], required: [true, 'Unit is required'], default: "whole" },
	modifier: { type: String }
},
	{timestamps: true}
)

calls_forSchema.index({ recipe: 1, ingredient: -1 }, {unique: [true, 'Ingredient already added to Recipe']});

export default mongoose.model("CallsFor", calls_forSchema);