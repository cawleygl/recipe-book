import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  getIngredients,
  addRecipe,
} from "../../utils/api";
import { Row, Col, Button } from "react-bootstrap";
import { AlertContext } from "../../App";

// Components
import RecipeEdit from "../../components/RecipeEdit/RecipeEdit";
import RecipeDisplay from "../../components/RecipeDisplay/RecipeDisplay";

export default function RecipeDetails() {
  const navigate = useNavigate();
  const { setPageAlert } = useContext(AlertContext);

  // All ingredients
  const [allIngredients, setAllIngredients] = useState([]);

  // Recipe Details
  const [recipe, setRecipe] = useState({});
  const [callsFors, setCallsFors] = useState([]);
  const [directions, setDirections] = useState([]);

  async function handleIngredientFetch() {
    setAllIngredients(await getIngredients());
  }

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

  async function handleSubmitRecipeCreate(event) {
    await addRecipe(
      event,
      { recipe, directions, callsFors },
      setPageAlert,
      navigate
    );
  }

  function renderSubmitCreateButton() {
    return (
      <Button className="mb-3" type="submit">
        Submit
      </Button>
    );
  }

  return (
    <>
      <Row>
        <h1>Create New Recipe</h1>
        <p>
          Start creating a new recipe from scratch. Click Submit to save your
          recipe.
        </p>
      </Row>
      <Row>
        <Col xs={12} md={6}>
          <RecipeEdit
            recipe={recipe}
            setRecipe={setRecipe}
            allIngredients={allIngredients}
            callsFors={callsFors}
            setCallsFors={setCallsFors}
            directions={directions}
            setDirections={setDirections}
            handleFormSubmit={handleSubmitRecipeCreate}
            renderSubmitButtonGroup={renderSubmitCreateButton}
            recipeID={""}
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
  );
}
