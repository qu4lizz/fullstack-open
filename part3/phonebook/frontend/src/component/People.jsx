import Person from './Person'

const Persons = ({personFilter, del}) => {
    const personsView = personFilter.map((elem) => <Person key={elem.id} person={elem} del={del} />)

    return (
        <div>
            {personsView}
        </div>
    )
}

export default Persons