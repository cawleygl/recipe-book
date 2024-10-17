import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Recipe() {
  const [form, setForm] = useState({
    dishName: "",
    description: "",
    directions: [""],
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      setIsNew(false);
      const response = await fetch(
        `http://localhost:5050/recipes/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const recipe = await response.json();
      if (!recipe) {
        console.warn(`Recipe with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(recipe);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    const person = { ...form };
		console.log(person);

		// Remove blank direction from end of directions array
		if (person.directions && person.directions[person.directions.length - 1] == "") {
			person.directions.pop();
		}

    try {
      let response;
      if (isNew) {
        // if we are adding a new recipe we will POST to /recipe.
        response = await fetch("http://localhost:5050/recipes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      } else {
        // if we are updating a recipe we will PUT to /recipe/:id.
        response = await fetch(`http://localhost:5050/recipes/${params.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("A problem occurred with your fetch operation: ", error);
    } finally {
      setForm({ dishName: "", description: "", directions: [""] });
      navigate("/");
    }
  }

  // This following section will display the form that takes the input from the user.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Create/Update Recipe</h3>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Employee Info
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
            <div className="sm:col-span-4">
              <label
                htmlFor="dishName"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Dish
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="dishName"
                    id="name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Cereal"
                    value={form.dishName}
                    onChange={(e) => updateForm({ dishName: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Description
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="description"
                    id="description"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="A decadent milk reduction over gourmet puffed rice..."
                    value={form.description}
                    onChange={(e) =>
                      updateForm({ description: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="directions"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Directions
              </label>
              <div className="mt-2">
                {form.directions.map(function (data, index) {
                  return (
                    <div
                      key={index}
                      className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                    >
                      <div className="p-2 text-sm font-medium leading-6 text-slate-900">Step {index + 1}:</div>
                      <input
                        type="text"
                        name="directions"
                        id="directions"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder={index == 0 ? "Add wet ingredients to dry and combine to taste" : "..."}
                        value={form.directions[index]}
                        onChange={(e) => {
                          let newDirections = [...form.directions];
                          newDirections[index] = e.target.value;
                          console.log("index", index);
                          // Remove last blank direction field if last two direction fields are blank
                          //(Removes excessive blank fields)
                          if (
                            newDirections[newDirections.length - 1] == "" &&
                            newDirections[newDirections.length - 2] == ""
                          ) {
                            newDirections.pop();
                          }
                          // Add new blank direction field if the last direction is not blank
                          //(Adds new direction field when needed)
                          else if (
                            newDirections[newDirections.length - 1] != ""
                          ) {
                            newDirections.push("");
                          }
                          updateForm({ directions: newDirections });
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Save Recipe"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </>
  );
}
