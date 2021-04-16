import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryInfo = ({country}) => {
  return (
    <>
      <h1>{country.name}</h1>
      <div>{`capital ${country.capital}`}</div>
      <div>{`population ${country.population}`}</div>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} width={200} alt={`flag of ${country.name}`} />
    </>
  )
}

const CountriesInfo = ({countries}) => {
  if(countries.length > 10) {
    return (<div>Too many matches, specify another filter</div>)
  } else if (countries.length === 1) {
    return (<CountryInfo country={countries[0]} />)
  } else {
    return (countries.map(country => <div key={country.name}>{country.name}</div>))
  }
}

const App = () => {
  const [ searchText, setSearchText ] = useState('')
  const [ countries, setCountries ] = useState([])

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  const searchedCountries = countries.filter(country => country.name.toLowerCase().includes(searchText.toLowerCase()));
  
  return (
    <div>
      find countries <input value={searchText} onChange={handleSearchTextChange} />
      <CountriesInfo countries={searchedCountries} />
    </div>
  )
}

export default App