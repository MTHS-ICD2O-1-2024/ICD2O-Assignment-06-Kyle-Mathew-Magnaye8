/* exported fetchSpaceImage */
// Created by: Kyle Matthew
// Created on: May 20, 2025
// This JS fetches a random space image from NASA's APOD API

'use strict'

const imageContainer = document.getElementById("image-container")
const titleEl = document.getElementById("title")
const errorEl = document.getElementById("error")

function getRandomDate() {
  const start = new Date(2010, 0, 1) // Jan 1, 2010
  const end = new Date()
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  return randomDate.toISOString().split("T")[0] // Format: YYYY-MM-DD
}

async function fetchSpaceImage() {
  const date = getRandomDate()
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${date}`

  try {
    errorEl.textContent = ""
    imageContainer.innerHTML = "<p>Loading image...</p>"
    titleEl.textContent = ""

    const response = await fetch(apiUrl)
    if (!response.ok) throw new Error("Could not fetch image.")

    const data = await response.json()

    if (data.media_type === "image") {
      imageContainer.innerHTML = `<img src="${data.url}" alt="NASA image of the day" style="max-width: 100%; border-radius: 12px;">`
      titleEl.textContent = data.title
    } else {
      throw new Error("Media type not supported (not an image).")
    }
  } catch (error) {
    imageContainer.innerHTML = ""
    errorEl.textContent = "Error loading image: " + error.message
  }
}

// Automatically load one image when the page loads
window.onload = fetchSpaceImage
