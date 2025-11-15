import axios from 'axios'

// Use environment variable with fallback to localhost for development
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/quotes'

// Log API URL for debugging (visible in browser console)
console.log('🌐 API Configuration:', {
  url: BASE_URL,
  mode: import.meta.env.MODE,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
})

export async function getRandomQuote() {
  const res = await axios.get(`${BASE_URL}/random`)
  return res.data
}

export async function saveQuote(quote) {
  const res = await axios.post(`${BASE_URL}/save`, quote)
  return res.data
}

export async function getSavedQuotes() {
  const res = await axios.get(BASE_URL)
  return res.data
}

export async function deleteQuote(id) {
  const res = await axios.delete(`${BASE_URL}/${id}`)
  return res.data
}

export async function fetchAndSaveRandomQuote() {
  const res = await axios.post(`${BASE_URL}/random/save`)
  return res.data
}

export default {
  getRandomQuote,
  saveQuote,
  getSavedQuotes,
  deleteQuote,
  fetchAndSaveRandomQuote,
}
