import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getOneRecipe,
  getIngredients,
  editRecipe,
  deleteRecipe,
} from "../../utils/api";
import { Row, Col, Form, Button, ButtonGroup } from "react-bootstrap";

// Components
import RecipeEdit from "../../components/RecipeEdit/RecipeEdit";
import RecipeDisplay from "../../components/RecipeDisplay/RecipeDisplay";
import IngredientEdit from "../../components/IngredientEdit/IngredientEdit";
import DirectionEdit from "../../components/DirectionEdit/DirectionEdit";

export default function RecipeDetails() {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const params = useParams();
  const [recipeID] = useState(params.id?.toString() || undefined);
  // All ingredients
  const [allIngredients, setAllIngredients] = useState([]);

  // Recipe Details
  const [recipe, setRecipe] = useState({});
  const [callsFors, setCallsFors] = useState([]);
  const [directions, setDirections] = useState([]);

  async function handleRecipeFetch() {
    const { recipe, directions, ingredients } = await getOneRecipe(recipeID);
    setRecipe(recipe);
    setDirections(directions);
    setCallsFors(ingredients);
  }
  async function handleIngredientFetch() {
    setAllIngredients(await getIngredients());
  }

  async function handleDeleteRecipe(recipeID) {
    if (!confirm(`Are you sure you'd like to delete ${recipe.dishName}?`))
      return;

    await deleteRecipe(recipeID);
    navigate(`/recipes`);
  }

  useEffect(() => {
    handleRecipeFetch();
  }, [recipeID]);

  useEffect(() => {
    handleIngredientFetch();
  }, []);

  // Log State Variables
  useEffect(() => {
    console.log("recipe", recipe);
  }, [recipe]);
  useEffect(() => {
    console.log("directions", directions);
  }, [directions]);
  useEffect(() => {
    console.log("callsFors", callsFors);
  }, [callsFors]);
  useEffect(() => {
    console.log("allIngredients", allIngredients);
  }, [allIngredients]);

  async function handleSubmitRecipeEdits(editMode) {
    await editRecipe(recipeID, { recipe, directions, callsFors });
    setEditMode(editMode);
    handleRecipeFetch();
  }

  return (
    <>
      {recipe ? (
        <>
          {editMode ? (
            <>
              <ButtonGroup className="mb-3">
                <Button onClick={() => handleSubmitRecipeEdits(true)}>
                  Apply
                </Button>
                <Button onClick={() => handleSubmitRecipeEdits(false)}>
                  Save
                </Button>
                <Button onClick={() => setEditMode(false)}>Close</Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteRecipe(recipeID)}
                >
                  <i className="fa-solid fa-trash"></i>
                </Button>
              </ButtonGroup>
              <h1>Edit Recipe</h1>
              <Row>
                <Col xs={12} md={6}>
                  <Form>
                    <RecipeEdit recipe={recipe} setRecipe={setRecipe} />
                    <IngredientEdit
                      allIngredients={allIngredients}
                      handleIngredientFetch={handleIngredientFetch}
                      callsFors={callsFors}
                      setCallsFors={setCallsFors}
                      recipeID={recipeID}
                    />
                    <DirectionEdit
                      directions={directions}
                      setDirections={setDirections}
                      recipeID={recipeID}
                    />
                  </Form>
                </Col>
                <Col xs={12} md={6}>
                  <RecipeDisplay
                    recipe={recipe}
                    directions={directions}
                    callsFors={callsFors}
                  />
                </Col>
              </Row>
            </>
          ) : (
            <>
              <Button className="mb-3" onClick={() => setEditMode(true)}>
                Edit
              </Button>
              <RecipeDisplay
                recipe={recipe}
                directions={directions}
                callsFors={callsFors}
              />
            </>
          )}
        </>
      ) : (
        <h1>Recipe Not Found</h1>
      )}
    </>
  );
}
