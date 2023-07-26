const Person = ({person, del}) => (
    <div>
        {person.name} {person.number} <button onClick={() => del(person.id)}>delete</button>
    </div>
)

export default Person