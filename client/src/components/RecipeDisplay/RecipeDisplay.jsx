import React from "react";
import PropTypes from "prop-types";
import { Container, ListGroup } from "react-bootstrap";
import { formatUnitName } from "../../utils/tools";

import "./RecipeDisplay.css"

export default function RecipeDisplay({ recipe, directions, callsFors }) {
  return (
    <Container className="recipeCard">
      <h1>{recipe.dishName || "Recipe"}</h1>
      <p>{recipe.description || "Description"}</p>
      <ListGroup className="mb-3">
        {callsFors && callsFors.length ? (
          callsFors.map((callsFor) => {
            return (
              <ListGroup.Item key={callsFor.ingredient._id}>
                {callsFor.amount +
                  " " +
                  (callsFor.unit
                    ? formatUnitName(callsFor.unit, callsFor.amount) + " "
                    : "")}
                {callsFor.ingredient.ingredientName}
                {callsFor.modifier ? ", " + callsFor.modifier : ""}
              </ListGroup.Item>
            );
          })
        ) : (
          <ListGroup.Item>Ingredients</ListGroup.Item>
        )}
      </ListGroup>
      <ListGroup className="mb-3">
        {directions && directions.length ? (
          directions
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
            })
        ) : (
          <ListGroup.Item>Directions</ListGroup.Item>
        )}
      </ListGroup>
    </Container>
  );
}

RecipeDisplay.propTypes = {
  recipe: PropTypes.object,
  directions: PropTypes.array,
  callsFors: PropTypes.array,
};
