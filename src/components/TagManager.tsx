import { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db/database'
import type { Tag } from '../types'

const PALETTE = ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#ef4444', '#14b8a6', '#f97316']

function TagManager() {
  const tags = useLiveQuery(() => db.tags.orderBy('id').toArray(), [])
  const [name, setName] = useState('')
  const [color, setColor] = useState(PALETTE[0])

  const addTag = async () => {
    const trimmed = name.trim()
    if (!trimmed) return
    const exists = await db.tags.where('name').equals(trimmed).count()
    if (exists > 0) {
      setName('')
      return
    }
    await db.tags.add({
      name: trimmed,
      color,
      isBuiltin: false,
      createdAt: Date.now()
    })
    setName('')
    setColor(PALETTE[0])
  }

  const removeTag = async (tag: Tag) => {
    if (tag.isBuiltin) return
    await db.tags.delete(tag.id!)
  }

  return (
    <div className="tag-wrap">
      <section className="add-tag">
        <input
          className="tag-input"
          placeholder="新标签名，如：旅行、读书"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTag()}
        />
        <div className="palette">
          {PALETTE.map(c => (
            <button
              key={c}
              className={`swatch ${color === c ? 'active' : ''}`}
              style={{ background: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
        <button className="add-btn" onClick={addTag} disabled={!name.trim()}>
          添加标签
        </button>
      </section>

      <div className="tag-list">
        {tags?.map(t => (
          <div key={t.id} className="tag-row">
            <span className="dot" style={{ background: t.color }} />
            <span className="tag-name">{t.name}</span>
            {t.isBuiltin ? (
              <span className="badge">内置</span>
            ) : (
              <button className="del-btn" onClick={() => removeTag(t)}>删除</button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TagManager
