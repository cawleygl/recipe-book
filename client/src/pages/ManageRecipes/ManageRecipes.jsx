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
      <p>{`Select a Recipe to view its Recipe page.`}</p>
      <ListGroup>
        {recipeList && recipeList.length &&
          recipeList.map((recipe, index) => {
            return (
              <ListGroup.Item
                key={index}
                action
                variant="primary"
                onClick={() => navigate(`/recipes/${recipe._id}`)}
              >
                {recipe.dishName}&nbsp;-&nbsp;{recipe.description.trim()}
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    </>
  );
}
