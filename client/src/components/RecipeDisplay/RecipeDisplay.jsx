import React from "react";
import PropTypes from "prop-types";
import { Card, ListGroup } from "react-bootstrap";
import { formatUnitName, formatIngredientName } from "../../utils/tools";

import "./RecipeDisplay.css";

export default function RecipeDisplay({ recipe, directions, callsFors, renderEditButton }) {
  return (
    <Card className="recipeCard mt-4">
      <Card.Header className="recipeCardHeader">
        <h1>{recipe.dishName || "Recipe"}
        {renderEditButton && renderEditButton()}
        </h1>
      
        <p>{recipe.description || "Description"}</p>
        
      </Card.Header>
      <Card.Body className="recipeCardBody">
        <ListGroup className="mb-3">
          <ListGroup.Item disabled>Ingredients</ListGroup.Item>
          {callsFors.map((callsFor) => {
            return (
              <ListGroup.Item key={callsFor.ingredient._id}>
                {(callsFor.amount && parseInt(callsFor.amount) > 0
                  ? callsFor.amount
                  : "") +
                  " " +
                  (callsFor.unit && parseInt(callsFor.amount) > 0
                    ? formatUnitName(callsFor.unit, callsFor.amount) + " "
                    : "")}
                {formatIngredientName(
                  callsFor.ingredient.ingredientName,
                  callsFor.amount,
                  callsFor.unit
                )}
                {callsFor.modifier ? ", " + callsFor.modifier : ""}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
        <ListGroup className="mb-3">
          <ListGroup.Item disabled>Directions</ListGroup.Item>
          {directions
            .sort((a, b) => a.index - b.index)
            .map((direction) => {
              return (
                <ListGroup.Item key={direction.index}>
                  {"Step " +
                    (direction.index + 1) +
                    ": " +
                    direction.instruction}
                </ListGroup.Item>
              );
            })}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

RecipeDisplay.propTypes = {
  recipe: PropTypes.object,
  directions: PropTypes.array,
  callsFors: PropTypes.array,
  renderEditButton: PropTypes.func
};
