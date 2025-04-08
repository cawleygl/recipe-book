import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getOneRecipe,
  getIngredients,
  editRecipe,
  deleteRecipe,
} from "../../utils/api";
import { Row, Col, Button, ButtonGroup } from "react-bootstrap";

// Components
import RecipeEdit from "../../components/RecipeEdit/RecipeEdit";
import RecipeDisplay from "../../components/RecipeDisplay/RecipeDisplay";

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
  // useEffect(() => {
  //   console.log("recipe", recipe);
  // }, [recipe]);
  // useEffect(() => {
  //   console.log("directions", directions);
  // }, [directions]);
  // useEffect(() => {
  //   console.log("callsFors", callsFors);
  // }, [callsFors]);
  // useEffect(() => {
  //   console.log("allIngredients", allIngredients);
  // }, [allIngredients]);

  async function handleSubmitRecipeEdits(event) {
    await editRecipe(recipeID, { recipe, directions, callsFors });
    setEditMode(
      JSON.parse(event.nativeEvent.submitter.getAttribute("data-editMode"))
    );
    handleRecipeFetch();
  }

  function renderSubmitEditButtons() {
    return (
      <ButtonGroup className="mb-3">
        <Button type="submit" data-editmode="true">
          Apply
        </Button>
        <Button type="submit" data-editmode="false">
          Save
        </Button>
        <Button onClick={() => setEditMode(false)}>Close</Button>
        <Button variant="danger" onClick={() => handleDeleteRecipe(recipeID)}>
          <i className="fa-solid fa-trash"></i>
        </Button>
      </ButtonGroup>
    );
  }

  function renderEditButton() {
    return (
      <Button variant="outline-primary" className="mb-3 float-end" onClick={() => setEditMode(true)}>
        <i className="fa-solid fa-pen-to-square"></i>
      </Button>
    );
  }

  return (
    <>
      {recipe ? (
        <>
          {editMode ? (
            <>
              <Row>
                <h1>Edit Recipe</h1>
                <p>
                  Submit edits to an existing recipe. Click Save to save and
                  close or Apply to save without closing.
                </p>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <RecipeEdit
                    recipe={recipe}
                    setRecipe={setRecipe}
                    allIngredients={allIngredients}
                    handleIngredientFetch={handleIngredientFetch}
                    callsFors={callsFors}
                    setCallsFors={setCallsFors}
                    directions={directions}
                    setDirections={setDirections}
                    handleFormSubmit={handleSubmitRecipeEdits}
                    renderSubmitButtonGroup={renderSubmitEditButtons}
                    recipeID={recipeID}
                  />
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
              <RecipeDisplay
                recipe={recipe}
                directions={directions}
                callsFors={callsFors}
                renderEditButton={renderEditButton}
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
