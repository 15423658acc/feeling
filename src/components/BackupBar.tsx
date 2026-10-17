import { useRef } from 'react'
import { db } from '../db/database'
import type { Entry, Tag } from '../types'

interface BackupData {
  version: number
  exportedAt: number
  entries: Entry[]
  tags: Tag[]
}

function BackupBar() {
  const fileRef = useRef<HTMLInputElement>(null)

  const handleExport = async () => {
    const [entries, tags] = await Promise.all([
      db.entries.toArray(),
      db.tags.toArray()
    ])
    const data: BackupData = {
      version: 1,
      exportedAt: Date.now(),
      entries,
      tags
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `feeling-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = async (file: File) => {
    try {
      const text = await file.text()
      const data = JSON.parse(text) as BackupData
      if (!Array.isArray(data.entries)) return
      await db.transaction('rw', db.entries, db.tags, async () => {
        await db.entries.clear()
        await db.tags.clear()
        if (data.tags?.length) await db.tags.bulkAdd(data.tags)
        if (data.entries.length) await db.entries.bulkAdd(data.entries)
      })
    } catch {
      // 文件格式不合法，忽略
    }
  }

  return (
    <div className="backup-bar">
      <button className="backup-btn backup-export" onClick={handleExport}>
        <span className="backup-icon">⬇</span>
        <span className="backup-label">导出备份</span>
      </button>
      <button className="backup-btn backup-import" onClick={() => fileRef.current?.click()}>
        <span className="backup-icon">⬆</span>
        <span className="backup-label">导入备份</span>
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="application/json"
        style={{ display: 'none' }}
        onChange={e => {
          const f = e.target.files?.[0]
          if (f) handleImport(f)
          e.target.value = ''
        }}
      />
    </div>
  )
}

export default BackupBar
