import React from 'react'
import type { Message } from '../types/chat'
import CodeBlock from './CodeBlock'
import ChartComponent from './ChartComponent'

// 消息视图组件
const MessageView: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <div className={`mb-5 max-w-[80%] ${message.sender === 'user' ? 'ml-auto' : 'mr-auto'}`}>
      <div className="text-xs font-semibold mb-1 px-2">{message.sender === 'user' ? '您' : 'AI助手'}</div>
      <div className={`rounded-2xl shadow ${message.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-white text-slate-800 rounded-tl-sm'} px-4 py-3`}>
        {message.type === 'text' && <p>{message.content}</p>}
        {message.type === 'code_block' && (
          <CodeBlock language={message.language} code={message.code ?? ''} />
        )}
        {message.type === 'chart' &&
          message.data &&
          typeof message.data === 'object' &&
          message.data !== null &&
          Array.isArray((message.data as any).labels) &&
          Array.isArray((message.data as any).datasets) &&
          message.chartType && (
            <ChartComponent
              chartType={message.chartType}
              data={{
                labels: ((message.data as any).labels ?? []).map(String),
                datasets: (
                  ((message.data as any).datasets ?? [])
                ).filter(
                  (ds: unknown): ds is { label: string; data: number[] } =>
                    typeof ds === 'object' &&
                    ds !== null &&
                    'label' in ds &&
                    typeof (ds as any).label === 'string' &&
                    'data' in ds &&
                    Array.isArray((ds as any).data) &&
                    (ds as any).data.every((n: any) => typeof n === 'number')
                )
              }}
            />
        )}
      </div>
    </div>
  )
}

export default MessageView


