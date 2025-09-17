import React from 'react'

// ai思考指示器组件
const ThinkingIndicator: React.FC = () => (
  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl mt-2 shadow w-fit">
    <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
    <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse [animation-delay:0.2s]"></span>
    <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse [animation-delay:0.4s]"></span>
    <span className="text-sm text-slate-600">AI正在思考中</span>
  </div>
)

export default ThinkingIndicator


