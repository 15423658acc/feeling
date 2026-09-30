import Dexie, { type Table } from 'dexie'
import type { Entry, Tag } from '../types'

export class FeelingDB extends Dexie {
  entries!: Table<Entry, number>
  tags!: Table<Tag, number>

  constructor() {
    super('FeelingDB')
    this.version(1).stores({
      entries: '++id, createdAt, mood, *tags',
      tags: '++id, &name'
    })
  }
}

export const db = new FeelingDB()

const BUILTIN_TAGS: Omit<Tag, 'id'>[] = [
  { name: '工作', color: '#3b82f6', isBuiltin: true, createdAt: 0 },
  { name: '生活', color: '#10b981', isBuiltin: true, createdAt: 0 },
  { name: '家人', color: '#f59e0b', isBuiltin: true, createdAt: 0 },
  { name: '朋友', color: '#ec4899', isBuiltin: true, createdAt: 0 }
]

export async function initBuiltinTags() {
  const count = await db.tags.count()
  if (count === 0) {
    await db.tags.bulkAdd(BUILTIN_TAGS)
  }
}
