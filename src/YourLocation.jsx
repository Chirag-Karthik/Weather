import { useState, useEffect } from 'react';
import './index.css'

export default function YourLocation(){

    const [location, setLocation] = useState('');
    const [temp, setTemp] = useState(null);
    const [iconUrl, setIconUrl] = useState('');
    const [overview, setOverView] = useState('');
    const [precipitation, setPrecipitation] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [clouds, setClouds] = useState(null);
    const [visibility, setVisibility] = useState(null);
    const [uvIndex, setUvIndex] = useState(null);
    const [time, setTime] = useState("");

    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
    


    useEffect(() => {
        // Step 1: Get location based on IP
        fetch("https://ipapi.co/json/")
          .then((res) => res.json())
          .then((data) => {
            setLocation(data.city);
          })
        
        .catch((error) => console.error("Error getting location:", error));
      }, []);

      useEffect(() => {
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
      })
     
    return(<>
    <div className="weather">
      <h2 className="time">📅⏳ {time}</h2> 
      <h1 className="location">➤ {location}</h1> 
      <div className="weather-condition">
        <h1 className="temp">🌡️{temp} °C</h1>
        <h2 className="precipitation">🌧️ Precipitation: {precipitation} mm</h2>
        <h2 className="humidity">💧Humidity: {humidity} %</h2>
        <h2 className="visibility">👁 Visibility: {visibility} KM</h2>
        <h2 className="clouds">☁️ Clouds: {clouds}</h2>
        <h2 className="uvindex">☀️ UV Index: {uvIndex}</h2>
      </div>
      <div className="container">
        <h2 className="cast">{overview} Day </h2>
        <img className= 'img' src={iconUrl} alt="" />
      </div>
    </div>    
    </>)
}