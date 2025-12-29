import React, { useEffect, useState } from 'react'
import { getSavedQuotes, deleteQuote, fetchAndSaveRandomQuote } from '../services/quoteService'
import { 
  BookIcon, 
  PlusIcon, 
  RefreshIcon, 
  CloseIcon, 
  CheckIcon, 
  AlertIcon, 
  InboxIcon, 
  MessageIcon, 
  TrashIcon, 
  StarIcon 
} from './Icons'

export default function SavedQuotesList({ onClose }) {
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const data = await getSavedQuotes()
      console.log('Received saved quotes:', data)
      
      let quotesArray = []
      if (Array.isArray(data)) {
        quotesArray = data
      } else if (data && Array.isArray(data.quotes)) {
        quotesArray = data.quotes
      } else {
        console.warn('Backend returned unexpected format:', data)
      }
      setQuotes(quotesArray)
    } catch (err) {
      console.error('Load error:', err)
      setError(err.message || 'Failed to load saved quotes. Is your backend running?')
      setQuotes([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function handleDelete(id) {
    try {
      await deleteQuote(id)
      setQuotes((s) => s.filter((q) => q.id !== id))
    } catch (err) {
      setError(err.message || 'Delete failed')
    }
  }

  async function handleAddRandomQuote() {
    setLoading(true)
    setError(null)
    setSuccessMsg(null)
    try {
      const result = await fetchAndSaveRandomQuote()
      console.log('Random quote saved:', result)
      setSuccessMsg(result.message || 'New quote added!')
      setTimeout(() => setSuccessMsg(null), 3000)
      // Reload the list
      await load()
    } catch (err) {
      console.error('Add random quote error:', err)
      setError(err.message || 'Failed to add random quote')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto mt-6 sm:mt-8 md:mt-12 px-2 sm:px-0">
      {/* Header Card */}
      <div className="relative group mb-6 sm:mb-8">
        <div className="absolute -inset-0.5 bg-blue-500 rounded-xl sm:rounded-2xl blur opacity-30"></div>
        <div className="relative bg-white/95 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 border border-white/20">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-blue-600 flex items-center gap-2 sm:gap-3" style={{fontFamily: "'Playfair Display', serif"}}>
                <BookIcon className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
                Your Collection
              </h3>
              <p className="text-gray-600 font-medium mt-1 sm:mt-2 text-sm sm:text-base">
                {quotes.length} {quotes.length === 1 ? 'quote' : 'quotes'} saved
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3 px-4 sm:px-8">
              <button
                className="px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 bg-blue-500 text-white font-bold text-xs sm:text-sm md:text-base rounded-lg sm:rounded-xl hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg"
                onClick={handleAddRandomQuote}
                disabled={loading}
              >
                <span className="flex items-center justify-center gap-1.5 sm:gap-2">
                  <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="whitespace-nowrap">Add Random</span>
                </span>
              </button>
              <button
                className="px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 bg-blue-500 text-white font-bold text-xs sm:text-sm md:text-base rounded-lg sm:rounded-xl hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg"
                onClick={load}
                disabled={loading}
              >
                <span className="flex items-center justify-center gap-1.5 sm:gap-2">
                  <RefreshIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Refresh</span>
                </span>
              </button>
              <button
                className="px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold text-xs sm:text-sm md:text-base rounded-lg sm:rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all transform hover:scale-105 shadow-lg"
                onClick={onClose}
              >
                <span className="flex items-center justify-center gap-1.5 sm:gap-2">
                  <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Close</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

            {/* Loading State */}
      {loading && (
        <div className="text-center p-6 sm:p-8 md:p-12">
          <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 border-b-4 sm:border-b-[5px] md:border-b-[6px] border-white"></div>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-white font-bold">Loading...</p>
        </div>
      )}

      {/* Success Message */}
      {successMsg && (
        <div className="mb-4 sm:mb-6 animate-slideUp">
          <div className="bg-emerald-500/30 backdrop-blur-lg border border-emerald-300/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl">
            <div className="flex items-center gap-2 sm:gap-3 justify-center">
              <CheckIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              <p className="text-white font-bold text-sm sm:text-base md:text-lg">{successMsg}</p>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="mb-4 sm:mb-6 bg-white/10 backdrop-blur-lg border border-red-400/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl">
          <div className="flex items-center gap-2 sm:gap-3">
            <AlertIcon className="w-6 h-6 sm:w-8 sm:h-8 text-red-300" />
            <p className="text-red-100 font-medium text-sm sm:text-base md:text-lg">{error}</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && quotes.length === 0 && (
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-lime-500 rounded-xl sm:rounded-2xl blur opacity-20"></div>
          <div className="relative bg-white/90 backdrop-blur-lg rounded-xl sm:rounded-2xl p-8 sm:p-12 md:p-16 text-center border border-white/20">
            <div className="mb-4 sm:mb-6 animate-float flex justify-center">
              <InboxIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 text-gray-400" />
            </div>
            <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-700 mb-1 sm:mb-2">No Quotes Yet</h4>
            <p className="text-gray-500 text-sm sm:text-base md:text-lg">Start collecting your favorite inspirational quotes!</p>
          </div>
        </div>
      )}

      {/* Quotes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {quotes.map((q, index) => (
          <div 
            key={q.id} 
            className="relative group animate-slideUp"
            style={{animationDelay: `${index * 0.1}s`}}
          >
            {/* Glow Effect */}
            <div className="absolute -inset-0.5 bg-blue-600 rounded-lg sm:rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
            
            {/* Quote Card */}
            <div className="relative bg-white/90 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-emerald-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              {/* Quote Icon */}
              <div className="absolute -top-2 sm:-top-3 -left-2 sm:-left-3 bg-blue-600 rounded-full p-1.5 sm:p-2 shadow-md">
                <MessageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              
              <div className="flex flex-col h-full">
                {/* Quote Text */}
                <div className="flex-1 mb-3 sm:mb-4 pt-2">
                  <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-medium italic">
                    "{q.text || q.q || q.quote}"
                  </p>
                </div>
                
                {/* Author & Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-blue-100">
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-8 sm:w-10 bg-blue-600 rounded-full"></div>
                    <div className="text-xs sm:text-sm font-bold">
                      {q.author || q.a || q.by || 'Unknown'}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDelete(q.id)}
                    className="px-4 sm:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-red-500 to-rose-500 text-white font-bold rounded-lg hover:from-red-600 hover:to-rose-600 transition-all transform hover:scale-110 shadow-md hover:shadow-lg"
                  >
                    <span className="flex items-center justify-center gap-1 sm:gap-1.5">
                      <TrashIcon className="w-4 h-4 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm">Delete</span>
                    </span>
                  </button>
                </div>
              </div>
              
              {/* Decorative Element */}
              <div className="absolute bottom-1.5 sm:bottom-2 right-1.5 sm:right-2 text-blue-600 opacity-30 text-xs sm:text-sm">
                <StarIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
