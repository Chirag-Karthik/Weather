import { useState, useEffect } from 'react';
import './CustomLocation.css'

export default function CustomLocation(){
    const [location, setLocation] = useState('');
    const [isLocationEntered, setIsLocationEntered] = useState(false);
    const [temp, setTemp] = useState(null);
    const [iconUrl, setIconUrl] = useState('');
    const [overview, setOverView] = useState('');
    const [precipitation, setPrecipitation] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [clouds, setClouds] = useState(null);
    const [visibility, setVisibility] = useState(null);
    const [uvIndex, setUvIndex] = useState(null);
    const [time, setTime] = useState("");
    
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  
    function handleSubmit(){
        fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`)
          .then((res) => res.json())
          .then((data) =>{
            setTemp(data.current.temp_c);
            setIconUrl('https:'+ data.current.condition.icon)
            setOverView(data.current.condition.text)
            setPrecipitation(data.current.precip_mm)
            setHumidity(data.current.humidity)
            setClouds(data.current.cloud)
            setVisibility(data.current.vis_km)
            setUvIndex(data.current.uv)
            setTime(data.location.localtime)
          })
          .catch((error) => console.error("Error fetching weather data:", error));
        setIsLocationEntered(true);    
    }
    return(
        <>
        <div className="container1">
        <input type="text" className="location1" placeholder='Enter Location' onChange={(e) => setLocation(e.target.value)} />
        <button className='location-submit1' onClick={() => handleSubmit()}>Submit</button>
        {isLocationEntered ?
        <>
            <h2 className="time1">📅⏳ {time}</h2> 
            <h1 className="location1">➤ {location}</h1> 
            <div className="weather-condition1">
              <h1 className="temp1">🌡️{temp} °C</h1>
              <h2 className="precipitation1">🌧️ Precipitation: {precipitation} mm</h2>
              <h2 className="humidity1">💧Humidity: {humidity} %</h2>
              <h2 className="visibility1">👁 Visibility: {visibility} KM</h2>
              <h2 className="clouds1">☁️ Clouds: {clouds}</h2>
              <h2 className="uvindex1">☀️ UV Index: {uvIndex}</h2>
            </div>
            <div className="container1">
              <h2 className="cast1">{overview} Day </h2>
              <img className= 'img1' src={iconUrl} alt="" />
            </div>
            </>
            : ""}
        </div>
    </>
    )



}