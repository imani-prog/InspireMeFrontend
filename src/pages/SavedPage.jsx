import React from 'react'
import { useNavigate } from 'react-router-dom'
import SavedQuotesList from '../components/SavedQuotesList'
import { SparklesIcon } from '../components/Icons'

export default function SavedPage() {
  const navigate = useNavigate()

  const handleClose = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-green-950">
      <div className="relative z-10 min-h-screen">
        <div className="max-w-6xl mx-auto py-4 sm:py-6 md:py-8">
          {/* Header */}
          <header className="text-center mb-8 sm:mb-12 md:mb-16 animate-slideUp">
            <div className="inline-block relative">
              <div className="absolute -inset-1 rounded-lg blur opacity-75"></div>
              <div className="relative">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-2 sm:mb-3 md:mb-4 tracking-tight px-4 flex items-center justify-center gap-3 sm:gap-4" style={{fontFamily: "'Playfair Display', serif"}}>
                  <SparklesIcon className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" />
                  InspireMe
                </h1>
                <div className="h-1 sm:h-1.5 md:h-2 bg-blue-400 rounded-full"></div>
              </div>
            </div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mt-3 sm:mt-4 md:mt-6 font-medium tracking-wide px-4 flex items-center justify-center gap-2 sm:gap-3">
              <SparklesIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
              Your Daily Dose of Wisdom & Motivation
              <SparklesIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </p>
          </header>

          {/* Saved Quotes List */}
          <SavedQuotesList onClose={handleClose} />
        </div>
      </div>
    </div>
  )
}
