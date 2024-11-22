import { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

// Components
import IngredientEdit from "./IngredientEdit/IngredientEdit";
import DirectionEdit from "./DirectionEdit/DirectionEdit";

export default function RecipeEdit({
  recipe,
  setRecipe,
  allIngredients,
  callsFors,
  setCallsFors,
  directions,
  setDirections,
  handleFormSubmit,
  renderSubmitButtonGroup,
  recipeID,
}) {
  const [validated, setValidated] = useState(false);

  function handleRecipeFormEdits(newValue, field) {
    setRecipe((prevValues) => {
      const newValues = { ...prevValues };
      console.log("newValues", newValues);
      newValues[field] = newValue;
      return newValues;
    });
    console.log("newValue", newValue);
    console.log("id", field);
  }

  async function handleFormValidation(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    handleFormSubmit()
  }

  return (
    <Form validated={validated} onSubmit={(event) => handleFormValidation(event)}>
      <Form.Group>{renderSubmitButtonGroup()}</Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="dishName">Name</Form.Label>&nbsp;
        <Form.Text>Required</Form.Text>
        <Form.Control
          required
          type="text"
          id="dishName"
          name="dishName"
          placeholder="..."
          value={recipe.dishName}
          onChange={(event) =>
            handleRecipeFormEdits(event.target.value, event.target.id)
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="description">Description</Form.Label>
        <Form.Control
          as="textarea"
          id="description"
          name="description"
          placeholder="..."
          value={recipe.description}
          onChange={(event) =>
            handleRecipeFormEdits(event.target.value, event.target.id)
          }
        />
      </Form.Group>
      <IngredientEdit
        allIngredients={allIngredients}
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
  );
}

RecipeEdit.propTypes = {
  recipe: PropTypes.object,
  setRecipe: PropTypes.func,
  allIngredients: PropTypes.arrayOf(PropTypes.any),
  callsFors: PropTypes.arrayOf(PropTypes.any),
  setCallsFors: PropTypes.func,
  directions: PropTypes.arrayOf(PropTypes.any),
  setDirections: PropTypes.func,
  handleFormSubmit: PropTypes.func,
  renderSubmitButtonGroup: PropTypes.func,
  recipeID: PropTypes.string,
};
