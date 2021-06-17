import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStateValue, updatePatient } from "../state";
import { Gender, Patient, Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry, HealthCheckRating } from "../types";
import { apiBaseUrl } from "../constants";
import { Header, Card, Button } from "semantic-ui-react";

import AddEntryModal1 from "../AddEntryModal1";
import { EntryForm1Values } from '../AddEntryModal1/AddEntryForm1';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const style = {padding: '1rem', width: 'auto'};

const HospitalEntryDetails = ({ entry }: {entry: HospitalEntry }) => {
  return (
    <Card style={style}>
      <Header as="h3">{entry.date}<i className='hospital icon'></i></Header>
      <p>{entry.description}</p>
      <p>Discharge: {entry.discharge.criteria}</p>
    </Card>
  );
};

const OccupationalEntryDetails = ({ entry }: {entry: OccupationalHealthcareEntry }) => {
  return (
    <Card style={style}>
      <Header as="h3">{entry.date}<i className='stethoscope icon'></i>{entry.employerName}</Header>
      <p>{entry.description}</p>
    </Card>
  );
};

const HealthCheckEntryDetails = ({ entry }: {entry: HealthCheckEntry }) => {
  let iconColor;
  switch(entry.healthCheckRating) {
    case HealthCheckRating.Healthy: iconColor = 'green'; break;
    case HealthCheckRating.LowRisk: iconColor = 'yellow'; break;
    case HealthCheckRating.HighRisk: iconColor = 'red'; break;
    case HealthCheckRating.CriticalRisk: iconColor = 'purple'; break;
    default: iconColor = 'black';
  }
  const iconStyle = { color: `${iconColor}` };

  return (
    <Card style={style}>
      <Header as="h3">{entry.date}<i className='user md icon'></i></Header>
      <p>{entry.description}</p>
      <i className='heart icon' style={iconStyle}></i>
    </Card>
  );
};

const EntryDetails = ({ entry }: {entry: Entry }) => {
  //const [{ diagnoses }] = useStateValue();
  switch (entry.type) {
    case 'Hospital':                return <HospitalEntryDetails entry={entry} />;
    case 'OccupationalHealthcare':  return <OccupationalEntryDetails entry={entry} />;
    case 'HealthCheck':             return <HealthCheckEntryDetails entry={entry} />;
    default:                        return  assertNever(entry);
  }
};

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const patient: Patient = patients[id];

  const [modal1Open, setModal1Open] = React.useState<boolean>(false);
  const [/*modal2Open*/, setModal2Open] = React.useState<boolean>(false);
  const [/*modal3Open*/, setModal3Open] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  
  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch(updatePatient(patientFromApi));
      } catch (e) {
        console.error("ERRORR", e);
      }
    };
    if(!patient || !patient.ssn) void fetchPatient();
  }, []);

  const openModal1 = (): void => setModal1Open(true);
  const closeModal1 = (): void => {
    setModal1Open(false);
    setError(undefined);
  };

  if(!patient) return null;

  const submitNewEntry1 = async (values: EntryForm1Values) => {
    try {
      const adjustedValues = {
        ...values, 
        type: "Hospital",
        discharge: {
          date: values.dischargeDate,
          criteria: values.dischargeCriteria
        }
      };
      const { data: returnedPatient } = await axios.post<Patient>(`${apiBaseUrl}/patients/${patient.id}/entries`, adjustedValues );
      dispatch(updatePatient(returnedPatient));
      closeModal1();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data || 'Unknown error');
    }
  };

  let iconName = patient.gender === Gender.Male?'mars':'venus';
  if(patient.gender === Gender.Other) iconName = 'genderless';

  return (
    <>
    <Header as="h2">{patient.name}<i className={`${iconName} icon`}></i></Header>
    <div>ssn: {patient.ssn}</div>
    <div>occupation: {patient.occupation}</div>
    <Header as="h3">Entries</Header>

    <Button onClick={openModal1}>Hospital Entry</Button>
    <Button onClick={() => setModal2Open(true)}>Occupational Entry</Button>
    <Button onClick={() => setModal3Open(true)}>Health Check Entry</Button>
    
    {patient.entries.map(e => <EntryDetails key={e.id} entry={e} />)}

    <AddEntryModal1 modalOpen={modal1Open} onSubmit={submitNewEntry1} error={error} onClose={closeModal1} />
    </>
  );
};

export default PatientPage;

/*
    <AddPatientModal modalOpen={modal2Open} onSubmit={submitNewEntry2} error={error2} onClose={() => setModal2Open(false)} />
    <AddPatientModal modalOpen={modal3Open} onSubmit={submitNewEntry3} error={error3} onClose={() => setModal3Open(false)} />*/