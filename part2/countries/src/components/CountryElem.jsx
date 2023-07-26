const CountryElem = ({name, buttonAction}) => (
    <div>
        {name}
        <button onClick={() => buttonAction(name)}>show</button>
    </div>
)

export default CountryElem