import React from 'react'
import { QuoteIcon, SparklesIcon, StarIcon } from './Icons'

export default function QuoteCard({ quote, className = '' }) {
  if (!quote) return null

  const text = quote.q || quote.text || quote.quote || quote.body || ''
  const author = quote.a || quote.author || quote.by || 'Unknown'

  return (
    <div className={`max-w-md sm:max-w-4xl mx-auto relative group px-3 sm:px-5 md:px-6 ${className}`}>
      
      {/* Main Card */}
      <div className="relative bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-12 border border-white/20 transform transition-all duration-500 hover:scale-[1.02]">
        {/* Decorative Corner Elements */}
        <div className="absolute top-0 left-0 w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 border-t-2 border-l-2 sm:border-t-4 sm:border-l-4 border-blue-600 rounded-tl-xl sm:rounded-tl-2xl md:rounded-tl-3xl opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 border-b-2 border-r-2 sm:border-b-4 sm:border-r-4 border-blue-600 rounded-br-xl sm:rounded-br-2xl md:rounded-br-3xl opacity-50"></div>
        
        {/* Quote Icon */}
        <div className="absolute -top-3 sm:-top-4 md:-top-6 left-4 sm:left-8 md:left-12 bg-blue-500 rounded-full p-1.5 sm:p-2 md:p-3 shadow-lg">
          <QuoteIcon className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
        </div>
        
        {/* Quote Text */}
        <div className="relative mt-4 sm:mt-6">
          <div className="absolute -left-1 sm:-left-3 md:-left-6 top-0 text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-black opacity-70 select-none leading-none" style={{fontFamily: "'Playfair Display', serif"}}>"</div>
          <blockquote className="relative z-10 text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-800 leading-relaxed font-serif italic px-3 sm:px-5 md:px-8">
            {text}
          </blockquote>
          <div className="absolute -right-1 sm:-right-3 md:-right-6 bottom-0 text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-black opacity-70 select-none leading-none" style={{fontFamily: "'Playfair Display', serif"}}>"</div>
        </div>
        
        {/* Author Section */}
        <div className="mt-4 sm:mt-6 md:mt-10 pt-3 sm:pt-5 md:pt-8 border-t-2 border-blue-500 flex items-center justify-end gap-2 sm:gap-3 md:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:block h-0.5 sm:h-1 w-8 sm:w-12 md:w-16  rounded-full"></div>
            <div className="text-right">
              <div className="text-sm sm:text-lg md:text-xl lg:text-2xl font-semibold font-serif text-gray-900">
                {author}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Stars */}
        <div className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 text-blue-600 opacity-50 animate-pulse">
          <SparklesIcon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
        </div>
        <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-3 sm:left-4 md:left-6 text-blue-600 opacity-50 animate-pulse" style={{animationDelay: '0.5s'}}>
          <StarIcon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
        </div>
      </div>
    </div>
  )
}
