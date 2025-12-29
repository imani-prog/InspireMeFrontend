import React from 'react'
import { QuoteIcon, SparklesIcon, StarIcon } from './Icons'

export default function QuoteCard({ quote, className = '' }) {
  if (!quote) return null

  const text = quote.q || quote.text || quote.quote || quote.body || ''
  const author = quote.a || quote.author || quote.by || 'Unknown'

  return (
    <div className={`max-w-4xl mx-auto relative group px-4 sm:px-6 ${className}`}>
      
      {/* Main Card */}
      <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-6 md:p-8 lg:p-12 border border-white/20 transform transition-all duration-500 hover:scale-[1.02]">
        {/* Decorative Corner Elements */}
        <div className="absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border-t-2 border-l-2 sm:border-t-4 sm:border-l-4 border-emerald-400 rounded-tl-2xl sm:rounded-tl-3xl opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border-b-2 border-r-2 sm:border-b-4 sm:border-r-4 border-lime-400 rounded-br-2xl sm:rounded-br-3xl opacity-50"></div>
        
        {/* Quote Icon */}
        <div className="absolute -top-4 sm:-top-6 left-6 sm:left-12 bg-green-500 rounded-full p-2 sm:p-3 md:p-4 shadow-lg">
          <QuoteIcon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
        </div>
        
        {/* Quote Text */}
        <div className="relative mt-4 sm:mt-6">
          <div className="absolute -left-2 sm:-left-4 md:-left-6 top-0 text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-black opacity-70 select-none leading-none" style={{fontFamily: "'Playfair Display', serif"}}>"</div>
          <blockquote className="relative z-10 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-800 leading-relaxed font-serif italic px-2 sm:px-4 md:px-8">
            {text}
          </blockquote>
          <div className="absolute -right-2 sm:-right-4 md:-right-6 bottom-0 text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-black opacity-70 select-none leading-none" style={{fontFamily: "'Playfair Display', serif"}}>"</div>
        </div>
        
        {/* Author Section */}
        <div className="mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-6 md:pt-8 border-t-2 border-teal-200 flex items-center justify-end gap-2 sm:gap-3 md:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:block h-0.5 sm:h-1 w-8 sm:w-12 md:w-16  rounded-full"></div>
            <div className="text-right">
              <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold font-serif text-gray-900">
                {author}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Stars */}
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 text-yellow-400 opacity-50 animate-pulse text-sm sm:text-base">
          <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-emerald-400 opacity-50 animate-pulse text-sm sm:text-base" style={{animationDelay: '0.5s'}}>
          <StarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>
    </div>
  )
}
