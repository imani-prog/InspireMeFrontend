import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import QuoteCard from './QuoteCard'
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
  CheckIcon,
  ExplainIcon,
  MessageIcon,
  SendIcon
} from './Icons'

function Quote() {
  const navigate = useNavigate()
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [explanation, setExplanation] = useState(null)
  const [explainLoading, setExplainLoading] = useState(false)
  const [explainError, setExplainError] = useState(null)
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState([])
  const [chatLoading, setChatLoading] = useState(false)
  const [chatError, setChatError] = useState(null)

  const questionSuggestions = [
    { short: 'Apply daily?', full: 'How can I apply this in my daily routine?' },
    { short: 'Real-life example?', full: 'What is a real-life example of this quote?' },
    { short: 'Key lesson?', full: 'What lesson should I take from this?' },
  ]

  function formatAiText(text) {
    if (!text) return ''

    const normalized = text.replace(/\r\n/g, '\n').trim()
    const lines = normalized.split('\n').map((line) => line.trim()).filter(Boolean)
    const hasList = lines.some((line) => /^([-*+]|\d+[.)])\s+/.test(line))

    const withoutMarkdown = normalized
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/__(.*?)__/g, '$1')
      .replace(/`([^`]+)`/g, '$1')

    if (hasList) {
      const items = lines
        .map((line) => line.replace(/^([-*+]|\d+[.)])\s+/, '').trim())
        .map((line) => line
          .replace(/\*\*(.*?)\*\*/g, '$1')
          .replace(/__(.*?)__/g, '$1')
          .replace(/`([^`]+)`/g, '$1')
        )
        .filter(Boolean)
      return items.map((item, index) => `${index + 1}. ${item}`).join('\n')
    }

    return withoutMarkdown.replace(/\r?\n{3,}/g, '\n\n').trim()
  }

  function getNumberedItems(content) {
    if (!content) return null
    const lines = content.split('\n').map((line) => line.trim()).filter(Boolean)
    if (lines.length <= 1) return null
    if (!lines.every((line) => /^\d+\.\s+/.test(line))) return null
    return lines.map((line) => line.replace(/^\d+\.\s+/, '').trim()).filter(Boolean)
  }

  useEffect(() => {
    fetchQuote()
  }, [])

  async function fetchQuote() {
    setLoading(true)
    setError(null)
    setMessage(null)
    setExplanation(null)
    setExplainError(null)
    setChatInput('')
    setChatMessages([])
    setChatError(null)
    setChatLoading(false)
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

  async function handleExplain() {
    if (!quote) return
    setExplainLoading(true)
    setExplainError(null)
    setExplanation(null)

    const payload = {
      text: quote.q || quote.text || quote.quote,
      author: quote.a || quote.author || quote.by || 'Unknown',
    }

    if (!payload.text) {
      setExplainError('Quote text is missing')
      setExplainLoading(false)
      return
    }

    try {
      const data = await quoteService.explainQuote(payload)
      const result = data?.explanation || data?.result
      if (!result) {
        setExplainError('No explanation returned')
      } else {
        setExplanation(formatAiText(result))
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to explain quote'
      setExplainError(errorMsg)
    } finally {
      setExplainLoading(false)
    }
  }

  async function handleChatSend(e) {
    if (e) e.preventDefault()
    if (chatLoading || !quote) return

    const question = chatInput.trim()
    if (!question) return

    const payload = {
      text: quote.q || quote.text || quote.quote,
      author: quote.a || quote.author || quote.by || 'Unknown',
    }

    if (!payload.text) {
      setChatError('Quote text is missing')
      return
    }

    const history = chatMessages.slice(-5)

    setChatLoading(true)
    setChatError(null)
    setChatInput('')
    setChatMessages((s) => [...s, { role: 'user', content: question }])

    try {
      const data = await quoteService.chatAboutQuote({
        ...payload,
        question,
        history,
      })
      const answer = data?.answer || data?.response
      if (!answer) {
        setChatError('No response from the AI. Please try again.')
        return
      }
      setChatMessages((s) => [...s, { role: 'assistant', content: formatAiText(answer) }])
    } catch (err) {
      const status = err?.response?.status
      const errorMsg = status === 503
        ? 'AI service is unavailable. Please try again shortly.'
        : err?.response?.data?.message || err?.message || 'Failed to get AI response'
      setChatError(errorMsg)
    } finally {
      setChatLoading(false)
    }
  }

  function handleQuoteAdded() {
    setMessage('Quote created successfully!')
    setTimeout(() => setMessage(null), 3000)
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-900">
      {/* Animated Background Blobs */}
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        <div className="max-w-6xl mx-auto py-3 sm:py-5 md:py-8 px-3 sm:px-4 md:px-6 lg:px-0">
          {/* Header */}
          <header className="text-center mb-8 sm:mb-12 md:mb-16 animate-slideUp">
            <div className="sm:hidden flex flex-col items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5">
                <SparklesIcon className="w-4 h-4 text-white" />
                <span className="text-sm font-bold text-white">InspireMe</span>
              </div>
              <div className="h-0.5 w-20 bg-blue-400 rounded-full"></div>
            </div>

            <div className="hidden sm:block">
              <div className="inline-block relative">
                <div className="absolute -inset-1 rounded-lg blur opacity-75"></div>
                <div className="relative">
                  <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-2 sm:mb-3 md:mb-4 tracking-tight px-4 flex items-center justify-center gap-3 sm:gap-4" style={{fontFamily: "'Playfair Display', serif"}}>
                    <SparklesIcon className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-16 lg:h-16" />
                    InspireMe
                  </h1>
                  <div className="h-1 md:h-2 bg-blue-400 rounded-full"></div>
                </div>
              </div>
              <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-white mt-3 sm:mt-4 md:mt-6 font-medium tracking-wide px-4 flex items-center justify-center gap-2 sm:gap-3">
                <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                Your Daily Dose of Wisdom & Motivation
                <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </p>
            </div>
          </header>

          {/* Main Content */}
          <main className="space-y-4 sm:space-y-6 md:space-y-8">
            {/* Quote Display */}
            <div className="animate-fadeIn">
              {loading && (
                <div className="text-center py-12 sm:py-16 md:py-20">
                  <div className="inline-flex flex-col items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 border-6 sm:border-8 border-blue-500 border-t-white rounded-full animate-spin"></div>
                      <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 border-6 sm:border-8 border-transparent border-b-blue-500 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
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

            {(explainLoading || explainError || explanation) && (
              <div className="max-w-md sm:max-w-4xl mx-auto px-3 sm:px-4 animate-fadeIn">
                <div className="relative bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl p-3 sm:p-5 md:p-6 lg:p-8 border border-white/20">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="bg-blue-500 rounded-full p-1.5 sm:p-2">
                      <ExplainIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <h3 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900" style={{fontFamily: "'Playfair Display', serif"}}>
                      Explanation
                    </h3>
                  </div>

                  {explainLoading && (
                    <div className="flex items-center gap-3 text-gray-700 font-medium text-xs sm:text-sm md:text-base">
                      <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      Generating explanation...
                    </div>
                  )}

                  {explainError && (
                    <div className="flex items-start gap-2 text-red-700 font-medium text-xs sm:text-sm md:text-base">
                      <AlertIcon className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5" />
                      <span>{explainError}</span>
                    </div>
                  )}

                  {explanation && (() => {
                    const items = getNumberedItems(explanation)
                    if (items) {
                      return (
                        <ol className="list-decimal list-outside pl-5 space-y-1 text-gray-800 text-xs sm:text-sm md:text-base leading-relaxed">
                          {items.map((item, index) => (
                            <li key={`${item}-${index}`}>{item}</li>
                          ))}
                        </ol>
                      )
                    }
                    return (
                      <p className="text-gray-800 text-xs sm:text-sm md:text-base leading-relaxed whitespace-pre-line">
                        {explanation}
                      </p>
                    )
                  })()}
                </div>
              </div>
            )}

            {quote && (
              <div className="max-w-md sm:max-w-4xl mx-auto px-3 sm:px-4 animate-fadeIn">
                <div className="relative bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl p-3 sm:p-5 md:p-6 lg:p-8 border border-white/20">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div className="bg-blue-500 rounded-full p-1.5 sm:p-2">
                      <MessageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <h3 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900" style={{fontFamily: "'Playfair Display', serif"}}>
                      Ask AI
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-3 sm:mb-4">
                    Ask a focused question about the quote for practical guidance.
                  </p>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {questionSuggestions.map((suggestion) => (
                      <button
                        key={suggestion.full}
                        type="button"
                        onClick={() => setChatInput(suggestion.full)}
                        className="px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-semibold rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                      >
                        <span className="sm:hidden">{suggestion.short}</span>
                        <span className="hidden sm:inline">{suggestion.full}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 sm:gap-3 max-h-40 sm:max-h-64 overflow-y-auto pr-1">
                    {chatMessages.length === 0 && !chatLoading && (
                      <p className="text-xs sm:text-sm text-gray-500">No questions yet. Start the conversation below.</p>
                    )}

                    {chatMessages.map((msg, index) => {
                      const items = getNumberedItems(msg.content)
                      return (
                        <div
                          key={`${msg.role}-${index}`}
                          className={`max-w-[85%] rounded-xl px-3 py-2 text-xs sm:text-sm leading-relaxed ${msg.role === 'user'
                            ? 'self-end bg-blue-500 text-white'
                            : 'self-start bg-slate-100 text-gray-800'
                          }`}
                        >
                          {items ? (
                            <ol className="list-decimal list-outside pl-5 space-y-1">
                              {items.map((item, itemIndex) => (
                                <li key={`${item}-${itemIndex}`}>{item}</li>
                              ))}
                            </ol>
                          ) : (
                            <p className="whitespace-pre-line">{msg.content}</p>
                          )}
                        </div>
                      )
                    })}

                    {chatLoading && (
                      <div className="max-w-[85%] self-start bg-slate-100 text-gray-800 rounded-xl px-3 py-2">
                        <div className="flex items-center gap-2 text-xs sm:text-sm">
                          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                          Thinking...
                        </div>
                      </div>
                    )}
                  </div>

                  {chatError && (
                    <div className="mt-3 flex items-start gap-2 text-red-700 text-xs sm:text-sm font-medium">
                        <AlertIcon className="w-4 h-4 mt-0.5" />
                      <span>{chatError}</span>
                    </div>
                  )}

                    <form onSubmit={handleChatSend} className="mt-4 flex flex-row gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask a question about this quote..."
                        className="flex-1 w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-xs sm:text-sm text-gray-800"
                      disabled={chatLoading || !quote}
                    />
                    <button
                      type="submit"
                      disabled={chatLoading || !quote || !chatInput.trim()}
                        className="px-3 py-2 sm:px-4 sm:py-2.5 bg-blue-500 text-white font-bold rounded-lg sm:rounded-xl hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        <span className="flex items-center justify-center gap-2">
                          <SendIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span className="hidden sm:inline">{chatLoading ? 'Sending...' : 'Send'}</span>
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 justify-center items-stretch sm:items-center">
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3 w-full max-w-xs sm:max-w-xl lg:max-w-5xl mx-auto">
                <button
                  onClick={fetchQuote}
                  disabled={loading}
                  className="px-3 py-2 sm:px-5 sm:py-2.5 md:px-8 md:py-3 bg-blue-500 text-white font-bold text-xs sm:text-sm md:text-base rounded-lg sm:rounded-xl hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
                >
                  <span className="flex items-center justify-center gap-2 sm:gap-3">
                    <RefreshIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>New Quote</span>
                  </span>
                </button>

                <button
                  onClick={handleSave}
                  disabled={loading || !quote}
                  className="px-3 py-2 sm:px-5 sm:py-2.5 md:px-8 md:py-3 bg-blue-500 text-white font-bold text-xs sm:text-sm md:text-base rounded-lg sm:rounded-xl hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
                >
                  <span className="flex items-center justify-center gap-2 sm:gap-3">
                    <SaveIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Save Quote</span>
                  </span>
                </button>

                <button
                  onClick={() => setAddModalOpen(true)}
                  className="px-3 py-2 sm:px-5 sm:py-2.5 md:px-8 md:py-3 bg-blue-500 text-white font-bold text-xs sm:text-sm md:text-base rounded-lg sm:rounded-xl hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
                >
                  <span className="flex items-center justify-center gap-2 sm:gap-3">
                    <PenIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Create Quote</span>
                  </span>
                </button>

                <button
                  onClick={handleExplain}
                  disabled={loading || explainLoading || !quote}
                  className="px-3 py-2 sm:px-5 sm:py-2.5 md:px-8 md:py-3 bg-blue-500 text-white font-bold text-xs sm:text-sm md:text-base rounded-lg sm:rounded-xl hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
                >
                  <span className="flex items-center justify-center gap-2 sm:gap-3">
                    <ExplainIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{explainLoading ? 'Explaining...' : 'Explain Quote'}</span>
                  </span>
                </button>

                <button
                  onClick={() => navigate('/saved')}
                  className="col-span-2 lg:col-span-1 px-3 py-2 sm:px-5 sm:py-2.5 md:px-8 md:py-3 bg-blue-500 text-white font-bold text-xs sm:text-sm md:text-base rounded-lg sm:rounded-xl hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
                >
                  <span className="flex items-center justify-center gap-2 sm:gap-3">
                    <BookIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>View Saved</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Success Message */}
            {message && (
              <div className="text-center animate-slideUp px-4">
                <div className="inline-flex items-center gap-2 sm:gap-3 bg-blue-500 backdrop-blur-lg border border-blue-300/50 px-3 py-2 sm:px-5 sm:py-2.5 md:px-8 md:py-3 rounded-lg sm:rounded-xl shadow-lg">
                  <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 animate-bounce text-white" />
                  <span className="text-white font-bold text-xs sm:text-sm md:text-base">{message}</span>
                </div>
              </div>
            )}
          </main>

          {/* Footer */}
          <footer className="text-center mt-12 sm:mt-16 md:mt-20 pb-4 sm:pb-6 md:pb-8">
            <p className="text-white text-xs sm:text-sm font-bold px-4 flex items-center justify-center gap-2">
              Made with <HeartIcon className="w-4 h-4 text-blue-400 animate-pulse fill-blue-400" /> for inspiration seekers worldwide
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
