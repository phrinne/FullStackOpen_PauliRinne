import patientEntries from '../../data/patients';
import { /*Patient,*/ NonSensitivePatient } from '../types';

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

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};