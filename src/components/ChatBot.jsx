import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react'
import { getChatbotResponse, getQuickSuggestions } from '../data/chatEngine'

function formatMessage(text) {
  let html = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-crimson-600 underline hover:text-crimson-700">$1</a>')
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-3 border-gold-400 pl-3 my-1 text-primary-500 italic">$1</blockquote>')
    .replace(/\n/g, '<br/>')
  return html
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [hasWelcomed, setHasWelcomed] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const sendMessage = (text) => {
    if (!text.trim()) return
    const userMsg = { role: 'user', content: text.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)
    const thinkTime = 800 + Math.random() * 1200
    setTimeout(() => {
      const response = getChatbotResponse(text)
      const botMsg = { role: 'bot', content: response }
      setMessages(prev => [...prev, botMsg])
      setIsTyping(false)
    }, thinkTime)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleOpen = () => {
    setIsOpen(true)
    if (!hasWelcomed) {
      setHasWelcomed(true)
      setIsTyping(true)
      setTimeout(() => {
        const welcome = getChatbotResponse('hello')
        setMessages([{ role: 'bot', content: welcome }])
        setIsTyping(false)
      }, 1000)
    }
  }

  const suggestions = getQuickSuggestions()

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-primary-600 to-crimson-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center group"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute inset-0 rounded-full bg-crimson-400 animate-ping opacity-20"></span>
          <span className="absolute bottom-full mb-2 right-0 bg-primary-700 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-lg">
            Ask AlumBridge AI ✨
          </span>
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-4rem)] bg-white rounded-2xl shadow-2xl border border-primary-100 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-crimson-700 px-5 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center ring-1 ring-white/20">
                <Bot className="w-5 h-5 text-gold-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm font-display">AlumBridge AI</h3>
                <p className="text-primary-200 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  Trained on alumni insights
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-cream/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'bot'
                    ? 'bg-gradient-to-br from-primary-600 to-crimson-600'
                    : 'bg-primary-200'
                }`}>
                  {msg.role === 'bot'
                    ? <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                    : <User className="w-3.5 h-3.5 text-primary-600" />
                  }
                </div>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === 'bot'
                    ? 'bg-white border border-primary-100/50 text-primary-700 shadow-sm'
                    : 'bg-primary-600 text-white'
                }`}>
                  {msg.role === 'bot' ? (
                    <div dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }} />
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-600 to-crimson-600 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                </div>
                <div className="bg-white border border-primary-100/50 rounded-2xl px-4 py-3 shadow-sm">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-primary-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-primary-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-primary-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick suggestions */}
            {messages.length <= 1 && !isTyping && (
              <div className="pt-2">
                <p className="text-xs text-primary-400 mb-2 px-1 font-medium">Try asking:</p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="text-xs bg-white border border-primary-100/50 text-primary-600 px-3 py-1.5 rounded-full hover:bg-gold-50 hover:border-gold-300 hover:text-primary-700 transition font-medium"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex-shrink-0 border-t border-primary-100/50 p-3 bg-white">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about programs, placements, exams..."
                className="flex-1 border border-primary-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-crimson-500 focus:border-transparent text-primary-700 placeholder:text-primary-300"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 bg-primary-600 text-white rounded-xl flex items-center justify-center hover:bg-crimson-600 disabled:opacity-40 disabled:cursor-not-allowed transition flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-primary-400 mt-1.5 text-center">
              Powered by insights from 25+ verified alumni across 6 countries
            </p>
          </form>
        </div>
      )}
    </>
  )
}
