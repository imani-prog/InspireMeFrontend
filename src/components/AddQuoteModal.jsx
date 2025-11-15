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
      
      // Reset form
      setText('')
      setAuthor('')
      
      // Notify parent
      if (onQuoteAdded) {
        onQuoteAdded(response)
      }
      
      // Close modal
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl my-4 sm:my-8">
        {/* Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-lime-500 via-emerald-500 to-teal-500 rounded-2xl sm:rounded-3xl blur opacity-30"></div>
        
        {/* Modal Content */}
        <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 animate-slideUp max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-lime-600 flex items-center gap-2 sm:gap-3" style={{fontFamily: "'Playfair Display', serif"}}>
              <PenIcon className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
              Create New Quote
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
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
              <label htmlFor="text" className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                Quote Text *
              </label>
              <textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-gray-800 font-medium resize-none text-sm sm:text-base"
                placeholder="Enter your inspirational quote..."
                disabled={loading}
              />
            </div>

            {/* Author */}
            <div>
              <label htmlFor="author" className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                Author
              </label>
              <input
                id="author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-gray-800 font-medium text-sm sm:text-base"
                placeholder="e.g., Mahatma Gandhi"
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-1">Leave blank for "Unknown"</p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm sm:text-base rounded-lg sm:rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <LoaderIcon className="w-5 h-5 animate-spin" />
                    Creating...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <SaveIcon className="w-5 h-5" />
                    Create Quote
                  </span>
                )}
              </button>
              
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-200 text-gray-700 font-bold text-sm sm:text-base rounded-lg sm:rounded-xl hover:bg-gray-300 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50"
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
