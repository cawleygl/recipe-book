import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import recipeRoutes from "./routes/recipeRoutes.js";
import ingredientRoutes from "./routes/ingredientRoutes.js";
import callsForRoutes from "./routes/callsForRoutes.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

const uri =
    process.env.MONGODB_URI || 'mongodb://localhost:27017/recipeDB';

(async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to the database');
    } catch(error) {
        console.error(error);
    }
})();

// Recipe Routes
app.use("/recipes", recipeRoutes);
// Ingredient Routes
app.use("/ingredients", ingredientRoutes);
// Calls For Routes
app.use("/callsFor", callsForRoutes);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});