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
import { deleteCallsFor } from "../../../utils/api";
import { volumetricUnits } from "../../../utils/tools";

import "./IngredientEdit.css";

export default function IngredientEdit({
  allIngredients,
  callsFors,
  setCallsFors,
  recipeID,
}) {
  const [options, setOptions] = useState([]);
  // Ingredient Add Inputs
  const [ingredientSearchTerm, setIngredientSearchTerm] = useState("");

  // Log state variables
  // useEffect(() => {
  //   console.log("options", options);
  // }, [options]);
  // useEffect(() => {
  //   console.log("ingredientSearchTerm", ingredientSearchTerm);
  // }, [ingredientSearchTerm]);

  // Check if ingredient is already added
  function checkDuplicateIngredients(event, ingredientBody) {
    event.preventDefault();
    for (const callsFor of callsFors) {
      if (
        callsFor.ingredient.ingredientName === ingredientBody.ingredientName
      ) {
        return true;
      }
    }
    return false;
  }

  function handleAddIngredientToRecipe(event, ingredientBody) {
    event.preventDefault();
    // Check if ingredient is already added
    if (checkDuplicateIngredients(event, ingredientBody)) return;

    setCallsFors((prevValues) => {
      const newValues = [...prevValues];
      newValues.push({
        ingredient: ingredientBody,
        unit: "whole",
        amount: "",
        modifier: "",
      });
      return newValues;
    });

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

  function handleIngredientFieldEdit(event, field, newValue, id) {
    event.preventDefault();
    setCallsFors((prevValues) => {
      const newValues = [...prevValues];
      const editCallsFor = newValues.find(
        (callsFor) => callsFor.ingredient._id === id
      );
      editCallsFor[field] = newValue;
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
      if (callsFor.ingredient._id === optionID) return true;
    }
    return false;
  }

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="addIngredient">Choose Ingredients</Form.Label>
        {callsFors.map((callsFor) => {
          return (
            <InputGroup key={callsFor.ingredient.ingredientName}>
              <InputGroup.Text>-</InputGroup.Text>
              <Form.Control
                type="number"
                value={callsFor.amount}
                min="0"
                placeholder="Add Amount"
                onChange={(event) =>
                  handleIngredientFieldEdit(
                    event,
                    "amount",
                    event.target.value,
                    callsFor.ingredient._id
                  )
                }
              />
              <Form.Select
                type="text"
                defaultValue="whole"
                onChange={(event) => {
                  handleIngredientFieldEdit(
                    event,
                    "unit",
                    event.target.value,
                    callsFor.ingredient._id
                  );
                }}
              >
                <option disabled value={""}>
                  Add Unit
                </option>
                {Object.values(volumetricUnits).map((unit, index) => {
                  return (
                    <option key={index} value={unit.code}>
                      {unit.code}
                    </option>
                  );
                })}
              </Form.Select>
              <InputGroup.Text>
                {callsFor.ingredient.ingredientName}
              </InputGroup.Text>
              <Form.Control
                type="text"
                value={callsFor.modifier}
                placeholder="Add Modifier"
                onChange={(event) =>
                  handleIngredientFieldEdit(
                    event,
                    "modifier",
                    event.target.value,
                    callsFor.ingredient._id
                  )
                }
              />
              <Button
                onClick={(event) =>
                  handleIngredientRemove(event, callsFor.ingredient._id)
                }
              >
                <i className="fa-solid fa-ban"></i>
              </Button>
            </InputGroup>
          );
        })}
        <Form.Control
          className="mt-2"
          name="addIngredient"
          type="text"
          value={ingredientSearchTerm}
          placeholder="Ingredient"
          onChange={(event) => handleIngredientSearch(event)}
        />
        <Collapse in={ingredientSearchTerm !== ""}>
          <ListGroup
            id="ingredientSelect"
            className={options.length > 6 ? "scrollable" : ""}
          >
            {options.map((ingredient) => {
              return (
                <ListGroup.Item
                  key={ingredient._id}
                  action
                  variant="primary"
                  disabled={disableAddedIngredients(ingredient._id)}
                  onClick={(event) =>
                    handleAddIngredientToRecipe(event, ingredient)
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
}

IngredientEdit.propTypes = {
  allIngredients: PropTypes.arrayOf(PropTypes.any),
  callsFors: PropTypes.arrayOf(PropTypes.any),
  setCallsFors: PropTypes.func,
  recipeID: PropTypes.string,
};
