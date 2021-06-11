import patientEntries from '../../data/patients';
import { Patient, NonSensitivePatient, PatientEntry } from '../types';
import {v1 as uuid} from 'uuid';

const getEntries = (): Array<NonSensitivePatient> => {
  return patientEntries.map(({ id, name, dateOfBirth, gender, occupation }) => (
    {
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }
  ));
};

const addEntry = (entry: PatientEntry): Patient => {
  const newPatient: Patient = { id: uuid(), ...entry };
  patientEntries.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  addEntry
};