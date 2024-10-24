import PropTypes from "prop-types";

export default function DirectionList({ editMode, directions, setDirections }) {
	function handleDirectionEdit(newValue, index) {
    setDirections((prevValues) => {
      const newValues = [...prevValues];
      newValues[index].instruction = newValue;
      return newValues;
    });
  }

  function handleDirectionAdd() {
    setDirections((prevValues) => {
      const newValues = [...prevValues];
      newValues.push({ instruction: "", index: directions.length });
      return newValues;
    });
  }

  function handleDirectionDelete(directionID) {
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

	
	if (editMode)
    return (
      <>
        <h3>Edit Directions:</h3>
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
                    handleDirectionEdit(event.target.value, direction.index)
                  }
                />
                <button onClick={() => handleDirectionMoveUp(direction.index)}>
                  Up
                </button>
                <button
                  onClick={() => handleDirectionMoveDown(direction.index)}
                >
                  Down
                </button>
                <button onClick={() => handleDirectionDelete(direction._id)}>
                  Delete
                </button>
                <br />
              </div>
            );
          })}
        <button onClick={handleDirectionAdd}>Add New Direction</button>
      </>
    );
  else
    return directions
      .sort((a, b) => a.index - b.index)
      .map((direction) => {
        return (
          <div key={direction.index}>
            <p>
              {"Step " + (direction.index + 1) + ": " + direction.instruction}
            </p>
          </div>
        );
      });
}

DirectionList.propTypes = {
  editMode: PropTypes.bool,
  directions: PropTypes.arrayOf(PropTypes.any),
  setDirections: PropTypes.func,
};
