import React, { useMemo } from 'react'

// 代码块组件
const CodeBlock: React.FC<{ language?: string; code: string }> = ({ language, code }) => {
  const highlighted = useMemo(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const hljs: any = (window as unknown as { hljs?: unknown }).hljs
      if (hljs?.highlightAuto) {
        return hljs.highlightAuto(code).value as string
      }
    } catch {}
    return code
  }, [code])

  const copyCode = async () => {
    try {
      await navigator.clipboard?.writeText(code)
      alert('代码已复制到剪贴板！')
    } catch {
      alert('复制失败，请手动复制')
    }
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden my-2 border border-slate-200">
      <div className="flex items-center justify-between text-sm px-3 py-2 bg-slate-100 text-slate-700">
        <span>{language ?? 'code'}</span>
        <button onClick={copyCode} className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
          <i className="fas fa-copy" /> 复制
        </button>
      </div>
      <pre className="p-3 overflow-auto">
        <code className="hljs" dangerouslySetInnerHTML={{ __html: highlighted }} />
      </pre>
    </div>
  )
}

export default CodeBlock


