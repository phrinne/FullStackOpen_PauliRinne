import express from 'express';
import patientService from '../services/patientService';
import { PatientEntry, NewEntry } from '../types';
import toPatientEntry, { toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const patient: PatientEntry = toPatientEntry(req.body);

    const newPatient = patientService.addPatient(patient);
    res.json(newPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//our backend should support all those types and check that at least all required fields are given for each type
router.post('/:id/entries', (req, res) => {
  try {
    const patient = patientService.findById(req.params.id);
    if (!patient) {
      res.sendStatus(404);
      return;
    }
    const entry: NewEntry = toNewEntry(req.body);
    const modifiedPatient = patientService.addEntry(patient, entry);
    res.json(modifiedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;