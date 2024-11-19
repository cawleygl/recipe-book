import { useState, useEffect } from "react";
import { getIngredients, addIngredient } from "../../utils/api";
import { volumetricUnits, convertVolumetricUnits } from "../../utils/tools";
import { ListGroup, Form, Button, InputGroup } from "react-bootstrap";

export default function CreateRecipe() {
  // All Recipes and Ingredients Lists
  const [ingredientList, setIngredientList] = useState([]);
  // Ingredient Entry Variables
  const [ingredientName, setIngredientName] = useState("");
  // Unit Entry Variables
  const [unitInput, setUnitInput] = useState(volumetricUnits.TEASPOON.name);
  const [unitOutput, setUnitOutput] = useState(volumetricUnits.TEASPOON.name);
  const [unitAmount, setUnitAmount] = useState(0);

  async function handleIngredientFetch() {
    setIngredientList(await getIngredients());
  }

  const handleIngredientAdd = async () => {
    //event.preventDefault();
    await addIngredient(ingredientName.trim());
    setIngredientName("");
    await handleIngredientFetch();
  };

  useEffect(() => {
    handleIngredientFetch();
  }, []);
  useEffect(() => {
    console.log("unitInput", unitInput);
  }, [unitInput]);
  useEffect(() => {
    console.log("unitOutput", unitOutput);
  }, [unitOutput]);
  useEffect(() => {
    console.log("ingredientList", ingredientList);
  }, [ingredientList]);

  return (
    <>
      <h1>Ingredients</h1>
      <p>{convertVolumetricUnits(unitAmount, unitInput, unitOutput)}</p>
      <input
        type="number"
        id="unitAmount"
        name="unitAmount"
        placeholder="Amount"
        value={unitAmount}
        onChange={(event) => setUnitAmount(event.target.value)}
      />
      <select
        id="unitInput"
        name="unitInput"
        onChange={(event) => setUnitInput(event.target.value)}
      >
        {volumetricUnits &&
          Object.values(volumetricUnits).map((unit) => {
            return <option key={unit.abbreviation}>{unit.name}</option>;
          })}
      </select>
      &nbsp;{"->"}&nbsp;
      <select
        id="unitOutput"
        name="unitOutput"
        onChange={(event) => setUnitOutput(event.target.value)}
      >
        {volumetricUnits &&
          Object.values(volumetricUnits).map((unit) => {
            return <option key={unit.abbreviation}>{unit.name}</option>;
          })}
      </select>
      <br />
      <h2>Add Ingredient:</h2>
      <Form>
        <Form.Group>
          <InputGroup className="mb-3">
            <InputGroup.Text htmlFor="ingredientName">Name</InputGroup.Text>
            <Form.Control
              type="text"
              id="ingredientName"
              name="ingredientName"
              placeholder="..."
              onChange={(event) => setIngredientName(event.target.value)}
            />
            <Button onClick={(event) => handleIngredientAdd(event)}>
              Submit
            </Button>
          </InputGroup>
        </Form.Group>
      </Form>
      <ListGroup horizontal={"sm"}>
        {ingredientList &&
          ingredientList.map((ingredient, index) => {
            return (
              <ListGroup.Item key={index}>
                {ingredient.ingredientName.trim()}
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    </>
  );
}
