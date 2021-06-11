import express from 'express';
import patientService from '../services/patientService';
import { PatientEntry } from '../types';
import toPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

router.post('/', (req, res) => {
  try {
    const entry: PatientEntry = toPatientEntry(req.body);

    const newPatient = patientService.addEntry(entry);
    res.json(newPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;