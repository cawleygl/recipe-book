import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getOneRecipe,
  getIngredients,
  getAllDirectionsOnRecipe,
  getAllIngredientsOnRecipe,
  editRecipe,
  addDirection,
  addIngredient,
  deleteDirection,
  editDirection,
  addCallsFor,
  deleteCallsFor,
  editCallsFor,
  deleteRecipe,
} from "../../utils/api";
import { Form, Button, ButtonGroup } from "react-bootstrap";

// Components
import RecipeSubmit from "../../components/RecipeSubmit/RecipeSubmit";
import IngredientSubmit from "../../components/IngredientSubmit/IngredientSubmit";
import DirectionSubmit from "../../components/DirectionSubmit/DirectionSubmit";

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

  // async function handleSubmitAllEdits(editMode) {
  //   await handleSubmitRecipeEdits();
  //   await handleSubmitDirectionEdits();
  //   await handleSubmitIngredientEdits();
  //   setEditMode(editMode);
  // }

  async function handleSubmitRecipeEdits(editMode) {
    await editRecipe(recipeID, { recipe, directions, callsFors });
    setEditMode(editMode);
    handleRecipeFetch();
  }

  // async function handleSubmitDirectionEdits() {
  //   // Get all directions saved in the database for this recipe
  //   let dbDirections = await getAllDirectionsOnRecipe(recipeID);

  //   // For each (edited) direction in state
  //   for (const direction of directions) {
  //     // If the direction has an id, edit it in db and remove it from the dbDirections array
  //     if (direction._id) {
  //       const deleteIndex = dbDirections.findIndex(
  //         (dbDirection) => dbDirection._id === direction._id
  //       );
  //       // Only edit if instruction has changed in state
  //       if (
  //         dbDirections[deleteIndex].instruction.trim() !==
  //         direction.instruction.trim()
  //       ) {
  //         console.log("EDIT " + direction._id);
  //         await editDirection(
  //           recipeID,
  //           direction._id,
  //           direction.index,
  //           direction.instruction.trim()
  //         );
  //       }

  //       dbDirections.splice(deleteIndex, 1);
  //       // If direction does not have an id (newly created), add it to db
  //     } else {
  //       console.log("ADD " + direction.instruction.trim());
  //       await addDirection(
  //         recipeID,
  //         direction.index,
  //         direction.instruction.trim()
  //       );
  //     }
  //   }

  //   // Delete remaining directions in dbDirections array (were deleted from state)
  //   for (const dbDirection of dbDirections) {
  //     console.log("DELETE " + dbDirection._id);
  //     await deleteDirection(recipeID, dbDirection._id);
  //   }
  // }

  // async function handleSubmitIngredientEdits() {
  //   // Get all ingredients saved in the database for this recipe
  //   let dbIngredients = await getAllIngredientsOnRecipe(recipeID);
  //   console.log("dbIngredients", dbIngredients);
  //   for (const ingredient of ingredients) {
  //     // If the callsfor object has an id, edit it in db and remove it from the dbIngredients array
  //     if (ingredient._id) {
  //       const deleteIndex = dbIngredients.findIndex(
  //         (dbIngredient) => dbIngredient._id === ingredient._id
  //       );
  //       // Only edit if modifier has changed in state
  //       if (
  //         dbIngredients[deleteIndex].modifier.trim() !==
  //         ingredient.modifier.trim()
  //       ) {
  //         console.log("EDIT " + ingredient._id);
  //         await editCallsFor(
  //           recipeID,
  //           ingredient._id,
  //           ingredient.amount,
  //           ingredient.modifier.trim()
  //         );
  //       }

  //       dbIngredients.splice(deleteIndex, 1);
  //       // If callsfor object does not have an id (newly created), add it to db
  //     } else {
  //       // If ingredient object does not have an id (newly created) add it to db first and save new id to callsfor object
  //       if (!ingredient.ingredient._id) {
  //         const {
  //           json: { _id: newIngredientID },
  //         } = await addIngredient(
  //           ingredient.ingredient.ingredientName,
  //           ingredient.ingredient.unit
  //         );
  //         ingredient.ingredient._id = newIngredientID;
  //       }

  //       // add callsfor to db
  //       console.log("ADD " + ingredient.ingredient._id);
  //       await addCallsFor(
  //         recipeID,
  //         ingredient.ingredient._id,
  //         1,
  //         ingredient.modifier.trim()
  //       );
  //     }
  //   }

  //   // Delete remaining directions in dbDirections array (were deleted from state)
  //   for (const dbIngredient of dbIngredients) {
  //     console.log("DELETE " + dbIngredient._id);
  //     await deleteCallsFor(recipeID, dbIngredient._id);
  //   }
  // }

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
            </>
          ) : (
            <Button className="mb-3" onClick={() => setEditMode(true)}>
              Edit
            </Button>
          )}
          <Form>
            <RecipeSubmit
              editMode={editMode}
              recipe={recipe}
              setRecipe={setRecipe}
            />
            <h2>Ingredients</h2>
            <IngredientSubmit
              editMode={editMode}
              allIngredients={allIngredients}
              handleIngredientFetch={handleIngredientFetch}
              callsFors={callsFors}
              setCallsFors={setCallsFors}
              recipeID={recipeID}
            />
            <h2>Directions</h2>
            <DirectionSubmit
              editMode={editMode}
              directions={directions}
              setDirections={setDirections}
              recipeID={recipeID}
            />
          </Form>
        </>
      ) : (
        <h1>Recipe Not Found</h1>
      )}
    </>
  );
}
