import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db/database'

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
      {entries.map(e => (
        <article key={e.id} className="entry-card">
          <div className="entry-meta">
            <span className="entry-time">{formatTime(e.createdAt)}</span>
            {(e.mood || e.weather) && (
              <span className="entry-icons">
                {e.mood && <span className="big-emoji">{e.mood}</span>}
                {e.weather && <span className="big-emoji">{e.weather}</span>}
              </span>
            )}
          </div>
          {e.content && <p className="entry-content">{e.content}</p>}
          {e.tags.length > 0 && (
            <div className="entry-tags">
              {e.tags.map(t => (
                <span key={t} className="tag-pill">{t}</span>
              ))}
            </div>
          )}
        </article>
      ))}
    </div>
  )
}

export default RecordList
