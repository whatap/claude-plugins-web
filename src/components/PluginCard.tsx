import { Link } from 'react-router-dom'
import { Package, Tag } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { Plugin } from '@/data/types'

interface PluginCardProps {
  plugin: Plugin
}

export function PluginCard({ plugin }: PluginCardProps) {
  return (
    <Link to={`/plugin/${plugin.name}`}>
      <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50 cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">{plugin.name}</CardTitle>
                <p className="text-xs text-muted-foreground">v{plugin.version}</p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <CardDescription className="line-clamp-2">
            {plugin.description}
          </CardDescription>
          <div className="flex flex-wrap gap-1">
            {plugin.keywords.slice(0, 4).map((keyword) => (
              <Badge key={keyword} variant="secondary" className="text-xs">
                <Tag className="mr-1 h-3 w-3" />
                {keyword}
              </Badge>
            ))}
            {plugin.keywords.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{plugin.keywords.length - 4}
              </Badge>
            )}
          </div>
          {plugin.platform && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>지원:</span>
              {plugin.platform.map((p) => (
                <span key={p} className="rounded bg-muted px-1.5 py-0.5">
                  {p}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
