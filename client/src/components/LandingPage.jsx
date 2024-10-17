import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import {
  getRecipes,
  addRecipe,
  getIngredients,
  addIngredient,
} from "../utils/api";

export default function LandingPage() {
  // const params = useParams();
  // const navigate = useNavigate();
  // All Recipes and Ingredients Lists
  const [recipeList, setRecipeList] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);
  // Recipe Entry Variables
  const [recipeName, setRecipeName] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
	// Ingredient Entry Variable
	const [ingredientName, setIngredientName] = useState("");

  async function handleRecipeFetch() {
    setRecipeList(await getRecipes());
  }
  async function handleIngredientFetch() {
    setIngredientList(await getIngredients());
  }

  const handleRecipeAdd = async () => {
    await addRecipe(recipeName, recipeDescription);
    setRecipeName("");
    setRecipeDescription("");
    await handleRecipeFetch();
  }
	const handleIngredientAdd = async () => {
    await addIngredient(ingredientName);
		setIngredientName("");
    await handleIngredientFetch();
  }

  useEffect(() => {
    handleRecipeFetch();
    handleIngredientFetch();
  }, []);

  useEffect(() => {
    console.log("recipeName", recipeName);
    console.log("recipeDescription", recipeDescription);

  }, [recipeName, recipeDescription]);

  return (
    <>
      <h1>Recipes</h1>
      <h2>Add Recipe:</h2>
      <form onSubmit={handleRecipeAdd}>
        <label htmlFor="recipeName">Name</label>
        <br />
        <input
          type="text"
          id="recipeName"
          name="recipeName"
          placeholder="..."
          onChange={(event) => setRecipeName(event.target.value)}
        />
        <br />
        <label htmlFor="recipeDescription">Description</label>
        <br />
        <textarea
          id="recipeDescription"
          name="recipeDescription"
          placeholder="..."
          onChange={(event) => setRecipeDescription(event.target.value)}
        />
        <br />
        <input type="submit" value="Submit"/>
      </form>
      <ul>
        {recipeList &&
          recipeList.map((recipe, index) => {
            return (
              <li key={index}>
                <a href={"/recipes/" + recipe._id}>{recipe.dishName}</a>
                &nbsp;-&nbsp;
                {recipe.description}
                {/* {recipe.map((recipe, index) => {})} */}
                {/* <button onClick={postData}>Edit Recipe</button>&nbsp;
						<button onClick={postData}>Delete Recipe</button> */}
              </li>
            );
          })}
      </ul>
      <h1>Ingredients</h1>
      <h2>Add Ingredient:</h2>
      <form onSubmit={handleIngredientAdd}>
        <label htmlFor="ingredientName">Name</label>
        <br />
        <input
          type="text"
          id="ingredientName"
          name="ingredientName"
          placeholder="..."
          onChange={(event) => setIngredientName(event.target.value)}
        />
        <br />
        <input type="submit" />
      </form>
      <ul>
        {ingredientList &&
          ingredientList.map((ingredient, index) => {
            return (
              <li key={index}>
                {/* <a href={"/recipes/" + ingredient._id}> */}
                {ingredient.ingredientName}
                {/* </a>
						&nbsp;-&nbsp;{ingredient.description} */}

                {/* {recipe.map((recipe, index) => {})} */}

                {/* <button onClick={postData}>Edit Recipe</button>&nbsp;
						<button onClick={postData}>Delete Recipe</button> */}
              </li>
            );
          })}
      </ul>
    </>
  );
}
