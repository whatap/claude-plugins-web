import { Link } from 'react-router-dom'
import { Moon, Sun, Palette, Github } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useTheme } from '@/hooks/useTheme'

const colorThemes = [
  { value: 'default', label: '기본', color: '#171717' },
  { value: 'whatap', label: 'WhaTap', color: '#4285f4' },
  { value: 'green', label: 'Green', color: '#22c55e' },
  { value: 'purple', label: 'Purple', color: '#a855f7' },
] as const

export function Header() {
  const { theme, colorTheme, setTheme, setColorTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-xl items-center px-4">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">🔌 WhaTap Plugins</span>
        </Link>

        <nav className="ml-6 flex items-center space-x-4 text-sm font-medium">
          <Link
            to="/"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            플러그인
          </Link>
          <Link
            to="/docs"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            문서
          </Link>
        </nav>

        <div className="ml-auto flex items-center space-x-2">
          {/*
            Color Theme Selector - 현재 플러그인이 1개뿐이라 테마 변경 기능이 의미 없어서 숨김 처리
            추후 필요시 아래 주석 해제하여 사용
          */}
          {/* <div className="relative group">
            <Button variant="ghost" size="icon" className="relative">
              <Palette className="h-4 w-4" />
            </Button>
            <div className="absolute right-0 top-full mt-2 hidden group-hover:block z-50">
              <div className="rounded-lg border bg-popover p-2 shadow-md min-w-[120px]">
                <div className="flex flex-col gap-1">
                  {colorThemes.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setColorTheme(t.value as typeof colorTheme)}
                      className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm whitespace-nowrap hover:bg-accent ${
                        colorTheme === t.value ? 'bg-accent' : ''
                      }`}
                    >
                      <span
                        className="h-3 w-3 rounded-full shrink-0"
                        style={{ backgroundColor: t.color }}
                      />
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div> */}

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {/* GitHub Link */}
          <a
            href="https://github.com/whatap/claude-plugins"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-9 w-9 rounded-md hover:bg-accent hover:text-accent-foreground"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  )
}
