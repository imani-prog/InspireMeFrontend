import React, { useEffect, useState } from 'react'

import QuoteCard from './QuoteCard'
import SavedQuotesList from './SavedQuotesList'
import AddQuoteModal from './AddQuoteModal'
import * as quoteService from '../services/quoteService'
import { 
  SparklesIcon, 
  RefreshIcon, 
  SaveIcon, 
  PenIcon, 
  BookIcon, 
  HeartIcon, 
  AlertIcon, 
  CheckIcon 
} from './Icons'

function Quote() {
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [savedVisible, setSavedVisible] = useState(false)
  const [message, setMessage] = useState(null)
  const [addModalOpen, setAddModalOpen] = useState(false)

  useEffect(() => {
    fetchQuote()
  }, [])

  async function fetchQuote() {
    setLoading(true)
    setError(null)
    setMessage(null)
    try {
      const data = await quoteService.getRandomQuote()
      let q = data
      if (Array.isArray(data)) q = data[0]
      setQuote(q)
    } catch (err) {
      setError(err.message || 'Failed to fetch quote')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    if (!quote) return
    setLoading(true)
    setMessage(null)
    setError(null)
    try {
      const payload = {
        text: quote.q || quote.text || quote.quote,
        author: quote.a || quote.author || quote.by || 'Unknown',
      }
      console.log('Saving quote:', payload)
      await quoteService.saveQuote(payload)
      setMessage('Quote Saved Successfully!')
      setTimeout(() => setMessage(null), 3000)
    } catch (err) {
      console.error('Save error:', err)
      const errorMsg = err.response?.data?.message || err.message || 'Failed to save quote. Is your backend running?'
      setError(errorMsg)
      setTimeout(() => setError(null), 5000)
    } finally {
      setLoading(false)
    }
  }

  function handleQuoteAdded() {
    setMessage('Quote created successfully!')
    setTimeout(() => setMessage(null), 3000)
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-green-900">
      {/* Animated Background Blobs */}
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        <div className="max-w-6xl mx-auto py-4 sm:py-6 md:py-8">
          {/* Header */}
          <header className="text-center mb-8 sm:mb-12 md:mb-16 animate-slideUp">
            <div className="inline-block relative">
              <div className="absolute -inset-1  rounded-lg blur opacity-75"></div>
              <div className="relative">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-2 sm:mb-3 md:mb-4 tracking-tight px-4 flex items-center justify-center gap-3 sm:gap-4" style={{fontFamily: "'Playfair Display', serif"}}>
                  <SparklesIcon className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" />
                  InspireMe
                </h1>
                <div className="h-1 sm:h-1.5 md:h-2 bg-teal-400 rounded-full"></div>
              </div>
            </div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-emerald-100 mt-3 sm:mt-4 md:mt-6 font-medium tracking-wide px-4 flex items-center justify-center gap-2 sm:gap-3">
              <SparklesIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
              Your Daily Dose of Wisdom & Motivation
              <SparklesIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </p>
          </header>

          {/* Main Content */}
          <main className="space-y-6 sm:space-y-8">
            {/* Quote Display */}
            <div className="animate-fadeIn">
              {loading && (
                <div className="text-center py-12 sm:py-16 md:py-20">
                  <div className="inline-flex flex-col items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 border-6 sm:border-8 border-emerald-200 border-t-white rounded-full animate-spin"></div>
                      <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 border-6 sm:border-8 border-transparent border-b-lime-300 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
                    </div>
                    <p className="text-white text-base sm:text-lg font-medium animate-pulse">Loading inspiration...</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg border border-red-400/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl animate-slideUp">
                  <div className="flex items-center gap-3">
                    <AlertIcon className="w-6 h-6 sm:w-8 sm:h-8 text-red-300" />
                    <p className="text-red-100 font-medium text-sm sm:text-base md:text-lg">{error}</p>
                  </div>
                </div>
              )}

              {!loading && quote && (
                <div className="animate-slideUp">
                  <QuoteCard quote={quote} />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 justify-center items-stretch sm:items-center px-2 sm:px-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-5xl">
                <button
                  onClick={fetchQuote}
                  disabled={loading}
                  className="group relative px-4 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 bg-gradient-to-r from-lime-500 to-emerald-500 text-white font-bold text-sm sm:text-base md:text-lg rounded-xl sm:rounded-2xl hover:from-lime-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-2xl hover:shadow-lime-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
                >
                  <span className="flex items-center justify-center gap-2 sm:gap-3">
                    <RefreshIcon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-180 transition-transform duration-500" />
                    <span>New Quote</span>
                  </span>
                </button>

                <button
                  onClick={handleSave}
                  disabled={loading || !quote}
                  className="group relative px-4 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm sm:text-base md:text-lg rounded-xl sm:rounded-2xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-2xl hover:shadow-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
                >
                  <span className="flex items-center justify-center gap-2 sm:gap-3">
                    <SaveIcon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-125 transition-transform duration-300" />
                    <span>Save Quote</span>
                  </span>
                </button>

                <button
                  onClick={() => setAddModalOpen(true)}
                  className="group relative px-4 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-sm sm:text-base md:text-lg rounded-xl sm:rounded-2xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-2xl hover:shadow-cyan-500/50"
                >
                  <span className="flex items-center justify-center gap-2 sm:gap-3">
                    <PenIcon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-125 transition-transform duration-300" />
                    <span>Create Quote</span>
                  </span>
                </button>

                <button
                  onClick={() => setSavedVisible((s) => !s)}
                  className="group relative px-4 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold text-sm sm:text-base md:text-lg rounded-xl sm:rounded-2xl hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-2xl hover:shadow-teal-500/50"
                >
                  <span className="flex items-center justify-center gap-2 sm:gap-3">
                    <BookIcon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-125 transition-transform duration-300" />
                    <span>{savedVisible ? 'Hide' : 'View'} Saved</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Success Message */}
            {message && (
              <div className="text-center animate-slideUp px-4">
                <div className="inline-flex items-center gap-2 sm:gap-3 bg-emerald-500/30 backdrop-blur-lg border border-emerald-300/50 px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-2xl">
                  <CheckIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 animate-bounce text-white" />
                  <span className="text-white font-bold text-sm sm:text-base md:text-xl">{message}</span>
                </div>
              </div>
            )}            {/* Saved Quotes List */}
            {savedVisible && (
              <div className="animate-slideUp">
                <SavedQuotesList onClose={() => setSavedVisible(false)} />
              </div>
            )}
          </main>

          {/* Footer */}
          <footer className="text-center mt-12 sm:mt-16 md:mt-20 pb-4 sm:pb-6 md:pb-8">
            <p className="text-emerald-200 text-xs sm:text-sm font-medium px-4 flex items-center justify-center gap-2">
              Made with <HeartIcon className="w-4 h-4 text-lime-400 animate-pulse fill-lime-400" /> for inspiration seekers worldwide
            </p>
          </footer>
        </div>
      </div>

      {/* Add Quote Modal */}
      <AddQuoteModal 
        isOpen={addModalOpen} 
        onClose={() => setAddModalOpen(false)}
        onQuoteAdded={handleQuoteAdded}
      />
    </div>
  )
}

export default Quote
