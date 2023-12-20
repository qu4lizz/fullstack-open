import { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR } from "../queries/queries";
import { useEffect } from "react";

const SetBirthyear = (props) => {
  const [born, setBorn] = useState("");

  const [changeAuthor, result] = useMutation(EDIT_AUTHOR);

  const updateAuthor = () => {
    const name = document.getElementById("select").value;
    changeAuthor({ variables: { name, setBornTo: Number(born) } });

    setBorn("");
  };

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      props.setError("person not found");
    }
  }, [result.data]);

  return (
    <div>
      <h3>Set birthyear</h3>
      <div>
        name
        <select id="select">
          {props.authors.map((a) => (
            <option key={a.name} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        born
        <input value={born} onChange={({ target }) => setBorn(target.value)} />
      </div>
      <div>
        <button onClick={updateAuthor}>Update author</button>
      </div>
    </div>
  );
};

export default SetBirthyear;
