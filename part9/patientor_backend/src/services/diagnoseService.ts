import diagnoseEntries from '../../data/diagnoses';
import { Diagnose } from '../types';
//const diagnoses: Array<DiagnoseEntry> = diagnoseData as Array<DiagnoseEntry>;

const getEntries = (): Array<Diagnose> => {
  return diagnoseEntries;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};