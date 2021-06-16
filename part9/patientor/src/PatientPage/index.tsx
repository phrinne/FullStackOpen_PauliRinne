import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStateValue, updatePatient } from "../state";
import { Gender, Patient, Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry, HealthCheckRating } from "../types";
import { apiBaseUrl } from "../constants";
import { Header, Card } from "semantic-ui-react";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const style = {padding: '1rem', width: 'auto'};
  /*return (
    <div key={entry.id}>{entry.date} <i>{entry.description}</i>
    <ul>
      {entry.diagnosisCodes?.map(d => <li key={d}>{d} {diagnoses[d].name}</li>)}
    </ul>
  </div>
  );*/

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

  if(!patient) return null;

  let iconName = patient.gender === Gender.Male?'mars':'venus';
  if(patient.gender === Gender.Other) iconName = 'genderless';

  return (
    <>
    <Header as="h2">{patient.name}<i className={`${iconName} icon`}></i></Header>
    <div>ssn: {patient.ssn}</div>
    <div>occupation: {patient.occupation}</div>
    <Header as="h3">Entries</Header>
    {patient.entries.map(e => <EntryDetails key={e.id} entry={e} />)}
    </>
  );
};

export default PatientPage;