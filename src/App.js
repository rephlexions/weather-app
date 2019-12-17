import React from 'react';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather'

const API_KEY = '512fa621c813b082701ac543c5853294';
// https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=YOUR_API_KEY
// https://youtu.be/204C9yNeOYI?t=54m48s

class App extends React.Component {
    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined
    }

    getWeather = async (e) => {
        e.preventDefault();

        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);
        const data = await api_call.json();
        console.log(data);
        this.setState({
            temperature: data.main.temp,
            city: data.name,
            country: data.sys.country,
            humidity: data.main.humidity,
            description: data.weather[0].description,
            error: ""
        })


    }

    render() {
        return (
            <div>
                <Titles></Titles>
                <Form getWeather={this.getWeather}></Form>
                <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                ></Weather>
            </div>
        );
    }
}

export default App;