//If you would call the function with parameters [3, 0, 2, 4.5, 0, 3, 1] and 2 it could return
/*{ periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.9285714285714286 }*/

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours:Array<number>, target: number): Result => {
  const periodLength = hours.length;
  const trainingDays = hours.filter(h => h !== 0).length;
  const average = hours.reduce((a, b) => a + b) / periodLength;
  const success = average >= target;
  let rating = 1;
  let ratingDescription = 'bad';
  if(success) {
    rating = 2;
    ratingDescription = 'you did it'
  }
  if(average >= 2*target) {
    rating = 3;
    ratingDescription = 'super'
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

//const diary = [3, 0, 2, 4.5, 0, 3, 1];
//const targetHours = 2;
//console.log(calculateExercises(diary, targetHours));

try {
  if (process.argv.length < 4) throw new Error('Not enough arguments');
  const targetHours = Number(process.argv[2]);
  if (isNaN(targetHours)) throw new Error('Target value is not a number');
  const diary = [];
  for(let i = 3; i < process.argv.length; i++) {
    const entry = Number(process.argv[i]);
    if (isNaN(entry)) throw new Error('All entries are not numbers');
    diary.push(entry)
  }
  console.log(calculateExercises(diary, targetHours));
} catch (e) {
  console.log(e.message);
}