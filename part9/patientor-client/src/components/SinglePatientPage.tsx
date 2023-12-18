import { useEffect, useState } from "react";
import { Patient } from "../types";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";

const SinglePatientPage = () => {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);

  const { id } = useParams();

  useEffect(() => {
    id &&
      patientService.getById(id).then((res) => {
        setPatient(res);
      });
  }, [id]);

  return (
    <div>
      <div style={{ fontWeight: "bold", fontSize: "40px" }}>
        {patient?.name} ({patient?.gender})
      </div>
      <div>ssh: {patient?.ssn}</div>
      <div>occupation: {patient?.occupation}</div>
    </div>
  );
};

export default SinglePatientPage;
