const volumetricUnits = {
  TEASPOON: { name: "teaspoon", abbreviation: "tsp" },
  TABLESPOON: { name: "tablespoon", abbreviation: "tbsp" },
  CUP: { name: "cup", abbreviation: "cup" },
  PINT: { name: "pint", abbreviation: "pint" },
  QUART: { name: "quart", abbreviation: "qt" },
  GALLON: { name: "gallon", abbreviation: "gal" },
  FLUIDOUNCE: { name: "fluid ounce", abbreviation: "floz" },
};

const weightUnits = {
	WEIGHTOUNCE: { name: "ounce", abbreviation: "oz" },
	POUND: { name: "pound", abbreviation: "lb" },
	GRAM: { name: "gram", abbreviation: "g" },
	KILOGRAM: { name: "kilogram", abbreviation: "kg" },
	MILLIGRAM: { name: "milligram", abbreviation: "mg" },
}

function convertVolumetricUnits(amount, inputUnit, outputUnit) {
  let input = "Unknown Input Unit";
	let output = "Unknown Output Unit"

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
      return output;
  }

  return `${amount} ${inputUnit} = ${output} ${outputUnit}`;
}

export { volumetricUnits, convertVolumetricUnits };
