import React from 'react'

const WeatherCard = ({ weather, temperature, isCelsius, changeUnitTemperature }) => {
    console.log(weather)
    return (
        <article className='weatherApp'>
            <h1>Weather App RH</h1>
            <h3>{`${weather.name}, ${weather.sys.country}`}</h3>
            <section className='weatherCard-body'>
                <div className='img-animation'>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" />
                </div>
                <ul>
                    <li>{weather.weather[0].description}</li>
                    <li>Wind speed: {weather.wind.speed} m/s</li>
                    <li>Cloud: {weather.clouds.all} %</li>
                    <li>Pressure: {weather.main.pressure} hPa</li>
                </ul>
            </section>
            <p>{isCelsius ? `${temperature.celsius}°C` : `${temperature.fahrenheit}°F`} K</p>
            <button className='weather-button' onClick={changeUnitTemperature}>Degrees °F/°C</button>
        </article>
    )
}

export default WeatherCard
