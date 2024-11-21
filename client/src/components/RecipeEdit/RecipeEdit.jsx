import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

export default function RecipeEdit({ recipe, setRecipe }) {
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

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="dishName">Name</Form.Label>
        <Form.Control
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
    </>
  );
}

RecipeEdit.propTypes = {
  recipe: PropTypes.object,
  setRecipe: PropTypes.func,
};
