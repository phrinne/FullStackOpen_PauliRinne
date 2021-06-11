import express from 'express';
import patientService from '../services/patientService';
import { PatientEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

router.post('/', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { name, dateOfBirth, ssn, gender, occupation  } = req.body;
  const entry: PatientEntry = {
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  };
  const newPatient = patientService.addEntry(entry);
  res.json(newPatient);
});

export default router;