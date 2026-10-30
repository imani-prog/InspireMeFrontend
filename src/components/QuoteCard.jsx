import React from 'react'
import { QuoteIcon, SparklesIcon, StarIcon } from './Icons'

export default function QuoteCard({ quote, className = '' }) {
  if (!quote) return null

  const text = quote.q || quote.text || quote.quote || quote.body || ''
  const author = quote.a || quote.author || quote.by || 'Unknown'

  return (
    <div className={`quote-card-shell relative group ${className}`}>
      
      {/* Main Card */}
      <div className="quote-card transform transition-all duration-300 hover:-translate-y-0.5">
        {/* Quote Icon */}
        <div className="absolute top-5 left-6 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white shadow-md">
          <QuoteIcon className="h-4 w-4" />
        </div>
        
        {/* Quote Text */}
        <div className="relative mt-2 pl-12">
          <div className="quote-kicker">Daily perspective</div>
          <blockquote className="relative z-10 font-serif italic">
            {text}
          </blockquote>
        </div>
        
        {/* Author Section */}
        <div className="quote-footer pl-12">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="text-right">
              <div className="quote-author">
                {author}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Stars */}
        <div className="absolute top-6 right-7 text-blue-600 opacity-50 animate-pulse">
          <SparklesIcon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
        </div>
        <div className="absolute bottom-5 left-7 text-blue-600 opacity-50 animate-pulse" style={{animationDelay: '0.5s'}}>
          <StarIcon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
        </div>
      </div>
    </div>
  )
}
