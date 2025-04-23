import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRecipes } from "../../utils/api";
import { ListGroup } from "react-bootstrap";

export default function CreateRecipe() {
  const navigate = useNavigate();
  // All Recipes List
  const [recipeList, setRecipeList] = useState([]);

  async function handleRecipeFetch() {
    setRecipeList(await getRecipes());
  }

  useEffect(() => {
    handleRecipeFetch();
  }, []);

  return (
    <>
      <h1>Recipes</h1>
      <p>{recipeList && recipeList.length > 0 ? `Select a Recipe to view its Recipe page.` : `Click 'Add Recipe' to create a recipe!`}</p>
      <ListGroup>
        {recipeList && recipeList.length > 0 &&
          recipeList.map((recipe, index) => {
            return (
              <ListGroup.Item
                key={index}
                action
                variant="primary"
                onClick={() => navigate(`/recipes/${recipe._id}`)}
              >
                {recipe.dishName ? recipe.dishName.trim() : "No Name"}&nbsp;{recipe.description ? "- " + recipe.description.trim() : ""}
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    </>
  );
}
