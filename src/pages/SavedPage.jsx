import React from 'react'
import { useNavigate } from 'react-router-dom'
import SavedQuotesList from '../components/SavedQuotesList'
import { SparklesIcon } from '../components/Icons'

export default function SavedPage() {
  const navigate = useNavigate()

  const handleClose = () => {
    navigate('/', { replace: true })
  }

  return (
    <div className="app-shell min-h-screen relative overflow-hidden">
      <div className="relative z-10 min-h-screen">
        <div className="page-container">
          {/* Header */}
          <header className="brand-header animate-slideUp">
            <div className="brand-lockup">
              <div className="brand-mark"><SparklesIcon className="w-5 h-5" /></div>
              <div>
                <h1 className="brand-name">InspireMe</h1>
                <p className="brand-tagline">Your daily dose of wisdom & motivation</p>
              </div>
            </div>
          </header>

          {/* Saved Quotes List */}
          <SavedQuotesList onClose={handleClose} />
        </div>
      </div>
    </div>
  )
}
