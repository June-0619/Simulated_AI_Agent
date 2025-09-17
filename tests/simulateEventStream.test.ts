import { describe, it, expect, vi } from 'vitest'
import simulateEventStream from '../src/services/simulateEventStream'
import { streamEvents } from '../src/services/streamEvents'

describe('simulateEventStream', () => {
  it('should return code events when prompt includes fibonacci', () => {
    const events = simulateEventStream('请生成 fibonacci')
    expect(events.length).toBeGreaterThan(0)
    expect(events.some((e) => e.type === 'code_block')).toBe(true)
  })

  it('should return chart events when prompt includes chart keywords', () => {
    const events = simulateEventStream('生成图表')
    const chart = events.find((e) => e.type === 'chart') as any
    expect(chart).toBeTruthy()
    expect(chart.chartType).toBe('line')
    expect(Array.isArray(chart.data.labels)).toBe(true)
  })
})

describe('streamEvents', () => {
  it('should call onEvent sequentially with fixed delay', async () => {
    vi.useFakeTimers()
    const events = simulateEventStream('hello')
    const onEvent = vi.fn()
    const p = streamEvents(events, onEvent, 100)
    // 推进所有定时器
    await vi.runAllTimersAsync()
    await p
    expect(onEvent).toHaveBeenCalledTimes(events.length)
    vi.useRealTimers()
  })

  it('should support dynamic delay per chunk', async () => {
    vi.useFakeTimers()
    const events = simulateEventStream('hello')
    const onEvent = vi.fn()
    const p = streamEvents(events, onEvent, (i) => i * 50)
    await vi.runAllTimersAsync()
    await p
    expect(onEvent).toHaveBeenCalledTimes(events.length)
    vi.useRealTimers()
  })
})


