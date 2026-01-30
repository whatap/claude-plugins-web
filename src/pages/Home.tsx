import { useState, useMemo } from 'react'
import { PluginCard } from '@/components/PluginCard'
import { SearchFilter } from '@/components/SearchFilter'
import { searchPlugins, plugins } from '@/data/plugins'

export function Home() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const filteredPlugins = useMemo(() => {
    return searchPlugins(query, category, selectedTags)
  }, [query, category, selectedTags])

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const handleClearFilters = () => {
    setQuery('')
    setCategory('all')
    setSelectedTags([])
  }

  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-8">
      {/* Hero Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          WhaTap Claude Plugins
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          WhaTap 내부에서 사용하는 Claude Code 플러그인을 탐색하고 설치하세요.
          생산성을 높이는 다양한 Hook, Command, MCP Server를 제공합니다.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 flex justify-center gap-8">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">{plugins.length}</div>
          <div className="text-sm text-muted-foreground">플러그인</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">
            {new Set(plugins.flatMap((p) => p.keywords)).size}
          </div>
          <div className="text-sm text-muted-foreground">태그</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">
            {new Set(plugins.map((p) => p.category)).size}
          </div>
          <div className="text-sm text-muted-foreground">카테고리</div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="mb-8">
        <SearchFilter
          query={query}
          category={category}
          selectedTags={selectedTags}
          onQueryChange={setQuery}
          onCategoryChange={setCategory}
          onTagToggle={handleTagToggle}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* Results */}
      <div className="mb-4 text-sm text-muted-foreground">
        {filteredPlugins.length}개의 플러그인
      </div>

      {/* Plugin Grid */}
      {filteredPlugins.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPlugins.map((plugin) => (
            <PluginCard key={plugin.name} plugin={plugin} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            검색 결과가 없습니다. 다른 키워드로 검색해보세요.
          </p>
        </div>
      )}
    </div>
  )
}
