import { PatientEntry, Gender, NewEntry, HealthCheckRating, Diagnosis, BaseEntryWithoutId } from './types';

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
    throw new Error('Incorrect or missing value that is supposed to be string (name, ssn, etc)');
  }

  return name;
};

const parseDate = (dateOfBirth: unknown): string => {
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
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries: []
  };

  return newEntry;
};

export default toPatientEntry;

/*
XXX
XXX
XXX
*/
const parseDiagnoses = (diagnoses: unknown): Array<Diagnosis['code']> | null => {
  if (!diagnoses || !Array.isArray(diagnoses)) {
      return null;
  }
  for(let i = 0; i < diagnoses.length; i++) {
    if(!isString(diagnoses[i])) {
      throw new Error('Weird stuff in diagnoses');
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return diagnoses;
};

type DischargeFields = { date: unknown, criteria: unknown };
const parseDischarge = (discharge: unknown): { date: string, criteria: string } => {
  if (!discharge || !(discharge instanceof Object) ) {
    throw new Error('Incorrect or missing discharge: ' + discharge);
  }
  return parseDischargeCotents(discharge as DischargeFields);
};
const parseDischargeCotents = ({ date, criteria }: DischargeFields): { date: string, criteria: string } => {
  if(!date || !criteria || !isString(date) || !isString(criteria)) {
    throw new Error('Incorrect or missing discharge: ' + date + criteria);
  }
  return { date, criteria };
};

type SickleaveFields = { startDate: unknown, endDate: unknown };
const parseSickleave = (sickLeave: unknown) => {
  if (!sickLeave) {
    return null;
  }
  if (!(sickLeave instanceof Object)) {
    throw new Error('Sick leave is not an object');
  }
  return parseSickleaveCotents(sickLeave as SickleaveFields);
};
const parseSickleaveCotents = ({ startDate, endDate }: SickleaveFields): { startDate: string, endDate: string } | null => {
  if(!startDate || !endDate || !isString(startDate) || !isString(endDate)) {
    //throw new Error('Incorrect or missing sick leave: ' + startDate + endDate);
    return null;
  }
  if(!startDate.length || !endDate.length) {
    return null;
  }
  return { startDate, endDate };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthcheckType = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};
const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!healthCheckRating || !isHealthcheckType(healthCheckRating)) {
      throw new Error('Incorrect or missing health check rating: ' + healthCheckRating);
  }
  return healthCheckRating;
};

type EntryFields = { type: unknown, description: unknown, date: unknown, specialist: unknown, diagnosisCodes: unknown, discharge: unknown, employerName: unknown, sickLeave: unknown, healthCheckRating: unknown };

export const toNewEntry = ({ type, description, date, specialist, diagnosisCodes, discharge, employerName, sickLeave, healthCheckRating } : EntryFields): NewEntry => {
  const parsedType = parseString(type);
  const parsedDate = parseDate(date);
  const parsedSpecialist = parseString(specialist);
  const parsedDescription = parseString(description);
  const parsedDiagnoses = parseDiagnoses(diagnosisCodes);

  const baseEntry: BaseEntryWithoutId = {
    date: parsedDate,
    specialist: parsedSpecialist,
    description: parsedDescription
  };
  if (parsedDiagnoses) baseEntry.diagnosisCodes = parsedDiagnoses;

  switch(parsedType) {
    case 'Hospital': 
      return {
        ...baseEntry,
        type: 'Hospital',
        discharge: parseDischarge(discharge)
      };
    case 'OccupationalHealthcare': {
      const parsedSickleave = parseSickleave(sickLeave);
      if(parsedSickleave) {
        return {
          ...baseEntry,
          type: 'OccupationalHealthcare',
          employerName: parseString(employerName),
          sickLeave: parsedSickleave
        };
      } else {
        return {
          ...baseEntry,
          type: 'OccupationalHealthcare',
          employerName: parseString(employerName)
        };
      }
    }
    case 'HealthCheck':
      return {
        ...baseEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(healthCheckRating)
      };
    default: throw new Error('Nonexisting type of entry, got: ' + parsedType);
  }
};