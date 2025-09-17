import type { ReactNode } from 'react'

export type EventType = 'text' | 'code_block' | 'chart'

export interface BaseEvent {
  type: EventType
}

export interface TextEvent extends BaseEvent {
  type: 'text'
  content: string
}

export interface CodeEvent extends BaseEvent {
  type: 'code_block'
  language: string
  code: string
}

export interface ChartData {
  labels: string[]
  datasets: { label: string; data: number[] }[]
}

export interface ChartEvent extends BaseEvent {
  type: 'chart'
  chartType: string
  data: ChartData
}

export type StreamEvent = TextEvent | CodeEvent | ChartEvent

export interface Message {
  id: number
  sender: 'user' | 'agent'
  // 宽松字段，兼容当前实现与后续扩展
  type: string
  content?: ReactNode
  language?: string
  code?: string
  data?: string
  chartType?: string
}


