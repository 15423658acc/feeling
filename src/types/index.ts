export interface Entry {
  id?: number
  createdAt: number
  mood: string
  weather: string
  weekday: string
  content: string
  tags: string[]
}

export interface Tag {
  id?: number
  name: string
  color: string
  isBuiltin?: boolean
  createdAt: number
}
