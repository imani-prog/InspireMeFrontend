import axios from 'axios'

const BASE = 'http://localhost:8080/api/quotes'

export async function getRandomQuote() {
  const res = await axios.get(`${BASE}/random`)
  return res.data
}

export async function saveQuote(quote) {
  const res = await axios.post(`${BASE}/save`, quote)
  return res.data
}

export async function getSavedQuotes() {
  const res = await axios.get(`${BASE}`)
  return res.data
}

export async function deleteQuote(id) {
  const res = await axios.delete(`${BASE}/${id}`)
  return res.data
}

export async function fetchAndSaveRandomQuote() {
  const res = await axios.post(`${BASE}/random/save`)
  return res.data
}

export default {
  getRandomQuote,
  saveQuote,
  getSavedQuotes,
  deleteQuote,
  fetchAndSaveRandomQuote,
}
