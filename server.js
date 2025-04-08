import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import recipeRoutes from "./routes/recipeRoutes.js";
import ingredientRoutes from "./routes/ingredientRoutes.js";
import path from "path";
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 5050;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
    //*Set static folder up in production
    app.use(express.static('client/dist'));
    
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'dist','index.html')));
}

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

// Default Error Handling
app.use((err, req, res, next) => {
	console.error(err.stack);
	if (!err.status) {
		err.status = 500;
		err.message = ("Internal Server Error");
	}
	res.status(err.status).send(err);
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});