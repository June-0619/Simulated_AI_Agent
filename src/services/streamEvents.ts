import type { StreamEvent } from '../types/chat'

type DelayInput = number | ((index: number) => number)

/**
 * 以固定或自定义节奏依次回调事件，用于模拟流式分发。
 */
export const streamEvents = async (
  events: StreamEvent[],
  onEvent: (event: StreamEvent) => void,
  delay: DelayInput = 0
): Promise<void> => {
  for (let i = 0; i < events.length; i += 1) {
    const delayMs = typeof delay === 'number' ? delay : delay(i)
    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => setTimeout(resolve, Math.max(0, delayMs)))
    onEvent(events[i])
  }
}

export default streamEvents


