import { useState, useEffect } from "react";
import {
  getIngredients,
  addIngredient,
  editIngredient,
  deleteIngredient,
} from "../../utils/api";
import { volumetricUnits, convertVolumetricUnits } from "../../utils/tools";
import {
  Row,
  Col,
  ListGroup,
  Form,
  Button,
  Offcanvas,
  ButtonGroup,
} from "react-bootstrap";

import "./ManageIngredients.css";

export default function CreateRecipe() {
  // All Recipes and Ingredients Lists
  const [ingredientList, setIngredientList] = useState([]);
  // Ingredient Entry Variables
  const [ingredientID, setIngredientID] = useState("");
  const [ingredientName, setIngredientName] = useState("");
  const [density, setDensity] = useState("");
  // Unit Entry Variables
  const [unitInput, setUnitInput] = useState(volumetricUnits.TEASPOON.name);
  const [unitOutput, setUnitOutput] = useState(volumetricUnits.TEASPOON.name);
  const [unitAmount, setUnitAmount] = useState(0);
  // Info Offcanvas
  const [showInfo, setShowInfo] = useState(false);

  const handleCloseInfo = () => setShowInfo(false);
  const handleShowInfo = () => setShowInfo(true);

  async function handleIngredientFetch() {
    setIngredientList(await getIngredients());
  }

  const handleIngredientAdd = async () => {
    //event.preventDefault();
    const ingredientBody = {
      ingredientName: ingredientName.trim(),
      density: density.trim(),
    };
    if (ingredientID) {
      await editIngredient(ingredientID, ingredientBody);
    } else {
      await addIngredient(ingredientBody);
    }

    await handleIngredientFetch();
    editNewIngredient();
  };

  async function handleDeleteIngredient(ingredientID) {
    const ingredient = ingredientList.find(
      (ingredient) => ingredient._id === ingredientID
    );
    if (
      !confirm(
        `Are you sure you'd like to delete ${ingredient.ingredientName}?`
      )
    )
      return;

    await deleteIngredient(ingredientID);
    await handleIngredientFetch();
    editNewIngredient();
  }

  function handleEditIngredient(id) {
    const ingredient = ingredientList.find(
      (ingredient) => ingredient._id === id
    );
    setIngredientID(id);
    setIngredientName(ingredient.ingredientName);
    setDensity(ingredient.density || "");
  }

  function editNewIngredient() {
    setIngredientID("");
    setIngredientName("");
    setDensity("");
  }

  useEffect(() => {
    handleIngredientFetch();
  }, []);
  // useEffect(() => {
  //   console.log("unitInput", unitInput);
  // }, [unitInput]);
  // useEffect(() => {
  //   console.log("unitOutput", unitOutput);
  // }, [unitOutput]);
  // useEffect(() => {
  //   console.log("ingredientList", ingredientList);
  // }, [ingredientList]);
  // useEffect(() => {
  //   console.log("ingredientName", ingredientName);
  // }, [ingredientName]);
  // useEffect(() => {
  //   console.log("density", density);
  // }, [density]);

  return (
    <>
      <Row>
        <h1>Ingredients</h1>
        <p>{`Select an Ingredient to edit, or select "New Ingredient" to add a new one.`}</p>
      </Row>
      <Row>
        <Col xs={12} md={6}>
          <h2>
            {ingredientID ? "Edit" : "Add"} Ingredient: {ingredientName}&nbsp;
          </h2>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="ingredientName">Name</Form.Label>&nbsp;
              <Form.Text>{`Required`}</Form.Text>&nbsp;
              <Button
                className="questionButton mb-3"
                variant="info"
                onClick={handleShowInfo}
              >
                <i className="fa-solid fa-question"></i>
              </Button>
              <Offcanvas show={showInfo} onHide={handleCloseInfo}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Questions?</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <p>
                    {`Consider how you'll buy the ingredient from the store. Portray
                the item this way in the item name. Any prep the ingredient
                needs before its initial use in the recipe can be provided in an
                ingredient modifier added when you add the ingredient to a
                particular recipe.`}
                  </p>
                  <p>
                    {`If you're buying a chicken breast from the store and then
                shredding it before you add it to your dip recipe, call the
                ingredient name "Chicken Breast" and add "Cooked and Shredded"
                as the modifier on the recipe. `}
                    <strong>{`Being specific with the ingredients here
                will help you combine ingredients from different recipes in 
                shopping lists (WIP).`}</strong>
                  </p>
                  <p>
                    {`If there's multiple items
                at the store that can be used in the recipe in question, you can
                create them as two specific ingredients and add both on the
                recipe, then mark them as interchangable (WIP) rather than
                creating one vague ingredient that covers both.`}
                  </p>
                </Offcanvas.Body>
              </Offcanvas>
              <Form.Control
                required
                className="mb-3"
                type="text"
                id="ingredientName"
                name="ingredientName"
                placeholder="..."
                value={ingredientName}
                onChange={(event) => setIngredientName(event.target.value)}
              />
              <Form.Label htmlFor="density">Density</Form.Label>&nbsp;
              <Form.Text>
                {`Optional - Used to convert volumetric to mass units for this
            particular ingredient. Enter the mass of 1 teaspoon in grams to
            enable conversion. (WIP)`}
              </Form.Text>
              <Form.Control
                className="mb-3"
                type="number"
                id="density"
                name="density"
                placeholder="..."
                value={density}
                onChange={(event) => setDensity(event.target.value)}
              />
              <ButtonGroup>
                <Button onClick={(event) => handleIngredientAdd(event)}>
                  Submit
                </Button>
                {ingredientID ? (
                  <Button
                    variant="danger"
                    onClick={() =>
                      handleDeleteIngredient(ingredientID, ingredientName)
                    }
                  >
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                ) : (
                  <></>
                )}
              </ButtonGroup>
            </Form.Group>
          </Form>
        </Col>
        <Col xs={12} md={6}>
          <ListGroup>
          <ListGroup.Item
              action
              variant="info"
              onClick={() => editNewIngredient()}
            >
              New Ingredient
            </ListGroup.Item>
            {ingredientList &&
              ingredientList.map((ingredient, index) => {
                return (
                  <ListGroup.Item
                    key={index}
                    action
                    variant="primary"
                    onClick={() => handleEditIngredient(ingredient._id)}
                  >
                    {ingredient.ingredientName.trim()}
                  </ListGroup.Item>
                );
              })}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
}
