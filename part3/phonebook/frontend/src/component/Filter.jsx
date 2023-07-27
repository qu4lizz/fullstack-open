const Filter = ({ input, handle }) => {
    return (
      <div>
        filter:
        <input
          value={input}
          onChange={handle}
        />
      </div>
    );
  };
  
  export default Filter;
  