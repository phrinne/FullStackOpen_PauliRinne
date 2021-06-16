import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStateValue, updatePatient } from "../state";
import { Gender, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { Header} from "semantic-ui-react";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients, diagnoses }, dispatch] = useStateValue();
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
    {patient.entries.map(e => 
      <div key={e.id}>{e.date} <i>{e.description}</i>
        <ul>
          {e.diagnosisCodes?.map(d => <li key={d}>{d} {diagnoses[d].name}</li>)}
        </ul>
      </div>
    )}
    </>
  );
};

export default PatientPage;