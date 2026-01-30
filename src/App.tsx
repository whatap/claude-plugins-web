import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/hooks/useTheme'
import { Header } from '@/components/Header'
import { Home } from '@/pages/Home'
import { PluginDetail } from '@/pages/PluginDetail'
import { Docs } from '@/pages/Docs'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename="/claude-plugins">
        <div className="min-h-screen bg-background">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/plugin/:name" element={<PluginDetail />} />
              <Route path="/docs" element={<Docs />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
