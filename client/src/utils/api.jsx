export async function getRecipes() {
  const response = await fetch(`http://localhost:5050/recipes/`);
  if (!response.ok) {
    const message = `An error has occurred: ${response.statusText}`;
    console.error(message);
    return;
  }
  const recipes = await response.json();
  return recipes;
}

export async function getOneRecipe(recipeID) {
  if (!recipeID) return;

  const response = await fetch(
    `http://localhost:5050/recipes/${recipeID.toString()}`
  );
  if (!response.ok) {
    const message = `An error has occurred: ${response.statusText}`;
    console.error(message);
    return;
  }
  const results = await response.json();
  return results;
}

export async function addRecipe(event, recipeBody, setPageAlert, navigate) {
  event.preventDefault()
  try {
    const response = await fetch("http://localhost:5050/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeBody),
    });
    if (response.status === 200) {
      const [ recipe, direction, callsFor ] =  await response.json();
      const recipeID = recipe._id;
      // TODO: CHECK RETURNS TO MAKE SURE EVERYTHING GOES THROUHG
      console.log("Create Return", recipe, direction, callsFor);
      setPageAlert({variant: "success", message: "Recipe Successfully Added", show: true});
      navigate("/recipes/" + recipeID);
      return { response: response };
    }
    if (response.status === 403) {
      const { error }  = await response.json();
      setPageAlert({variant: "danger", message: error, show: true});
    }
  } catch (error) {
    const message = `An error has occurred: ${error}`;
    console.error(message);
  }
}

export async function editRecipe(recipeID, recipeBody) {
  try {
    const response = await fetch(
      `http://localhost:5050/recipes/${recipeID.toString()}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeBody),
      }
    );

    return { response: response, json: await response.json() };
  } catch (error) {
    const message = `An error has occurred: ${error}`;
    console.error(message);
  }
}

export async function deleteRecipe(recipeID) {
  if (!recipeID) return;

  try {
    const response = await fetch(
      `http://localhost:5050/recipes/${recipeID.toString()}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return { response: response, json: await response.json() };
  } catch (error) {
    const message = `An error has occurred: ${error}`;
    console.error(message);
  }
}

export async function getIngredients() {
  const response = await fetch(`http://localhost:5050/ingredients/`);
  if (!response.ok) {
    const message = `An error has occurred: ${response.statusText}`;
    console.error(message);
    return;
  }
  const ingredients = await response.json();
  return ingredients;
}

export async function addIngredient(ingredientBody) {
  try {
    const response = await fetch("http://localhost:5050/ingredients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ingredientBody),
    });
    return { response: response, json: await response.json() };
  } catch (error) {
    const message = `An error has occurred: ${error}`;
    console.error(message);
  }
}

export async function editIngredient(ingredientID, ingredientBody) {
  try {
    const response = await fetch(
      `http://localhost:5050/ingredients/${ingredientID.toString()}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ingredientBody),
      }
    );

    return { response: response, json: await response.json() };
  } catch (error) {
    const message = `An error has occurred: ${error}`;
    console.error(message);
  }
}

export async function deleteIngredient(ingredientID) {
  if (!ingredientID) return;

  try {
    const response = await fetch(
      `http://localhost:5050/ingredients/${ingredientID.toString()}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return { response: response, json: await response.json() };
  } catch (error) {
    const message = `An error has occurred: ${error}`;
    console.error(message);
  }
}

export async function addDirection(recipeID, index, instruction) {
  try {
    const reqBody = {
      recipe: recipeID,
      index: index,
      instruction: instruction,
    };
    const response = await fetch(
      `http://localhost:5050/recipes/${recipeID.toString()}/directions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      }
    );

    return { response: response, json: await response.json() };
  } catch (error) {
    const message = `An error has occurred: ${error}`;
    console.error(message);
  }
}

export async function editDirection(recipeID, directionID, index, instruction) {
  try {
    const reqBody = {
      index: index,
      instruction: instruction,
    };
    const response = await fetch(
      `http://localhost:5050/recipes/${recipeID.toString()}/directions/${directionID.toString()}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      }
    );

    return { response: response, json: await response.json() };
  } catch (error) {
    const message = `An error has occurred: ${error}`;
    console.error(message);
  }
}

export async function deleteDirection(recipeID, directionID) {
  try {
    const response = await fetch(
      `http://localhost:5050/recipes/${recipeID.toString()}/directions/${directionID.toString()}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return { response: response, json: await response.json() };
  } catch (error) {
    const message = `An error has occurred: ${error}`;
    console.error(message);
  }
}

export async function getAllDirectionsOnRecipe(recipeID) {
  if (!recipeID) return;

  const response = await fetch(
    `http://localhost:5050/recipes/${recipeID.toString()}/directions`
  );
  if (!response.ok) {
    const message = `An error has occurred: ${response.statusText}`;
    console.error(message);
    return;
  }
  const results = await response.json();
  return results;
}

export async function addCallsFor(recipeID, ingredientID, amount, modifier) {
  const reqBody = {
    recipe: recipeID,
    ingredient: ingredientID,
    amount: amount,
    modifier: modifier,
  };
  const response = await fetch(
    `http://localhost:5050/recipes/${recipeID.toString()}/callsFor`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    }
  );
  if (!response.ok) {
    const message = `An error has occurred: ${response.statusText}`;
    console.error(message);
    return;
  }
  const fetchResponse = await response.json();
  return fetchResponse;
}

export async function editCallsFor(recipeID, callsForID, amount, modifier) {
  try {
    const reqBody = {
      amount: amount,
      modifier: modifier,
    };
    const response = await fetch(
      `http://localhost:5050/recipes/${recipeID.toString()}/callsFor/${callsForID.toString()}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      }
    );

    return { response: response, json: await response.json() };
  } catch (error) {
    const message = `An error has occurred: ${error}`;
    console.error(message);
  }
}

export async function deleteCallsFor(recipeID, callsForID) {
  try {
    const response = await fetch(
      `http://localhost:5050/recipes/${recipeID.toString()}/callsFor/${callsForID.toString()}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return { response: response, json: await response.json() };
  } catch (error) {
    const message = `An error has occurred: ${error}`;
    console.error(message);
  }
}

export async function getAllIngredientsOnRecipe(recipeID) {
  if (!recipeID) return;

  const response = await fetch(
    `http://localhost:5050/recipes/${recipeID.toString()}/callsFor`
  );
  if (!response.ok) {
    const message = `An error has occurred: ${response.statusText}`;
    console.error(message);
    return;
  }
  const results = await response.json();
  return results;
}
