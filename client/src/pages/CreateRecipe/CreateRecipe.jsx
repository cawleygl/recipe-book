import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  getIngredients,
  addRecipe,
  addDirection,
  addIngredient,
  addCallsFor,
} from "../../utils/api";
import { Form, Button } from "react-bootstrap";
import { AlertContext } from "../../App";

// Components
import RecipeSubmit from "../../components/RecipeSubmit/RecipeSubmit";
import IngredientSubmit from "../../components/IngredientSubmit/IngredientSubmit";
import DirectionSubmit from "../../components/DirectionSubmit/DirectionSubmit";

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
    await addRecipe(event, { recipe, directions, callsFors }, setPageAlert, navigate);
    // TODO: Add Directions and Ingredients on Backend
    // if (recipeID) {
    //   await handleSubmitDirections(recipeID);
    //   await handleSubmitIngredients(recipeID);
      
    // }
  }

  async function handleSubmitDirections(recipeID) {
    // Add all directions in state
    for (const direction of directions) {
      console.log("ADD " + direction.instruction.trim());
      await addDirection(
        recipeID,
        direction.index,
        direction.instruction.trim()
      );
    }
  }

  async function handleSubmitIngredients(recipeID) {
    for (const callsFor of callsFors) {
      // If ingredient object does not have an id (newly created) add it to db first and save new id to callsfor object
      if (!callsFor.ingredient._id) {
        const {
          json: { _id: newIngredientID },
        } = await addIngredient(
          callsFor.ingredient.ingredientName,
          callsFor.ingredient.unit
        );
        callsFor.ingredient._id = newIngredientID;
      }

      // add callsfor to db
      console.log("ADD " + callsFor.ingredient._id);
      await addCallsFor(
        recipeID,
        callsFor.ingredient._id,
        1,
        callsFor.modifier.trim()
      );
    }
  }

  return (
    <>
      <Button className="mb-3" onClick={(event) => handleSubmit(event)}>
        Submit
      </Button>
      <h1>Create New Recipe</h1>
      <Form>
        <RecipeSubmit editMode={true} recipe={recipe} setRecipe={setRecipe} />
        <h2>Ingredients</h2>
        <IngredientSubmit
          editMode={true}
          allIngredients={allIngredients}
          handleIngredientFetch={handleIngredientFetch}
          callsFors={callsFors}
          setCallsFors={setCallsFors}
          recipeID={""}
        />
        <h2>Directions</h2>
        <DirectionSubmit
          editMode={true}
          directions={directions}
          setDirections={setDirections}
          recipeID={""}
        />
      </Form>
    </>
  );
}
