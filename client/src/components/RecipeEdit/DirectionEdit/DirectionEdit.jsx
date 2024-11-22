import PropTypes from "prop-types";
import { Row, Col, Form, Button, InputGroup, ListGroup } from "react-bootstrap";
import { deleteDirection } from "../../../utils/api";

export default function DirectionEdit({ directions, setDirections, recipeID }) {
  function handleDirectionEdit(event, newValue, index) {
    event.preventDefault();
    setDirections((prevValues) => {
      const newValues = [...prevValues];
      newValues[index].instruction = newValue;
      return newValues;
    });
  }

  function handleDirectionAdd(event) {
    event.preventDefault();
    setDirections((prevValues) => {
      const newValues = [...prevValues];
      newValues.push({ instruction: "", index: directions.length });
      return newValues;
    });
  }

  function handleDirectionDelete(event, directionID) {
    event.preventDefault();
    setDirections((prevValues) => {
      const newValues = [...prevValues];
      const deleteIndex = newValues.findIndex(
        (direction) => direction._id === directionID
      );
      if (newValues[deleteIndex]._id) {
        deleteDirection(recipeID, newValues[deleteIndex]._id);
      }
      newValues.splice(deleteIndex, 1);
      // Reallocate indicies
      newValues.forEach(
        (direction) => (direction.index = newValues.indexOf(direction))
      );
      return newValues;
    });
  }

  function handleDirectionMoveUp(event, index) {
    event.preventDefault();
    setDirections((prevValues) => {
      const newValues = [...prevValues];
      if (index === 0) {
        return newValues;
      }
      let target = newValues.find((direction) => direction.index === index);
      let trade = newValues.find((direction) => direction.index === index - 1);

      target.index = index - 1;
      trade.index = index;

      return newValues;
    });
  }

  function handleDirectionMoveDown(event, index) {
    event.preventDefault();
    setDirections((prevValues) => {
      const newValues = [...prevValues];
      if (index === directions.length - 1) {
        return newValues;
      }
      let target = newValues.find((direction) => direction.index === index);
      let trade = newValues.find((direction) => direction.index === index + 1);

      target.index = index + 1;
      trade.index = index;

      return newValues;
    });
  }

  return (
    <Form.Group className="mb-3">
      <Form.Label>Add Directions</Form.Label>

      <Button
        className="float-end mb-2"
        onClick={(event) => handleDirectionAdd(event)}
      >
        <i className="fa-solid fa-plus"></i>
      </Button>

      {directions
        .sort((a, b) => a.index - b.index)
        .map((direction) => {
          return (
            <InputGroup key={direction.index}>
              <InputGroup.Text htmlFor={"direction " + direction.index}>
                {"Step " + (direction.index + 1) + ":"}
              </InputGroup.Text>
              <Form.Control
                key={direction._id}
                name={"direction " + direction.index}
                placeholder="New Direction"
                value={direction.instruction}
                onChange={(event) =>
                  handleDirectionEdit(
                    event,
                    event.target.value,
                    direction.index
                  )
                }
              />
              <Button
                onClick={(event) =>
                  handleDirectionMoveUp(event, direction.index)
                }
              >
                <i className="fa-solid fa-chevron-up"></i>
              </Button>
              <Button
                onClick={(event) =>
                  handleDirectionMoveDown(event, direction.index)
                }
              >
                <i className="fa-solid fa-chevron-down"></i>
              </Button>
              <Button
                variant="danger"
                onClick={(event) => handleDirectionDelete(event, direction._id)}
              >
                <i className="fa-solid fa-trash"></i>
              </Button>
            </InputGroup>
          );
        })}
    </Form.Group>
  );
}

DirectionEdit.propTypes = {
  directions: PropTypes.arrayOf(PropTypes.any),
  setDirections: PropTypes.func,
  recipeID: PropTypes.string,
};
