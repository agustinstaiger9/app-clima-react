import { useState } from 'react'
import './App.css'

const API_KEY = '9571ea1cb764c632482b7ac19d5c4442'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState('')

  const fetchWeather = async () => {
    if (!city) return
    setError('')
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=es`
      )
      const data = await res.json()
      if (data.cod === 200) {
        setWeather(data)
      } else {
        setWeather(null)
        setError(data.message)
      }
    } catch {
      setError('Error al obtener el clima')
      setWeather(null)
    }
  }

  return (
    <div className="app">
      <h1>Buscador de Clima</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Ingresa una ciudad"
          value={city}
          onChange={e => setCity(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && fetchWeather()}
        />
        <button onClick={fetchWeather}>Buscar</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>Temperatura: {weather.main.temp} °C</p>
          <p>Clima: {weather.weather[0].description}</p>
          <p>Humedad: {weather.main.humidity} %</p>
          <p>Viento: {weather.wind.speed} m/s</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
      )}
    </div>
  )
}

export default App
