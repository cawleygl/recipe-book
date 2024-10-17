import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getOneRecipe,
  getIngredients,
  addCallsFor,
  getAllDirectionsOnRecipe,
  addDirection,
  deleteDirection,
  editDirection,
} from "../utils/api";

export default function RecipeDetails() {
  const [editMode, setEditMode] = useState(true);
  const params = useParams();
  const [recipeID] = useState(params.id?.toString() || undefined);
  // Recipe Details
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [directions, setDirections] = useState([]);
  // All ingredients
  const [allIngredients, setAllIngredients] = useState([]);
	// Ingredient Add Inputs
	const [selectIngredient, setSelectIngredient] = useState("");
	const [ingredientModifier, setIngredientModifier] = useState("");

  async function handleRecipeFetch() {
    const { recipe, directions, ingredients } = await getOneRecipe(recipeID);
    setRecipe(recipe);
    setDirections(directions);
    setIngredients(ingredients);
  }

  async function handleIngredientFetch() {
    setAllIngredients(await getIngredients());
  }

  useEffect(() => {
    handleRecipeFetch();
    handleIngredientFetch();
  }, [recipeID]);

  useEffect(() => {
    console.log("recipe", recipe);
  }, [recipe]);
  useEffect(() => {
    console.log("directions", directions);
  }, [directions]);
  useEffect(() => {
    console.log("ingredients", ingredients);
  }, [ingredients]);
  useEffect(() => {
    console.log("allIngredients", allIngredients);
  }, [allIngredients]);
  useEffect(() => {
    console.log("ingredientModifier", ingredientModifier);
  }, [ingredientModifier]);

  async function addIngredientToRecipe() {
    await addCallsFor(recipeID, selectIngredient, 1, ingredientModifier);
    handleRecipeFetch();
  }

  function handleDirectionEdit(newValue, index) {
    setDirections((prevValues) => {
      const newValues = [...prevValues];
      newValues[index].instruction = newValue;
      return newValues;
    });
  }

  async function handleDirectionAdd() {
    setDirections((prevValues) => {
      const newValues = [...prevValues];
      newValues.push({ instruction: "", index: directions.length });
      return newValues;
    });
  }

  async function handleDirectionDelete(directionID) {
    setDirections((prevValues) => {
      const newValues = [...prevValues];
      const deleteIndex = newValues.findIndex(
        (direction) => direction._id === directionID
      );
      newValues.splice(deleteIndex, 1);
      // Reallocate indicies
      newValues.forEach(
        (direction) => (direction.index = newValues.indexOf(direction))
      );
      return newValues;
    });
  }

  function handleDirectionMoveUp(index) {
    console.log("index", index);
    setDirections((prevValues) => {
      const newValues = [...prevValues];
      if (index === 0) {
        console.log("Direction already at top");
        return newValues;
      }
      let target = newValues.find((direction) => direction.index === index);
      let trade = newValues.find((direction) => direction.index === index - 1);

      target.index = index - 1;
      trade.index = index;

      return newValues;
    });
  }

  function handleDirectionMoveDown(index) {
    console.log("index", index);
    setDirections((prevValues) => {
      const newValues = [...prevValues];
      if (index === directions.length - 1) {
        console.log("Direction already at bottom");
        return newValues;
      }
      let target = newValues.find((direction) => direction.index === index);
      let trade = newValues.find((direction) => direction.index === index + 1);

      target.index = index + 1;
      trade.index = index;

      return newValues;
    });
  }

  async function handleDirectionSubmit() {
    // Get all directions saved in the database for this recipe
    let dbDirections = await getAllDirectionsOnRecipe(recipeID);

    // For each (edited) direction in state
    for (const direction of directions) {
      // If the direction has an id, edit it in db and remove it from the dbDirections array
      if (direction._id) {
        const deleteIndex = dbDirections.findIndex(
          (dbDirection) => dbDirection._id === direction._id
        );

        if (
          dbDirections[deleteIndex].instruction.trim() !==
          direction.instruction.trim()
        ) {
          console.log("EDIT " + direction._id);
          await editDirection(
            recipeID,
            direction._id,
            direction.index,
            direction.instruction.trim()
          );
        }

        dbDirections.splice(deleteIndex, 1);
        // If direction does not have an id (newly created), add it to db
      } else {
        console.log("ADD " + direction.instruction.trim());
        await addDirection(
          recipeID,
          direction.index,
          direction.instruction.trim()
        );
      }
    }

    // Delete remaining directions in dbDirections array (were deleted from state)
    for (const dbDirection of dbDirections) {
      console.log("DELETE " + dbDirection._id);
      await deleteDirection(recipeID, dbDirection._id);
    }

    setEditMode(false);
  }

  return (
    <>
      {recipe ? (
        <>
          <h1>{recipe.dishName}</h1>
          <p>{recipe.description}</p>
          {editMode ? (
            <button onClick={handleDirectionSubmit}>Submit</button>
          ) : (
            <button onClick={() => setEditMode(true)}>Edit</button>
          )}
          <h2>Ingredients</h2>
          <ul>
            {ingredients.map((ingredient) => {
              return (
                <li key={ingredient._id}>
                  {ingredient.ingredient.ingredientName}{ingredient.modifier ? (", " + ingredient.modifier) : ""}
                </li>
              );
            })}
          </ul>
          <div>
            {editMode ? (
              <>
                <h3>Select Ingredients:</h3>
                <select name="ingredients" onChange={(event) => setSelectIngredient(event.target.value)}>
                  <option value="" disabled selected>
                    Select Ingredient
                  </option>
                  {allIngredients
                    .sort((a, b) => a.ingredientName - b.ingredientName)
                    .map((ingredient) => {
                      return (
                        <option key={ingredient._id} value={ingredient._id}>
                          {ingredient.ingredientName}
                        </option>
                      );
                    })}
                </select>,
								&nbsp;
								<input type="text" value={ingredientModifier} placeholder="Modifier" onChange={(event) => setIngredientModifier(event.target.value)}></input>
								<br />
								<button onClick={addIngredientToRecipe}>Add Ingredient</button>
              </>
            ) : (
              <></>
            )}
          </div>
          <h2>Directions</h2>
          <div>
            <h3>Edit Directions:</h3>
            {editMode ? (
              <>
                {directions
                  .sort((a, b) => a.index - b.index)
                  .map((direction) => {
                    return (
                      <div key={direction.index}>
                        <label htmlFor={"direction " + direction.index}>
                          {"Step " + (direction.index + 1) + ":"}
                        </label>
                        &nbsp;
                        <textarea
                          key={direction._id}
                          name={"direction " + direction.index}
                          placeholder="..."
                          value={direction.instruction}
                          onChange={(event) =>
                            handleDirectionEdit(
                              event.target.value,
                              direction.index
                            )
                          }
                        />
                        <button
                          onClick={() => handleDirectionMoveUp(direction.index)}
                        >
                          Up
                        </button>
                        <button
                          onClick={() =>
                            handleDirectionMoveDown(direction.index)
                          }
                        >
                          Down
                        </button>
                        <button
                          onClick={() => handleDirectionDelete(direction._id)}
                        >
                          Delete
                        </button>
                        <br />
                      </div>
                    );
                  })}
                <button onClick={handleDirectionAdd}>Add Direction</button>
              </>
            ) : (
              directions
                .sort((a, b) => a.index - b.index)
                .map((direction) => {
                  return (
                    <div key={direction.index}>
                      <p>
                        {"Step " +
                          (direction.index + 1) +
                          ": " +
                          direction.instruction}
                      </p>
                    </div>
                  );
                })
            )}
            <br />
          </div>
        </>
      ) : (
        <h1>Recipe Not Found</h1>
      )}
    </>
  );
}
