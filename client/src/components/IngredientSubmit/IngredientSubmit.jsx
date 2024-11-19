import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Button,
  ListGroup,
  InputGroup,
  Container,
  Collapse,
} from "react-bootstrap";
import { deleteCallsFor } from "../../utils/api";

import "./IngredientSubmit.css";

export default function IngredientSubmit({
  editMode,
  allIngredients,
  callsFors,
  setCallsFors,
  recipeID
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
  function checkDuplicateIngredients(event, ingredientBody) {
    event.preventDefault();
    for (const callsFor of callsFors) {
      if (
        callsFor.ingredient.ingredientName === ingredientBody.ingredientName
      ) {
        console.log("DUPLICATE INGREDIENT");
        return true;
      }
    }
    return false;
  }

  function handleAddIngredientToRecipe(
    event,
    ingredientBody,
    ingredientModifier
  ) {
    event.preventDefault();
    // Check if ingredient is already added
    if (checkDuplicateIngredients(event, ingredientBody)) return;

    setCallsFors((prevValues) => {
      const newValues = [...prevValues];
      newValues.push({
        ingredient: ingredientBody,
        amount: 1,
        modifier: ingredientModifier,
      });
      return newValues;
    });

    console.log(
      "Submit Ingredient:",
      ingredientBody + ", " + ingredientModifier
    );
    setIngredientModifier("");
    setIngredientSearchTerm("");
    setOptions([]);
  }

  function handleCreateNewIngredient(event) {
    event.preventDefault();
    let ingredientInput = ingredientSearchTerm.trim();

    // Check if ingredient is already added
    if (checkDuplicateIngredients(event, { ingredientName: ingredientInput }))
      return;
    // Check if ingredient has already been created
    for (const ingredient of allIngredients) {
      if (
        ingredient.ingredientName.toLowerCase() ===
        ingredientInput.toLowerCase()
      ) {
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

    console.log("New Ingredient", ingredientInput);
    setIngredientSearchTerm("");
    handleAddIngredientToRecipe(event, { ingredientName: ingredientInput }, "");
  }

  const handleIngredientSearch = (event) => {
    event.preventDefault();
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

  function handleModifierEdit(event, newValue, id) {
    event.preventDefault();
    console.log(id);
    setCallsFors((prevValues) => {
      const newValues = [...prevValues];
      const editIngredient = newValues.find(
        (callsFor) => callsFor.ingredient._id === id
      );
      editIngredient.modifier = newValue;
      return newValues;
    });
  }

  function handleIngredientRemove(event, ingredientID) {
    event.preventDefault();
    setCallsFors((prevValues) => {
      const newValues = [...prevValues];
      const deleteIndex = newValues.findIndex(
        (callsFor) => callsFor.ingredient._id === ingredientID
      );
      if (newValues[deleteIndex]._id) {
        deleteCallsFor(recipeID, newValues[deleteIndex]._id); 
      }
      newValues.splice(deleteIndex, 1);
      return newValues;
    });
  }

  function disableAddedIngredients(optionID) {
    for (const callsFor of callsFors) {
      console.log("COMPARE: ", callsFor.ingredient._id, optionID);
      if (callsFor.ingredient._id === optionID) return true;
    }
    return false;
  }

  if (editMode)
    return (
      <>
        <Container>
          <Form.Group className="mb-3">
            {callsFors.map((ingredient) => {
              return (
                <InputGroup key={ingredient.ingredient.ingredientName}>
                  <InputGroup.Text>
                    {ingredient.ingredient.ingredientName}
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    value={ingredient.modifier}
                    placeholder="Add Modifier"
                    onChange={(event) =>
                      handleModifierEdit(
                        event,
                        event.target.value,
                        ingredient.ingredient._id
                      )
                    }
                  />
                  <Button
                    onClick={(event) =>
                      handleIngredientRemove(event, ingredient.ingredient._id)
                    }
                  >
                    Remove
                  </Button>
                </InputGroup>
              );
            })}
          </Form.Group>
        </Container>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="addIngredient">Add Ingredients</Form.Label>
          <InputGroup>
            <Form.Control
              name="addIngredient"
              type="text"
              value={ingredientSearchTerm}
              placeholder="Ingredient"
              onChange={(event) => handleIngredientSearch(event)}
            />
            <Form.Control
              type="text"
              value={ingredientModifier}
              placeholder="Modifier"
              onChange={(event) => setIngredientModifier(event.target.value)}
            />
          </InputGroup>
          <Collapse in={ingredientSearchTerm !== ""}>
            <ListGroup
              id="ingredientSelect"
              className={options.length > 6 ? "scrollable" : ""}
            >
              {options
                .sort((a, b) => a.ingredientName - b.ingredientName)
                .map((ingredient) => {
                  return (
                    <ListGroup.Item
                      key={ingredient._id}
                      action
                      variant="primary"
                      disabled={disableAddedIngredients(ingredient._id)}
                      onClick={(event) =>
                        handleAddIngredientToRecipe(
                          event,
                          ingredient,
                          ingredientModifier
                        )
                      }
                    >
                      {"Add " + ingredient.ingredientName + " To Recipe"}
                    </ListGroup.Item>
                  );
                })}
              <ListGroup.Item
                action
                variant="primary"
                onClick={(event) => handleCreateNewIngredient(event)}
              >
                {"Create New Ingredient: " + ingredientSearchTerm}
              </ListGroup.Item>
            </ListGroup>
          </Collapse>
        </Form.Group>
      </>
    );
  else
    return (
      <>
        <ListGroup className="mb-3">
          {callsFors.map((ingredient) => {
            return (
              <ListGroup.Item key={ingredient.ingredient._id}>
                {ingredient.ingredient.ingredientName}
                {ingredient.modifier ? ", " + ingredient.modifier : ""}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </>
    );
}

IngredientSubmit.propTypes = {
  editMode: PropTypes.bool,
  allIngredients: PropTypes.arrayOf(PropTypes.any),
  callsFors: PropTypes.arrayOf(PropTypes.any),
  setCallsFors: PropTypes.func,
  recipeID: PropTypes.string
};
