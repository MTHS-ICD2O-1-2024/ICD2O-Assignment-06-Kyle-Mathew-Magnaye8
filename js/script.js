// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Created by: Kyle Matthew
// Created on: May 20 2025
// This file contains the JS functions for index.html

'use strict' // Enforces stricter syntax rules in JavaScript

// Define an asynchronous function to get and display weather info
async function wheaterAppBtn() {
  try {
    // Define the API URL with fixed coordinates for Ottawa and your API key
    const url =
      'https://api.openweathermap.org/data/2.5/weather?lat=45.4211435&lon=-75.6900574&appid=f5cce8e3a6c922f1fdf3bd14085cd28e'

    // Fetch the weather data from OpenWeatherMap API
    const result = await fetch(url)

    // Convert the response to JSON format
    const jsonData = await result.json()

    // Extract temperature (in Kelvin) from the JSON data
    const temp = jsonData.main.temp

    // Extract the weather icon code
    const iconCode = jsonData.weather[0].icon

    // Create full URL for the weather icon
    const iconUrl =
      'https://openweathermap.org/img/wn/' + iconCode + '@2x.png'

    // Set the image source in the HTML to display the weather icon
    document.getElementById('weatherImage').src = iconUrl

    // Convert temperature to Celsius and display it in the result div
    document.getElementById('result').innerHTML =
      (temp - 273.15).toFixed(0) + '°C'
  } catch (error) {
    // Print error to console if fetch or parsing fails
    console.log(error)
  }
}
