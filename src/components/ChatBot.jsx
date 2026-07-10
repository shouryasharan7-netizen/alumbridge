import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react'
import { getChatbotResponse, getQuickSuggestions } from '../data/chatEngine'

function formatMessage(text) {
  let html = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="underline" style="color: var(--crimson)">$1</a>')
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-2 pl-3 my-1 italic" style="border-color: var(--orange); color: var(--muted-text)">$1</blockquote>')
    .replace(/\n/g, '<br/>')
  return html
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [hasWelcomed, setHasWelcomed] = useState(false)
  const [showBubble, setShowBubble] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(false), 5000)
    return () => clearTimeout(timer)
  }, [])
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus()
  }, [isOpen])

  const sendMessage = (text) => {
    if (!text.trim()) return
    const userMsg = { role: 'user', content: text.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)
    setTimeout(() => {
      const response = getChatbotResponse(text)
      setMessages(prev => [...prev, { role: 'bot', content: response }])
      setIsTyping(false)
    }, 800 + Math.random() * 1200)
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
        setMessages([{ role: 'bot', content: getChatbotResponse('hello') }])
        setIsTyping(false)
      }, 1000)
    }
  }

  const suggestions = getQuickSuggestions()

  return (
    <>
      {/* Floating button + bubble */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2">
          {showBubble && (
            <div className="relative max-w-[240px] border-2 p-3 animate-fade-in" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '3px 3px 0px 0px var(--border-color)' }}>
              <button onClick={() => setShowBubble(false)} className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center border-2 text-[10px] font-bold" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', color: 'var(--fg)' }}>✕</button>
              <p className="font-mono text-xs" style={{ color: 'var(--fg)' }}>Hey! Want to know about programs? 🚀</p>
            </div>
          )}
          <button
            onClick={handleOpen}
            className="w-12 h-12 flex items-center justify-center border-2 transition-all duration-150 hover:-translate-y-0.5"
            style={{ background: 'var(--orange)', borderColor: 'var(--border-color)', boxShadow: '3px 3px 0px 0px var(--border-color)', color: 'var(--fg)' }}
          >
            <Bot className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-4rem)] flex flex-col overflow-hidden border-2" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '4px 4px 0px 0px var(--border-color)' }}>
          {/* Header */}
          <div className="px-5 py-4 flex items-center justify-between flex-shrink-0 border-b-2" style={{ borderColor: 'var(--border-color)', background: 'var(--card-alt)' }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center border-2" style={{ borderColor: 'var(--border-color)', background: 'var(--card)' }}>
                <Bot className="w-5 h-5" style={{ color: 'var(--orange)' }} />
              </div>
              <div>
                <h3 className="font-display text-sm tracking-wide" style={{ color: 'var(--fg)' }}>ALUMBRIDGE AI</h3>
                <p className="font-mono text-[9px] font-bold uppercase tracking-wider flex items-center gap-1" style={{ color: 'var(--subtle-text)' }}>
                  <span className="w-1.5 h-1.5 animate-pulse" style={{ background: '#059669' }}></span>
                  TRAINED ON ALUMNI DATA
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center border-2 transition-all hover:-translate-y-0.5"
              style={{ borderColor: 'var(--border-color)', background: 'var(--card)', color: 'var(--fg)' }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" style={{ background: 'var(--bg)' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 border-2" style={{ borderColor: 'var(--border-color)', background: 'var(--card)' }}>
                  {msg.role === 'bot'
                    ? <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--orange)' }} />
                    : <User className="w-3.5 h-3.5" style={{ color: 'var(--fg)' }} />
                  }
                </div>
                <div className="max-w-[80%] border-2 px-4 py-2.5 text-xs leading-relaxed" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', color: 'var(--fg)', fontFamily: "'Norwester', Impact, 'Arial Narrow', sans-serif" }}>
                  {msg.role === 'bot' ? (
                    <div dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }} />
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 border-2" style={{ borderColor: 'var(--border-color)', background: 'var(--card)' }}>
                  <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--orange)' }} />
                </div>
                <div className="border-2 px-4 py-3" style={{ borderColor: 'var(--border-color)', background: 'var(--card)' }}>
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 animate-bounce" style={{ background: 'var(--muted-text)', animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 animate-bounce" style={{ background: 'var(--muted-text)', animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 animate-bounce" style={{ background: 'var(--muted-text)', animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}

            {messages.length <= 1 && !isTyping && (
              <div className="pt-2">
                <p className="font-mono text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--subtle-text)' }}>TRY ASKING:</p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="font-mono text-[10px] font-bold px-3 py-1.5 border-2 transition-all hover:-translate-y-0.5"
                      style={{ borderColor: 'var(--border-color)', background: 'var(--card)', color: 'var(--fg)' }}
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
          <form onSubmit={handleSubmit} className="flex-shrink-0 p-3 border-t-2" style={{ borderColor: 'var(--border-color)', background: 'var(--card)' }}>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about programs, placements..."
                className="brutal-input flex-1 text-xs"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 flex items-center justify-center border-2 transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: 'var(--orange)', borderColor: 'var(--border-color)', color: 'var(--fg)', boxShadow: '2px 2px 0px 0px var(--border-color)' }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="font-mono text-[8px] text-center mt-1.5" style={{ color: 'var(--subtle-text)' }}>
              POWERED BY 25+ VERIFIED ALUMNI ACROSS 6 COUNTRIES
            </p>
          </form>
        </div>
      )}
    </>
  )
}
