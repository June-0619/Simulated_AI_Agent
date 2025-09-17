import { useEffect, useState } from 'react'
import type { Message } from './types/chat'
import MessageView from './components/MessageView'
import ThinkingIndicator from './components/ThinkingIndicator'
import ChatHeader from './components/ChatHeader'
import ChatInput from './components/ChatInput'
import useAutoScroll from './hooks/useAutoScroll'
import simulateEventStream from './services/simulateEventStream'

 

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1, sender: 'agent', type: 'text', content: '您好！我是AI助手，我可以帮您编写代码、生成图表或回答各种问题。',
      code: '',
      chartType: '',
      language: undefined
    },
  ])
  const [inputText, setInputText] = useState<string>('')
  const [isThinking, setIsThinking] = useState<boolean>(false)
  const { endRef, trigger } = useAutoScroll<HTMLDivElement>()

  useEffect(() => { trigger() }, [messages])

  const sendMessage = async () => {
    if (!inputText.trim() || isThinking) return
    const userMessage: Message = {
      id: Date.now(), sender: 'user', type: 'text', content: inputText.trim(),
      code: '',
      chartType: '',
      language: undefined
    }
    setMessages((prev) => [...prev, userMessage])
    setInputText('')
    setIsThinking(true)
    // 模拟api调用和流式响应
    const eventStream = simulateEventStream(inputText.trim())
    for (let i = 0; i < eventStream.length; i += 1) {
      // 模拟 1-2 秒的分片流
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))
      const event = eventStream[i]
      // Avoid overwriting id and sender from event
      const { id: _ignoredId, sender: _ignoredSender, ...restEvent } = event as unknown as Message
      const newMessage: Message = { id: Date.now() + i + 1, sender: 'agent', ...restEvent }
      setMessages((prev) => [...prev, newMessage])
    }
    setIsThinking(false)
  }

  return (
    <div className="max-w-[1000px] mx-auto bg-white/80 rounded-xl shadow-2xl overflow-hidden">
      <ChatHeader />
      
      <div className="h-[500px] overflow-y-auto p-5 bg-slate-50">
        {messages.map((m) => (
          <MessageView key={m.id} message={m} />
        ))}
        {isThinking && (
          <div className="mr-auto">
            <ThinkingIndicator />
          </div>
        )}
        <div ref={endRef} />
      </div>

      <ChatInput value={inputText} disabled={isThinking} onChange={setInputText} onSend={sendMessage} />
    </div>
  )
}

export default App
