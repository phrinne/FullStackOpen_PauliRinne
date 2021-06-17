import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField } from "../AddPatientModal/FormField";
import { HospitalEntry } from "../types";
import { useStateValue } from "../state";
import { DiagnosisSelection } from "../AddPatientModal/FormField";

type HospitalValuesMod = Omit<HospitalEntry, "id" | "type" | "discharge">;
export interface EntryForm1Values extends HospitalValuesMod {
  dischargeDate: string;
  dischargeCriteria: string;
}

interface Props {
  onSubmit: (values: EntryForm1Values) => void;
  onCancel: () => void;
}

export const AddEntryForm1 = ({ onSubmit, onCancel } : Props ) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        date: "",
        specialist: "",
        description: "",
        dischargeDate: "",
        dischargeCriteria: "",
        diagnosisCodes: []
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.dischargeDate) {
          errors.dischargeDate = requiredError;
        }
        if (!values.dischargeCriteria) {
          errors.dischargeCriteria = requiredError;
        }
        return errors;
      }}
    >
      {({ /*isValid,*/ dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              name="dischargeDate"
              component={TextField}
            />
            <Field
              label="Discharge criteria"
              placeholder="Discharge criteria"
              name="dischargeCriteria"
              component={TextField}
            />
            
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty /*|| !isValid*/}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm1;