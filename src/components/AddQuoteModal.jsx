import React, { useState } from 'react'
import { PenIcon, CloseIcon, SaveIcon, LoaderIcon } from './Icons'
import { saveQuote } from '../services/quoteService'

export default function AddQuoteModal({ isOpen, onClose, onQuoteAdded }) {
  const [text, setText] = useState('')
  const [author, setAuthor] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  if (!isOpen) return null

  async function handleSubmit(e) {
    e.preventDefault()
    
    if (!text.trim()) {
      setError('Quote text is required')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await saveQuote({
        text: text.trim(),
        author: author.trim() || 'Unknown'
      })
      
      console.log('Quote created:', response)
      
      setText('')
      setAuthor('')
      
      if (onQuoteAdded) {
        onQuoteAdded(response)
      }
      
      onClose()
    } catch (err) {
      console.error('Error creating quote:', err)
      setError(err.response?.data?.message || err.message || 'Failed to create quote')
    } finally {
      setLoading(false)
    }
  }

  function handleClose() {
    setText('')
    setAuthor('')
    setError(null)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full sm:max-w-2xl my-0 sm:my-8 rounded-t-2xl sm:rounded-3xl">
        {/* Glow Effect */}
        {/* <div className="absolute -inset-0.5 bg-gradient-to-r from-lime-500 via-emerald-500 to-teal-500 rounded-2xl sm:rounded-3xl blur opacity-30"></div> */}
        
        {/* Modal Content */}
        <div className="relative bg-white rounded-t-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 animate-slideUp max-h-[92vh] sm:max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-transparent bg-clip-text text-blue-600 flex items-center gap-2 sm:gap-3" style={{fontFamily: "'Playfair Display', serif"}}>
              <PenIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-600" />
              Create New Quote
            </h2>
            <button
              onClick={handleClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <CloseIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Quote Text */}
            <div>
              <label htmlFor="text" className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">
                Quote Text *
              </label>
              <textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-xs sm:text-sm text-gray-800 resize-none"
                placeholder="Enter your inspirational quote..."
                disabled={loading}
              />
            </div>

            {/* Author */}
            <div>
              <label htmlFor="author" className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">
                Author
              </label>
              <input
                id="author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-xs sm:text-sm text-gray-800"
                placeholder="e.g., Mahatma Gandhi"
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-1">Leave blank for "Unknown"</p>
            </div>

            {/* Buttons */}
            <div className="flex flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 sm:px-8 sm:py-3 bg-blue-500 text-white font-bold text-xs sm:text-sm md:text-base rounded-lg sm:rounded-xl hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <LoaderIcon className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    Creating...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <SaveIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    Create Quote
                  </span>
                )}
              </button>
              
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="flex-1 px-4 py-2 sm:px-8 sm:py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold text-xs sm:text-sm md:text-base rounded-lg sm:rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
