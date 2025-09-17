import React from 'react'

// 聊天输入组件
const ChatInput: React.FC<{
  value: string
  disabled: boolean
  onChange: (v: string) => void
  onSend: () => void
}> = ({ value, disabled, onChange, onSend }) => {
  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div className="flex gap-2 p-5 bg-white border-t border-slate-200">
      <input
        type="text"
        placeholder="输入您的问题..."
        className="flex-1 px-4 py-3 border border-slate-300 rounded-full outline-none focus:border-blue-600"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        disabled={disabled}
      />
      <button
        onClick={onSend}
        disabled={!value.trim() || disabled}
        className="px-5 py-3 rounded-full text-white font-medium disabled:bg-slate-300 bg-blue-600 hover:bg-blue-700 transition flex items-center gap-2"
      >
        <i className="fas fa-paper-plane" /> 发送
      </button>
    </div>
  )
}

export default ChatInput


