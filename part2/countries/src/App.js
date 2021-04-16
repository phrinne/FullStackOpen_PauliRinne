import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({city}) => { 
  const [ weather, setWeather ] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY
  const weatherUrl = `http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`

  useEffect(() => {
    axios
      .get(weatherUrl)
      .then(response => setWeather(response.data))
  }, [weatherUrl])
  
  if(weather !== null) {
    return (
      <>
        <div><strong>Temperature: </strong>{weather.current.temperature} Celsius</div>
        <img src={weather.current.weather_icons} alt='weather icon' />
        <div><strong>Wind: </strong>{weather.current.wind_speed} kmh direction {weather.current.wind_dir}</div>
      </>
    )
  }
  return (<></>)
}

const CountryInfo = ({country}) => (
    <>
      <h1>{country.name}</h1>
      <div>{`capital ${country.capital}`}</div>
      <div>{`population ${country.population}`}</div>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} width={200} alt={`flag of ${country.name}`} />
      <h2>{`Weather in ${country.capital}`}</h2>
      <Weather city={country.capital} />
    </>
)

const CountryListItem = ({country, setSearchText}) => (
  <div>
    {country.name} <button onClick={() => setSearchText(country.name)}>show</button>
  </div>
)

const CountriesInfo = ({countries, setSearchText}) => {
  if(countries.length > 10) {
    return (<div>Too many matches, specify another filter</div>)
  } else if (countries.length === 1) {
    return (<CountryInfo country={countries[0]} />)
  } else {
    return (countries.map(country => <CountryListItem country={country} setSearchText={setSearchText} key={country.name} />))
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
      <CountriesInfo countries={searchedCountries} setSearchText={setSearchText} />
    </div>
  )
}

export default App