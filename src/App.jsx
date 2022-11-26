import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard'

function App() {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [isCelsius, setIsCelsius] = useState(true)


  const success = (pos) => {
    console.log(pos)
    const newCoords = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
    setCoords(newCoords)
  }

  const changeUnitTemperature = () => setIsCelsius(!isCelsius)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])


  //Peticion de datos

  useEffect(() => {
    if (coords) {
      const API_KEY = "616b1fc2b3ebbc8c02af31a394f1bb5c"
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
      axios.get(URL)
        .then(res => {
          const tempKelvin = res.data.main.temp
          const tempCelsius = (tempKelvin - 273.15).toFixed(2)
          const tempFahrenheit = ((tempCelsius * 9 / 5) + 32).toFixed(2)
          const newTemperature = {
            celsius: tempCelsius,
            fahrenheit: tempFahrenheit
          }
          setTemperature(newTemperature)
          setWeather(res.data)
        })
        .catch(err => console.log(err))
    }
  }, [coords])

  console.log(temperature)

  return (
    <div className="App">
      {
        weather ? (
          <WeatherCard
            weather={weather}
            temperature={temperature}
            changeUnitTemperature={changeUnitTemperature}
            isCelsius={isCelsius}
          />
        ) : <p>Weather App Loading ...</p>
      }
    </div>
  )
}

export default App
