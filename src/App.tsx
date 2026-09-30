import { useEffect, useState } from 'react'
import { initBuiltinTags } from './db/database'
import RecordForm from './components/RecordForm'
import RecordList from './components/RecordList'
import TagManager from './components/TagManager'
import BackupBar from './components/BackupBar'

type View = 'form' | 'list' | 'tags'

function App() {
  const [view, setView] = useState<View>('form')

  useEffect(() => {
    initBuiltinTags()
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1>心声</h1>
        <p className="subtitle">记录当下的想法与心情</p>
      </header>
      <BackupBar />
      <nav className="tabs">
        <button className={view === 'form' ? 'active' : ''} onClick={() => setView('form')}>记录</button>
        <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}>回顾</button>
        <button className={view === 'tags' ? 'active' : ''} onClick={() => setView('tags')}>标签</button>
      </nav>
      <main className="content">
        {view === 'form' && <RecordForm />}
        {view === 'list' && <RecordList />}
        {view === 'tags' && <TagManager />}
      </main>
      <footer className="app-footer">数据仅存于本机 · 请定期导出备份</footer>
    </div>
  )
}

export default App
