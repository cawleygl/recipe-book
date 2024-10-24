import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import {
  getRecipes,
  addRecipe,
  getIngredients,
  addIngredient,
} from "../../utils/api";

export default function CreateRecipe() {
  // const params = useParams();
  // const navigate = useNavigate();
  // All Recipes and Ingredients Lists
  const [recipeList, setRecipeList] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);
  // Recipe Entry Variables
  const [recipeName, setRecipeName] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
	// Ingredient Entry Variables
	const [ingredientName, setIngredientName] = useState("");
	const [ingredientUnit, setIngredientUnit] = useState("");

  async function handleRecipeFetch() {
    setRecipeList(await getRecipes());
  }
  async function handleIngredientFetch() {
    setIngredientList(await getIngredients());
  }

  const handleRecipeAdd = async () => {
		await addRecipe(recipeName.trim(), recipeDescription.trim());
    setRecipeName("");
    setRecipeDescription("");
    await handleRecipeFetch();
  }

	const handleIngredientAdd = async () => {
		//event.preventDefault();
    await addIngredient(ingredientName.trim(), ingredientUnit.trim());
		setIngredientName("");
		setIngredientUnit("");
    await handleIngredientFetch();
  }

  useEffect(() => {
    handleRecipeFetch();
    handleIngredientFetch();
  }, []);

  useEffect(() => {
    console.log("recipeName", recipeName.trim());
    console.log("recipeDescription", recipeDescription.trim());

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
                {recipe.description.trim()}
                {/* {recipe.map((recipe, index) => {})} */}
                {/* <button onClick={postData}>Edit Recipe</button>&nbsp;
						<button onClick={postData}>Delete Recipe</button> */}
              </li>
            );
          })}
      </ul>
      <h1>Ingredients</h1>
      <h2>Add Ingredient:</h2>
      <form onSubmit={(event) => handleIngredientAdd(event)}>
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
        <label htmlFor="ingredientUnit">Unit</label>
        <br />
        <input
          type="text"
          id="ingredientUnit"
          name="ingredientUnit"
          placeholder="..."
          onChange={(event) => setIngredientUnit(event.target.value)}
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
                {ingredient.ingredientName.trim()}
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
