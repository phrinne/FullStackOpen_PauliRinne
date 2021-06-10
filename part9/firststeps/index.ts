import express from 'express';
//import calculateBmi from 'bmiCalculator'

const calculateBmi = (height: number, mass: number): string => {
  const heightInMeters = height/100;
  const bmi = mass/(heightInMeters*heightInMeters);
  if(bmi < 18.5)      return 'Underweight';
  else if(bmi <= 25)  return 'Normal (healthy weight)';
  else if(bmi <= 30)  return 'Overweight';
  else                return 'Obese';
}

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  //For example to get bmi for a person having height 180 and weight 72, the url is http://localhost:3002/bmi?height=180&weight=72
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if(isNaN(height) || isNaN(weight)) {
    res
      .status(400)
      .json({ error: "malformatted parameters" })
      .send();
  } else {
    res.json({ weight, height, bmi: calculateBmi(height, weight) })
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});