import patientEntries from '../../data/patients';
import { Patient, NonSensitivePatient, PatientEntry, Entry, NewEntry } from '../types';
import {v1 as uuid} from 'uuid';

const getEntries = (): Array<NonSensitivePatient> => {
  return patientEntries.map(({ id, name, dateOfBirth, gender, occupation, entries }) => (
    {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries
    }
  ));
};

const findById = (id: string): Patient | undefined => {
  const patient = patientEntries.find(p => p.id === id);
  return patient;
};

const addPatient = (entry: PatientEntry): Patient => {
  const newPatient: Patient = { id: uuid(), ...entry };
  patientEntries.push(newPatient);
  return newPatient;
};

const addEntry = (patient: Patient, entry: NewEntry): Patient => {
  const entryObject: Entry = { id: uuid(), ...entry };
  patient.entries = [...patient.entries, entryObject];
  return patient;
};

export default {
  getEntries,
  findById,
  addPatient,
  addEntry
};