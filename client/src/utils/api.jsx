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

export async function getOneRecipe(id) {
  if (!id) return;

  const response = await fetch(
    `http://localhost:5050/recipes/${id.toString()}`
  );
  if (!response.ok) {
    const message = `An error has occurred: ${response.statusText}`;
    console.error(message);
    return;
  }
  const results = await response.json();
  return results;
}

export async function addRecipe(dishName, description) {
  const sampleData = {
    dishName: dishName,
    description: description,
  };
  const response = await fetch("http://localhost:5050/recipes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sampleData),
  });
  if (!response.ok) {
    const message = `An error has occurred: ${response.statusText}`;
    console.error(message);
    return;
  }
  const fetchResponse = await response.json();
  return fetchResponse;
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

export async function addIngredient(ingredientName) {
  const sampleData = {
    ingredientName: ingredientName,
  };
  const response = await fetch("http://localhost:5050/ingredients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sampleData),
  });
  if (!response.ok) {
    const message = `An error has occurred: ${response.statusText}`;
    console.error(message);
    return;
  }
  const fetchResponse = await response.json();
  return fetchResponse;
}

export async function addCallsFor(recipeID, ingredientID, amount, modifier) {
  const reqBody = {
    recipe: recipeID,
    ingredient: ingredientID,
    amount: amount,
    modifier: modifier,
  };
  const response = await fetch("http://localhost:5050/callsFor", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  });
  if (!response.ok) {
    const message = `An error has occurred: ${response.statusText}`;
    console.error(message);
    return;
  }
  const fetchResponse = await response.json();
  return fetchResponse;
}

export async function addDirection(recipeID, index, instruction) {
  try {
    const reqBody = {
      recipe: recipeID,
      index: index,
      instruction: instruction,
    };
    const response = await fetch(`http://localhost:5050/recipes/${recipeID.toString()}/directions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });

		return {response: response, json: await response.json()};

  } catch (error) {
    const message = `An error has occurred: ${error}`;
    console.error(message);
  } 
}

export async function editDirection(recipeID, directionID, index, instruction) {
  try {
    const reqBody = {
      index: index,
      instruction: instruction
    };
    const response = await fetch(`http://localhost:5050/recipes/${recipeID.toString()}/directions/${directionID.toString()}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });

		return {response: response, json: await response.json()};

  } catch (error) {
    const message = `An error has occurred: ${error}`;
    console.error(message);
  } 
}

export async function deleteDirection(recipeID, directionID) {
  try {
    const response = await fetch(`http://localhost:5050/recipes/${recipeID.toString()}/directions/${directionID.toString()}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });

		return {response: response, json: await response.json()};

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