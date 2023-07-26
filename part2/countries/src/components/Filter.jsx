const Filter = ({input, action}) => (
    <div>
        find countries: 
        <input value={input} onChange={action} />
    </div>
)

export default Filter