document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById("city-input")
    const getWeatherBtn = document.getElementById("get-weather-btn")
    const weatherInfo = document.getElementById("weather-info")
    const cityNameDisplay = document.getElementById("city-name")
    const temperatureDisplay = document.getElementById("temperature")
    const descriptionDisplay = document.getElementById("description")
    const errorMessage = document.getElementById("error-message")

    //API_KEY is in another file

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim()
        if(!city) { return; }

        try{
            const weatherData = await fetchWeatherData(city)
            displayWeatherData(weatherData)
        }catch(error){
            console.error(error);
            showError();
        }
    })

    async function fetchWeatherData(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        console.log("Response: ", response);
    
        if(!response.ok){
            throw new Error("City not found");
        }
        const data = await response.json();
        return data;
    }

    function displayWeatherData(data){
        //display
        console.log(data)
        const {name, main, weather} = data
        cityNameDisplay.textContent = name

        // Weather Icons mapping
        const weatherIconMap = {
            Thunderstorm: "wi-thunderstorm",
            Drizzle: "wi-sprinkle",
            Rain: "wi-rain",
            Snow: "wi-snow",
            Mist: "wi-fog",
            Smoke: "wi-smoke",
            Haze: "wi-day-haze",
            Dust: "wi-dust",
            Fog: "wi-fog",
            Sand: "wi-sandstorm",
            Ash: "wi-volcano",
            Squall: "wi-strong-wind",
            Tornado: "wi-tornado",
            Clear: "wi-day-sunny",
            Clouds: "wi-cloudy"
        };
        const iconClass = weatherIconMap[weather[0].main] || "wi-na";

        weatherInfo.classList.remove('hidden')
        errorMessage.classList.add('hidden')
        temperatureDisplay.textContent = `Temperature : ${main.temp}°c`
        descriptionDisplay.innerHTML = `Weather : ${weather[0].description} <i class=\"wi ${iconClass}\" style=\"font-size: 40px; vertical-align: middle;\"></i>`;
    }

    function showError(){
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.remove('hidden')
    }

})