import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function IngredientList({
  editMode,
  allIngredients,
  ingredients,
  setIngredients,
}) {
  const [options, setOptions] = useState([]);
  // Ingredient Add Inputs
  const [ingredientSearchTerm, setIngredientSearchTerm] = useState("");
  const [ingredientModifier, setIngredientModifier] = useState("");

  // Log state variables
  useEffect(() => {
    console.log("options", options);
  }, [options]);
  useEffect(() => {
    console.log("ingredientSearchTerm", ingredientSearchTerm);
  }, [ingredientSearchTerm]);
  useEffect(() => {
    console.log("ingredientModifier", ingredientModifier);
  }, [ingredientModifier]);

	// Check if ingredient is already added
	function checkDuplicateIngredients(ingredientBody) {
    for (const ingredient of ingredients) {
      if (ingredient.ingredient.ingredientName === ingredientBody.ingredientName) {
        console.log("DUPLICATE INGREDIENT");
        return true;
      }
    }
		return false;
	}

  function handleAddIngredientToRecipe(
    ingredientBody,
    ingredientModifier
  ) {
    // Check if ingredient is already added
		if (checkDuplicateIngredients(ingredientBody)) return;

    setIngredients((prevValues) => {
      const newValues = [...prevValues];
      newValues.push({
        ingredient: ingredientBody,
        amount: 1,
        modifier: ingredientModifier,
      });
      return newValues;
    });

    console.log("Submit Ingredient:", ingredientBody + ", " + ingredientModifier);
    setIngredientModifier("");
    setIngredientSearchTerm("");
  }

  function handleCreateNewIngredient() {
		let ingredientInput = ingredientSearchTerm.trim();

		// Check if ingredient is already added
		if (checkDuplicateIngredients({ingredientName: ingredientInput})) return;
		// Check if ingredient has already been created
    for (const ingredient of allIngredients) {
			if (ingredient.ingredientName.toLowerCase() === ingredientInput.toLowerCase()) {
				alert(ingredientInput + " has already been created.");
				return;
			}
		}
			if (
      !confirm(
        `Are you sure you'd like to add "${ingredientInput}" as a new ingredient?`
      )
    )
      return;

    let unitInput = prompt(
      `Please enter the standard unit for ${ingredientInput}`
    ).trim();
    if (!unitInput) return;

		console.log("New Ingredient", ingredientInput, unitInput);
    setIngredientSearchTerm("");
		handleAddIngredientToRecipe({ingredientName: ingredientInput, unit: unitInput}, "");
  }

  const handleIngredientSearch = (event) => {
		let ingredientInput = event.target.value;
    setIngredientSearchTerm(ingredientInput);
    if (ingredientInput.trim()) {
      const filteredOptions = allIngredients.filter((option) =>
        option.ingredientName
          .toLowerCase()
          .startsWith(ingredientInput.trim().toLowerCase())
      );
      setOptions(filteredOptions);
    } else {
      setOptions([]);
    }
  };

  function handleModifierEdit(newValue, id) {
    console.log(id);
    setIngredients((prevValues) => {
      const newValues = [...prevValues];
      const editIngredient = newValues.find(
        (ingredient) => ingredient.ingredient._id === id
      );
      editIngredient.modifier = newValue;
      return newValues;
    });
  }

  function handleIngredientRemove(ingredientID) {
    setIngredients((prevValues) => {
      const newValues = [...prevValues];
      const deleteIndex = newValues.findIndex(
        (ingredient) => ingredient.ingredient._id === ingredientID
      );
      newValues.splice(deleteIndex, 1);
      return newValues;
    });
  }

  if (editMode)
    return (
      <>
        <ul>
          {ingredients.map((ingredient) => {
            return (
              <li key={ingredient.ingredient.ingredientName}>
                {ingredient.ingredient.ingredientName},&nbsp;
                <input
                  type="text"
                  value={ingredient.modifier}
                  placeholder="Modifier"
                  onChange={(event) =>
                    handleModifierEdit(
                      event.target.value,
                      ingredient.ingredient._id
                    )
                  }
                />
                <button
                  onClick={() =>
                    handleIngredientRemove(ingredient.ingredient._id)
                  }
                >
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
        <h3>Add Ingredients To Recipe</h3>
        <input
          type="text"
          value={ingredientSearchTerm}
          placeholder="..."
          onChange={(event) => handleIngredientSearch(event)}
        />
        ,&nbsp;
        <input
          type="text"
          value={ingredientModifier}
          placeholder="Modifier"
          onChange={(event) => setIngredientModifier(event.target.value)}
        />
        <div id="ingredientSelect">
          {options
            .sort((a, b) => a.ingredientName - b.ingredientName)
            .map((ingredient) => {
              return (
                <button
                  key={ingredient._id}
                  onClick={() =>
                    handleAddIngredientToRecipe(
                      ingredient,
                      ingredientModifier
                    )
                  }
                >
                  {"Add " + ingredient.ingredientName + " To Recipe"}
                </button>
              );
            })}
          {ingredientSearchTerm.trim() ? (
            <button onClick={() => handleCreateNewIngredient()}>
              {"Create New Ingredient: " + ingredientSearchTerm}
            </button>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  else
    return (
      <>
        <ul>
          {ingredients.map((ingredient) => {
            return (
              <li key={ingredient.ingredient._id}>
                {ingredient.ingredient.ingredientName}
                {ingredient.modifier ? ", " + ingredient.modifier : ""}
              </li>
            );
          })}
        </ul>
      </>
    );
}

IngredientList.propTypes = {
  editMode: PropTypes.bool,
  allIngredients: PropTypes.arrayOf(PropTypes.any),
  ingredients: PropTypes.arrayOf(PropTypes.any),
  setIngredients: PropTypes.func,
};
