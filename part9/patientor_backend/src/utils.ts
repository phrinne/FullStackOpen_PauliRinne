import { PatientEntry, Gender } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseString = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name, ssn or occupation');
  }

  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
      throw new Error('Incorrect or missing date: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender /*|| !isString(gender)*/ || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

type Fields = { name : unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const toPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation } : Fields): PatientEntry => {
  const newEntry: PatientEntry = {
    name: parseString(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation)
  };

  return newEntry;
};

export default toPatientEntry;