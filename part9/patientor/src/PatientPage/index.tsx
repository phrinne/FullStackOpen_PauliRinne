import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Gender, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { Header/*, Icon*/ } from "semantic-ui-react";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const patient: Patient = patients[id];
  
  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        console.log("PATIENT FETCHED", patientFromApi);
        dispatch({ type: "UPDATE_PATIENT", payload: patientFromApi });
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
    </>
  );
};

export default PatientPage;