const calculateBmi = (height: number, mass: number): void => {
  const heightInMeters = height/100;
  const bmi = mass/(heightInMeters*heightInMeters);
  //console.log(height, mass, bmi);
  //underweight (under 18.5 kg/m2), normal weight (18.5 to 25), overweight (25 to 30), and obese (over 30)
  if(bmi < 18.5) {
    console.log('Underweight');
  } else if(bmi <= 25) {
    console.log('Normal (healthy weight)');
  } else if(bmi <= 30) {
    console.log('Overweight');
  } else {
    console.log('Obese');
  }
}

try {
  if (process.argv.length < 4) throw new Error('Not enough arguments');
  if (process.argv.length > 4) throw new Error('Too many arguments');
  const arg1 = Number(process.argv[2]);
  const arg2 = Number(process.argv[3]);
  if (!isNaN(arg1) && !isNaN(arg2)) {
    console.log(calculateBmi(arg1, arg2));
  } else {
    throw new Error('Provided values were not numbers!');
  }
} catch (e) {
  console.log(e.message);
}

export default calculateBmi;