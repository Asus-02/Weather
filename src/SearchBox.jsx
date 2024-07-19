import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';
export default function SearchBox ({updateInfo}) {
    const Api_url = "https://api.openweathermap.org/data/2.5/weather";
    const Api_key = "cb7031f3fa6d09f0c792bcb0052208f6";

    let [city, setCity] = useState("");
    let [error, seterror] = useState(false);
    
    let getWeatherInfo = async () => {
        try{
            let response = await fetch(`${Api_url}?q=${city}&appid=${Api_key}&units=metric`);
            let jsonresponse = await response.json();
            console.log(jsonresponse);
        
            let result = {
                city: city,
                temp: jsonresponse.main.temp,
                tempmin: jsonresponse.main.temp_min,
                tempmax: jsonresponse.main.temp_max,
                humidity: jsonresponse.main.humidity,
                feelsLike: jsonresponse.main.feels_like,
                weather: jsonresponse.weather[0].description,
            }
            console.log(result);
            return result;
        }
        catch(err){
            throw err;
        }
    };

    let handleChange = (evt) => {
        setCity(evt.target.value);
    };
    let handleSubmit = async (evt) => {
        try{
            evt.preventDefault();
            console.log(city);
            setCity("");
            let newinfo = await getWeatherInfo();
            updateInfo(newinfo);
        }
        catch(err){
            seterror(true);
        }
    };
    return (
        <div className='SearchBox'>
            <form onSubmit={handleSubmit}>
            <TextField id="city" label="City Name" variant="outlined" required onChange={handleChange}/>
            <br />
            <br />
            <Button variant="contained" type= "submit">Search</Button>
            {error && <p style={{color: "red"}}>No such Place Exists</p>}
            </form>
        </div>
    );
}