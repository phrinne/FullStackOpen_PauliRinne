const calculateBmi = (height: number, mass: number): void => {
  const heightInMeters = height/100;
  const bmi = mass/(heightInMeters*heightInMeters);
  //console.log(bmi);
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

console.log(calculateBmi(180, 74));