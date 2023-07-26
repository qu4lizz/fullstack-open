import { useState, useEffect } from 'react'
import Content from './components/Content'
import Filter from './components/Filter'
import countriesService from './services/countries'

function App() {
  const [countries, setCountries] = useState([])
  const [activeCountries, setActiveCountries] = useState([])
  const [filterInput, setFilterInput] = useState('')

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
        console.log(initialCountries)
      })
  }, [])

  const handleInputChange = (event) => {
    const input = event.target.value
    setFilterInput(input)
    setActiveCountries(countries.filter(c => c.name.common.toUpperCase().includes(input.toUpperCase())))
  }

  return (
    <div>
      <Filter input={filterInput} action={handleInputChange} />
      <Content countries={activeCountries} />

    </div>
  )
}

export default App;
