import React, { useEffect, useRef } from 'react'
import type { ChartData } from '../types/chat'

// 图表组件
const ChartComponent: React.FC<{ chartType: string; data: ChartData }> = ({ chartType, data }) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const echarts: any = (window as unknown as { echarts?: unknown }).echarts
    if (!echarts?.init) return
    const chart = echarts.init(ref.current)
    const option = {
      tooltip: { trigger: 'axis' },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: { type: 'category', data: data.labels },
      yAxis: { type: 'value' },
      series: [
        {
          type: chartType,
          data: data.datasets[0]?.data ?? [],
          smooth: true,
          lineStyle: { width: 3, color: '#3b82f6' },
          areaStyle: {
            color: {
              type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
                { offset: 1, color: 'rgba(59, 130, 246, 0.05)' },
              ],
            },
          },
          symbol: 'circle',
          symbolSize: 8,
        },
      ],
    }
    chart.setOption(option)
    const resize = () => chart.resize()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      chart.dispose()
    }
  }, [chartType, data])

  return <div ref={ref} className="h-[250px] w-full my-2" />
}

export default ChartComponent


