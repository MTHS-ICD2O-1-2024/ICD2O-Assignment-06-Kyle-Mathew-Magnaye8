/* exported fetchSpaceImage */
// Created by: Kyle Matthew
// Created on: May 20, 2025
// This JS fetches a random space image from NASA's APOD API

'use strict'

const imageContainer = document.getElementById('image-container')
const titleEl = document.getElementById('title')
const errorEl = document.getElementById('error')
const loadBtn = document.getElementById('loadImage')

// Replace DEMO_KEY with your personal NASA API key for better reliability
const NASA_API_KEY = 'rgdZHZHSp7rIAydLQeLE07Yx2poRjcdke6QBX8XH' // <-- Change this to your own key for more requests

async function fetchSpaceImage() {
  if (loadBtn) loadBtn.disabled = true
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=4`
  try {
    errorEl.textContent = ''
    imageContainer.innerHTML = '<p>Loading image...</p>'
    titleEl.textContent = ''

    const response = await fetch(apiUrl)
    const dataArr = await response.json()

    if (!response.ok) {
      const errMsg = dataArr && dataArr.error && dataArr.error.message
        ? dataArr.error.message
        : 'Could not fetch image.'
      throw new Error(errMsg)
    }

    const imageData = Array.isArray(dataArr)
      ? dataArr.find((d) => d.media_type === 'image')
      : null

    if (imageData) {
      imageContainer.innerHTML = `<img src="${imageData.url}" alt="NASA image of the day" style="max-width: 100%; border-radius: 12px;">`
      titleEl.textContent = imageData.title
    } else {
      errorEl.textContent = 'No image found, try again!'
      imageContainer.innerHTML = ''
      titleEl.textContent = ''
    }
  } catch (error) {
    errorEl.textContent = 'Failed to load image. ' + error.message
    imageContainer.innerHTML = ''
    titleEl.textContent = ''
    console.error('NASA API error:', error)
  } finally {
    if (loadBtn) loadBtn.disabled = false
  }
}

// Attach event on DOMContentLoaded to be sure everything is ready
window.addEventListener('DOMContentLoaded', () => {
  fetchSpaceImage()
  if (loadBtn) loadBtn.addEventListener('click', fetchSpaceImage)
})
