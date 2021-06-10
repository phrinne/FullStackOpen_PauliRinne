//import calculateBmi from 'bmiCalculator'
const calculateBmi = (height: number, mass: number): string => {
  const heightInMeters = height/100;
  const bmi = mass/(heightInMeters*heightInMeters);
  if(bmi < 18.5)      return 'Underweight';
  else if(bmi <= 25)  return 'Normal (healthy weight)';
  else if(bmi <= 30)  return 'Overweight';
  else                return 'Obese';
};
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
    ratingDescription = 'you did it';
  }
  if(average >= 2*target) {
    rating = 3;
    ratingDescription = 'super';
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

import express from 'express';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if(isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "malformatted parameters" }).send();
  } else {
    res.json({ weight, height, bmi: calculateBmi(height, weight) });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  
  if(!daily_exercises || !target) {
    res.status(400).json({ error: "parameters missing" }).send();
  } else {
    const targetHours = Number(target);
    let notNumbers = isNaN(targetHours) && Array.isArray(daily_exercises);
    const diary = [];
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    for(let i = 0; i < daily_exercises.length; i++) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const entry = Number(daily_exercises[i]);
      if (isNaN(entry)) notNumbers = true;
      diary.push(entry);
    }

    if(notNumbers) {
      res.status(400).json({ error: "malformatted parameters" }).send();
    } else {
      res.json(calculateExercises(diary, targetHours));
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});