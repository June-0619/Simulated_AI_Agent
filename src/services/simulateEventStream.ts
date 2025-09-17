import type { StreamEvent } from '../types/chat'

const simulateEventStream = (prompt: string): StreamEvent[] => {
  const p = prompt.toLowerCase()
  if (p.includes('斐波那契') || p.includes('fibonacci')) {
    return [
      { type: 'text', content: '好的，这是一个经典的算法问题。' },
      { type: 'text', content: '（正在生成代码...）' },
      {
        type: 'code_block',
        language: 'python',
        code:
          'def fibonacci(n):\n        a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b\n\n',
      },
      { type: 'text', content: '任务完成。' },
    ]
  }
  if (p.includes('图表')  || p.includes('chart')) {
    return [
      { type: 'text', content: '好的，我将为您生成数据图表。' },
      { type: 'text', content: '正在分析数据...' },
      {
        type: 'chart',
        chartType: 'line',
        data: {
          labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月'],
          datasets: [{ label: '销售额', data: [120, 150, 180, 130, 200, 170, 220, 190, 250, 280] }],
        },
      },
      { type: 'text', content: '这是过去10个月的销售趋势图，可以看出整体呈上升趋势。' },
      { type: 'text', content: '任务完成。' },
    ]
  }
  return [
    { type: 'text', content: '您好！我是AI助手，很高兴为您服务。' },
    { type: 'text', content: '我可以帮助您编写代码、生成图表或回答各种问题。' },
    { type: 'text', content: '请告诉我您需要什么帮助？' },
  ]
}

export default simulateEventStream


