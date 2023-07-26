import { useState, useEffect } from 'react'
import Country from './Country'
import CountryElem from './CountryElem'


const Content = ({countries}) => {
    const [content, setContent] = useState('')

    const handleShow = name => {
        const country = countries.find(c => c.name.common === name)
        setContent(<Country country={country} />)
    }

    useEffect(() => {
        const length = countries.length

        if (length > 10) {
            setContent('Too many matches, specify another filter');
        } else if (length === 1) {
            setContent(<Country country={countries[0]} />);
        } else if (length === 0) {
            setContent('No countries matching');
        } else {
            setContent(countries.map(c => <CountryElem key={c.name.common} name={c.name.common} buttonAction={handleShow} />));
        }
    }, [countries])

    return (
        <div>
            {content}
      </div>
    )
}

export default Content