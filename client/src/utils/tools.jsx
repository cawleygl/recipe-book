const volumetricUnits = {
  WHOLE: { code: "whole", name: "", abbreviation: "" },
  TEASPOON: { code: "teaspoon", name: "teaspoon", abbreviation: "tsp" },
  TABLESPOON: { code: "tablespoon", name: "tablespoon", abbreviation: "tbsp" },
  FLUIDOUNCE: { code: "fluid ounce", name: "ounce", abbreviation: "oz fl" },
  CUP: { code: "cup", name: "cup", abbreviation: "cup" },
  PINT: { code: "pint", name: "pint", abbreviation: "pint" },
  QUART: { code: "quart", name: "quart", abbreviation: "qt" },
  GALLON: { code: "gallon", name: "gallon", abbreviation: "gal" },
};

// const weightUnits = {
// 	WEIGHTOUNCE: { name: "ounce", abbreviation: "wt oz" },
// 	POUND: { name: "pound", abbreviation: "lb" },
// 	GRAM: { name: "gram", abbreviation: "g" },
// 	KILOGRAM: { name: "kilogram", abbreviation: "kg" },
// 	MILLIGRAM: { name: "milligram", abbreviation: "mg" },
// }

function formatUnitName(code, amount) {
  const name = Object.values(volumetricUnits).find((unit) => unit.code === code).name;
  if (amount == 1 || code === "whole") return name;
  else return name + "s";
}

function formatIngredientName(ingredientName, amount, unit) {
  if (unit === "whole" && amount > 1) return ingredientName + "s";
  else return ingredientName;
}

function convertVolumetricUnits(amount, inputUnit, outputUnit) {
  let input = "Unknown Input Unit";
  let output = "Unknown Output Unit";

  switch (inputUnit) {
    case volumetricUnits.TEASPOON.name:
      input = amount;
      break;
    case volumetricUnits.TABLESPOON.name:
      input = amount * 3;
      break;
    case volumetricUnits.FLUIDOUNCE.name:
      input = amount * 6;
      break;
    case volumetricUnits.CUP.name:
      input = amount * 48;
      break;
    case volumetricUnits.PINT.name:
      input = amount * 96;
      break;
    case volumetricUnits.QUART.name:
      input = amount * 192;
      break;
    case volumetricUnits.GALLON.name:
      input = amount * 768;
      break;
    default:
      return input;
  }

  switch (outputUnit) {
    case volumetricUnits.TEASPOON.name:
      output = input;
      break;
    case volumetricUnits.TABLESPOON.name:
      output = input / 3;
      break;
    case volumetricUnits.FLUIDOUNCE.name:
      output = input / 6;
      break;
    case volumetricUnits.CUP.name:
      output = input / 48;
      break;
    case volumetricUnits.PINT.name:
      output = input / 96;
      break;
    case volumetricUnits.QUART.name:
      output = input / 192;
      break;
    case volumetricUnits.GALLON.name:
      output = input / 768;
      break;
    default:
  }
  return output;
}

export { volumetricUnits, convertVolumetricUnits, formatUnitName, formatIngredientName };
