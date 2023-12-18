export interface CalculationInput {
  target: number;
  time: number[];
}

export const parseArguments = (args: string[]): CalculationInput => {
  if (args.length < 4) {
    throw new Error('Not enough arguments');
  }

  const time: number[] = args.slice(3).map(Number);

  if (time.some(isNaN)) {
    throw new Error('Provided values were not numbers');
  }

  return {
    target: Number(args[2]),
    time: time,
  };
}

interface CalculationResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (target: number, time: number[]): CalculationResult => {
  const periodLength = time.length;

  const trainingDays = time.filter(hours => hours !== 0).length;

  const average = time.reduce((sum, hours) => sum + hours, 0) / periodLength;

  const success = average >= target;

  const calculateRating = (average: number, target: number): number => {
    if (average >= target) {
      return 3;
    } else if (average >= target * 0.9) {
      return 2;
    } else {
      return 1;
    }
  };

  const calculateRatingDescription = (rating: number): string => {
    if (rating === 1) {
      return 'More time exercising would do you good';
    } else if (rating === 2) {
      return 'Not too bad but could be better';
    } else {
      return 'Excellent!';
    }
  };

  const rating = calculateRating(average, target);
  const ratingDescription = calculateRatingDescription(rating);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}

try {
  const { target, time } = parseArguments(process.argv);
  const result = calculateExercises(target, time);
  console.log(result);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}