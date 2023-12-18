import { useEffect, useState } from "react";
import { Diagnosis, Entry, HealthCheckRating, Patient } from "../types";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkIcon from "@mui/icons-material/Work";

interface Props {
  diagnoses: Diagnosis[];
}

const HealthRating = (health: HealthCheckRating) => {
  switch (health) {
    case 0:
      return <FavoriteIcon sx={{ color: "green" }} />;
    case 1:
      return <FavoriteIcon sx={{ color: "yellow" }} />;
    case 2:
      return <FavoriteIcon sx={{ color: "blue" }} />;
    case 3:
      return <FavoriteIcon sx={{ color: "green" }} />;
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <div>{HealthRating(entry.healthCheckRating)}</div>;
    case "Hospital":
      return (
        <div>
          <p>Discharge date: {entry.discharge.date}</p>
          <ul>
            <li>
              criteria: <i>{entry.discharge.criteria}</i>
            </li>
          </ul>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          {entry.sickLeave ? (
            <p>
              SICK LEAVE: {entry.sickLeave.startDate} -{" "}
              {entry.sickLeave.endDate}
            </p>
          ) : null}
        </div>
      );
    default:
      return assertNever(entry);
  }
};

const SinglePatientPage = ({ diagnoses }: Props) => {
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
      <div>entries</div>
      <div>
        {patient?.entries.map((e) => {
          return (
            <div key={e.id}>
              <div
                style={{
                  border: "1px solid grey",
                  borderRadius: 4,
                  padding: 2,
                  margin: 1,
                }}
              >
                <p>{e.date}</p>
                {e.type === "OccupationalHealthcare" ? (
                  e.employerName ? (
                    <p>
                      <WorkIcon /> {e.employerName}
                    </p>
                  ) : (
                    <WorkIcon />
                  )
                ) : (
                  <MedicalServicesIcon />
                )}
                <p>
                  <i>{e.description}</i>
                </p>
                <ul>
                  {e.diagnosisCodes?.map((d) => {
                    const diagnosis = diagnoses.find(
                      (diagnose) => diagnose.code === d
                    )?.name;
                    return (
                      <li key={d}>
                        {d} {diagnosis ? diagnosis : null}
                      </li>
                    );
                  })}
                </ul>
                <EntryDetails entry={e} />
                <p>diagnose by {e.specialist}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SinglePatientPage;
