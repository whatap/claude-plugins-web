import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { CATEGORIES, TAGS } from '@/data/types'

interface SearchFilterProps {
  query: string
  category: string
  selectedTags: string[]
  onQueryChange: (query: string) => void
  onCategoryChange: (category: string) => void
  onTagToggle: (tag: string) => void
  onClearFilters: () => void
}

export function SearchFilter({
  query,
  category,
  selectedTags,
  onQueryChange,
  onCategoryChange,
  onTagToggle,
  onClearFilters,
}: SearchFilterProps) {
  const hasFilters = query || category !== 'all' || selectedTags.length > 0

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="플러그인 검색..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat.value}
            variant={category === cat.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange(cat.value)}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Tags Filter */}
      <div className="flex flex-wrap gap-2">
        {TAGS.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? 'default' : 'outline'}
            className="cursor-pointer transition-colors"
            onClick={() => onTagToggle(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* Clear Filters */}
      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-muted-foreground"
        >
          <X className="mr-1 h-4 w-4" />
          필터 초기화
        </Button>
      )}
    </div>
  )
}
