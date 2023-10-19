// Define the OpenWeatherMap API key and base URL
     const apiKey = '8837cdcd4b793ece3367e5f90a2489aa';
     const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

// Select elements from the DOM
     const searchBox = document.querySelector('.search input')
     const searchBtn = document.querySelector('.search button')
     const weatherIcon = document.querySelector('.weather-icon')

// Asynchronous function to check and display weather information
     async function checkWeather(city){
          const response = await fetch(apiUrl + city + `&appid=${apiKey}`)

 // If the response status is 404 (City not found), display an error message            
          if(response.status == 404){
                document.querySelector('.error').style.display = 'block'
                document.querySelector('.weather').style.display = 'none'
          }
          else{
               let data = await response.json()

// Update the page with weather information                
               document.querySelector('.city').innerHTML = data.name
               document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C'
               document.querySelector('.humidity').innerHTML = data.main.humidity + '%'
               document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h'

// Set the weather icon based on the weather condition
               if(data.weather[0].main == 'Clouds'){
                    weatherIcon.src = 'images/clouds.png'
               }
               else if(data.weather[0].main == 'Clear'){
                    weatherIcon.src = 'images/clear.png'
               }
               else if(data.weather[0].main == 'Rain'){
                    weatherIcon.src = 'images/rain.png'
               }
               else if(data.weather[0].main == 'Drizzle'){
                    weatherIcon.src = 'images/drizzle.png'
               }
               else if(data.weather[0].main == 'Mist'){
                    weatherIcon.src = 'images/mist.png'
               }
// Display the weather information and hide the error message
               document.querySelector('.weather').style.display = 'block'
               document.querySelector('.error').style.display = 'none'
               }

            

     }
// Add a click event listener to the search button to trigger weather search
     searchBtn.addEventListener('click', () => {
          checkWeather(searchBox.value)
          })
// Function to handle Enter key press and trigger weather search
     const handleEnterKey = (event) => {
          if (event.key === 'Enter') {
               checkWeather(searchBox.value)
          }
     }
//add event listener for Enter Key press in the search box
     searchBox.addEventListener('keypress', handleEnterKey)
     checkWeather()