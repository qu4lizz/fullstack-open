export interface CalculationInput {
  value1: number;
  value2: number;
}

export const parseArguments = (args: string[]): CalculationInput => {
  if (args.length < 4)
    throw new Error('Not enough arguments');
  if (args.length > 4)
    throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

enum BmiCategory {
  UnderweightSevere = 'Underweight (Severe thinness)', // <16
  UnderweightModerate = 'Underweight (Moderate thinness)', // <16.9
  UnderweightMild = 'Underweight (Mild thinness)', // <18.4
  NormalWeight = 'Normal range', // <24.9
  Overweight = 'Overweight', // <29.9
  ObesityI = 'Obese (class I)', // <34.9
  ObesityII = 'Obese (class II)', // <39.9
  ObesityIII = 'Obese (class II)' // >40
}

export const calculateBmi = (heightInCm: number, weight: number): string => {
  if(heightInCm <= 0 || weight <= 0){
    throw new Error('weight or height cannot be zero.')
  }
  const heightInMeters = heightInCm / 100;
  const bmi = weight / Math.pow(heightInMeters, 2);

  if (bmi < 16)
    return BmiCategory.UnderweightSevere;
  else if (bmi < 16.9)
    return BmiCategory.UnderweightModerate;
  else if (bmi < 18.4)
    return BmiCategory.UnderweightMild
  else if (bmi < 24.9)
    return BmiCategory.NormalWeight
  else if (bmi < 29.9)
    return BmiCategory.Overweight
  else if (bmi < 34.9)
    return BmiCategory.ObesityI
  else if (bmi < 39.9)
    return BmiCategory.ObesityII
  else
    return BmiCategory.ObesityIII
}

const main = () => {
  try {
    const { value1, value2 } = parseArguments(process.argv)
    console.log(calculateBmi(value1, value2));
  }
  catch (error: unknown) {
    let errorMessage = 'Something bad happend.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage)
  }
}

main();
