import { useEffect, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db/database'
import type { Entry } from '../types'

// 心情 emoji → 可爱文字
const MOOD_TEXT: Record<string, string> = {
  '😊': '开心',
  '😌': '满足',
  '😐': '平静',
  '😟': '烦恼',
  '😢': '低落',
  '😡': '愤怒',
  '😴': '疲倦',
  '🤔': '思考'
}

// 天气 emoji → 可爱文字
const WEATHER_TEXT: Record<string, string> = {
  '☀️': '晴天',
  '⛅': '多云',
  '☁️': '阴天',
  '🌧️': '雨天',
  '⛈️': '雷雨',
  '❄️': '雪天',
  '🌫️': '雾天',
  '💨': '大风'
}

function moodText(e: Entry) {
  return e.mood ? MOOD_TEXT[e.mood] || e.mood : ''
}
function weatherText(e: Entry) {
  return e.weather ? WEATHER_TEXT[e.weather] || e.weather : ''
}

function formatTime(ts: number) {
  const d = new Date(ts)
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function RecordList() {
  const entries = useLiveQuery(
    () => db.entries.orderBy('createdAt').reverse().toArray(),
    []
  )

  const [activeId, setActiveId] = useState<number | null>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const active = entries?.find(e => e.id === activeId) || null

  // 切换弹窗时重置「确认删除」状态
  useEffect(() => {
    setConfirmDelete(false)
  }, [activeId])

  // ESC 关闭弹窗
  useEffect(() => {
    if (activeId === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeId])

  const handleDelete = async () => {
    if (!active?.id) return
    await db.entries.delete(active.id)
    setActiveId(null)
  }

  if (entries === undefined) return <div className="empty">加载中…</div>
  if (entries.length === 0) {
    return (
      <div className="empty">
        <div className="empty-emoji">🌱</div>
        <p>还没有记录，记下第一刻吧。</p>
      </div>
    )
  }

  return (
    <div className="list-wrap">
      {entries.map(e => {
        const tags = []
        const mt = moodText(e)
        const wt = weatherText(e)
        if (mt) tags.push(<span key="mood" className="entry-tag mood-tag">{mt}</span>)
        if (wt) tags.push(<span key="weather" className="entry-tag weather-tag">{wt}</span>)
        if (e.weekday) tags.push(<span key="weekday" className="entry-tag weekday-tag">{e.weekday}</span>)
        if (e.tags.length > 0) tags.push(<span key="tagscount" className="entry-tag count-tag">{e.tags.length}个标签</span>)

        return (
          <article
            key={e.id}
            className="entry-card"
            onClick={() => setActiveId(e.id!)}
          >
            <div className="entry-head">
              <span className="entry-time">{formatTime(e.createdAt)}</span>
              <span className="entry-chev">›</span>
            </div>
            {e.content
              ? <p className="entry-preview">{e.content}</p>
              : <p className="entry-preview entry-preview-dim">（仅心情记录，点开查看详情）</p>}
            {tags.length > 0 && <div className="entry-tags-row">{tags}</div>}
          </article>
        )
      })}

      {active && (
        <div className="modal-mask" onClick={() => setActiveId(null)}>
          <div className="modal-card" onClick={ev => ev.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveId(null)} aria-label="关闭">×</button>

            <div className="modal-time">{formatTime(active.createdAt)}</div>

            <div className="modal-tags">
              {moodText(active) && <span className="entry-tag mood-tag">{moodText(active)}</span>}
              {weatherText(active) && <span className="entry-tag weather-tag">{weatherText(active)}</span>}
              {active.weekday && <span className="entry-tag weekday-tag">{active.weekday}</span>}
            </div>

            {active.content
              ? <p className="modal-content">{active.content}</p>
              : <p className="modal-content modal-content-dim">（无文字记录）</p>}

            {active.tags.length > 0 && (
              <div className="modal-tag-list">
                {active.tags.map(t => (
                  <span key={t} className="tag-pill">{t}</span>
                ))}
              </div>
            )}

            <div className="modal-actions">
              {!confirmDelete ? (
                <button className="modal-delete" onClick={() => setConfirmDelete(true)}>删除</button>
              ) : (
                <button className="modal-delete modal-delete-confirm" onClick={handleDelete}>确认删除？</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RecordList
