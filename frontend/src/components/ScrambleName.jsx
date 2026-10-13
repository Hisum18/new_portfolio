import { useEffect, useRef } from 'react'

const CHARS = '!<>-_\\/[]{}=+*^?#%$&·:;'

class Scrambler {
  constructor(el) {
    this.el = el
    this.update = this.update.bind(this)
  }

  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 35)
      const end = start + 28 + Math.floor(Math.random() * 45)
      this.queue.push({ from, to, start, end, char: null })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
  }

  update() {
    let output = ''
    let complete = 0
    for (let i = 0; i < this.queue.length; i++) {
      const q = this.queue[i]
      if (this.frame >= q.end) {
        complete++
        output += q.to
      } else if (this.frame >= q.start) {
        if (!q.char || Math.random() < 0.28) {
          q.char = CHARS[Math.floor(Math.random() * CHARS.length)]
        }
        output += `<span class="scramble-dud">${q.char}</span>`
      } else {
        output += q.from
      }
    }
    this.el.innerHTML = output
    if (complete !== this.queue.length) {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
}

export default function ScrambleName({ lines, className = '', lineClassName = '', startDelay = 0 }) {
  const refs = useRef([])
  const scramblers = useRef([])

  useEffect(() => {
    scramblers.current = refs.current.map((el) => new Scrambler(el))
    const timers = scramblers.current.map((s, i) =>
      setTimeout(() => s.setText(lines[i]), startDelay + i * 280)
    )
    return () => {
      timers.forEach(clearTimeout)
      scramblers.current.forEach((s) => cancelAnimationFrame(s.frameRequest))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const scrambleAll = () =>
    scramblers.current.forEach((s, i) => s.setText(lines[i]))

  return (
    <span
      className={`cursor-default ${className}`}
      onMouseEnter={scrambleAll}
      aria-label={lines.join(' ')}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          ref={(el) => (refs.current[i] = el)}
          className={lineClassName}
          aria-hidden="true"
        />
      ))}
    </span>
  )
}
