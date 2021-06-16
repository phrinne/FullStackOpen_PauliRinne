import diagnoseEntries from '../../data/diagnoses';
import { Diagnosis } from '../types';
//const diagnoses: Array<DiagnoseEntry> = diagnoseData as Array<DiagnoseEntry>;

const getEntries = (): Array<Diagnosis> => {
  return diagnoseEntries;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};