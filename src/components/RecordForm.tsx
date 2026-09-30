import { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db/database'
import type { Entry } from '../types'

const MOODS = [
  { emoji: '😊', label: '开心' },
  { emoji: '😌', label: '满足' },
  { emoji: '😐', label: '平静' },
  { emoji: '😟', label: '烦恼' },
  { emoji: '😢', label: '低落' },
  { emoji: '😡', label: '愤怒' },
  { emoji: '😴', label: '疲倦' },
  { emoji: '🤔', label: '思考' }
]

const WEATHERS = [
  { emoji: '☀️', label: '晴' },
  { emoji: '⛅', label: '多云' },
  { emoji: '☁️', label: '阴' },
  { emoji: '🌧️', label: '雨' },
  { emoji: '⛈️', label: '雷雨' },
  { emoji: '❄️', label: '雪' },
  { emoji: '🌫️', label: '雾' },
  { emoji: '💨', label: '大风' }
]

function RecordForm() {
  const tags = useLiveQuery(() => db.tags.orderBy('id').toArray(), [])
  const [mood, setMood] = useState('')
  const [weather, setWeather] = useState('')
  const [content, setContent] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [flash, setFlash] = useState(false)

  const toggleTag = (name: string) => {
    setSelectedTags(prev =>
      prev.includes(name) ? prev.filter(t => t !== name) : [...prev, name]
    )
  }

  const canSubmit = content.trim().length > 0 || mood.length > 0

  const handleSubmit = async () => {
    if (!canSubmit) return
    const entry: Entry = {
      createdAt: Date.now(),
      mood,
      weather,
      content: content.trim(),
      tags: selectedTags
    }
    await db.entries.add(entry)
    setMood('')
    setWeather('')
    setContent('')
    setSelectedTags([])
    setFlash(true)
    setTimeout(() => setFlash(false), 1800)
  }

  return (
    <div className="form-wrap">
      {flash && <div className="flash">已记录 ✦</div>}

      <section className="field-group">
        <label className="field-label">心情</label>
        <div className="picker">
          {MOODS.map(m => (
            <button
              key={m.emoji}
              className={`chip ${mood === m.emoji ? 'selected' : ''}`}
              onClick={() => setMood(mood === m.emoji ? '' : m.emoji)}
            >
              <span className="emoji">{m.emoji}</span>
              <span className="chip-text">{m.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="field-group">
        <label className="field-label">天气</label>
        <div className="picker">
          {WEATHERS.map(w => (
            <button
              key={w.emoji}
              className={`chip ${weather === w.emoji ? 'selected' : ''}`}
              onClick={() => setWeather(weather === w.emoji ? '' : w.emoji)}
            >
              <span className="emoji">{w.emoji}</span>
              <span className="chip-text">{w.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="field-group">
        <label className="field-label">此刻的想法</label>
        <textarea
          className="content-input"
          placeholder="写下当下在想什么……"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={5}
        />
      </section>

      {tags && tags.length > 0 && (
        <section className="field-group">
          <label className="field-label">分组标签</label>
          <div className="picker">
            {tags.map(t => (
              <button
                key={t.id}
                className={`chip tag-chip ${selectedTags.includes(t.name) ? 'selected' : ''}`}
                style={{ '--tag-color': t.color } as any}
                onClick={() => toggleTag(t.name)}
              >
                <span className="dot" />
                {t.name}
              </button>
            ))}
          </div>
        </section>
      )}

      <button className="submit-btn" onClick={handleSubmit} disabled={!canSubmit}>
        记录此刻
      </button>
    </div>
  )
}

export default RecordForm
