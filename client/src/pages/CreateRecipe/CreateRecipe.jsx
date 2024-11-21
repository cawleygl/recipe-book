import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  getIngredients,
  addRecipe,
  addDirection,
  addIngredient,
  addCallsFor,
} from "../../utils/api";
import { Row, Col, Form, Button, ListGroup } from "react-bootstrap";
import { AlertContext } from "../../App";

// Components
import RecipeEdit from "../../components/RecipeEdit/RecipeEdit";
import RecipeDisplay from "../../components/RecipeDisplay/RecipeDisplay";
import IngredientEdit from "../../components/IngredientEdit/IngredientEdit";
import DirectionEdit from "../../components/DirectionEdit/DirectionEdit";

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

  async function handleSubmit(event) {
    await addRecipe(
      event,
      { recipe, directions, callsFors },
      setPageAlert,
      navigate
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
        <Col>
          <Form>
            <RecipeEdit recipe={recipe} setRecipe={setRecipe} />
            <IngredientEdit
              allIngredients={allIngredients}
              handleIngredientFetch={handleIngredientFetch}
              callsFors={callsFors}
              setCallsFors={setCallsFors}
              recipeID={""}
            />
            <DirectionEdit
              directions={directions}
              setDirections={setDirections}
              recipeID={""}
            />
            <Button className="mb-3" onClick={(event) => handleSubmit(event)}>
              Submit
            </Button>
          </Form>
        </Col>
        <Col>
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
