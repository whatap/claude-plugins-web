import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Copy, Check, ExternalLink, Package, Tag, User, Scale } from 'lucide-react'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { getPluginByName } from '@/data/plugins'

export function PluginDetail() {
  const { name } = useParams<{ name: string }>()
  const plugin = getPluginByName(name || '')
  const [copied, setCopied] = useState(false)

  if (!plugin) {
    return (
      <div className="container mx-auto max-w-screen-xl px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">플러그인을 찾을 수 없습니다</h1>
          <Link to="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              목록으로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const installCommand = `git clone https://github.com/whatap/claude-plugins.git && cp claude-plugins/plugins/${plugin.name}/hooks/hooks.json ~/.claude/`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(installCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          플러그인 목록
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
              <Package className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{plugin.name}</h1>
              <p className="text-muted-foreground mt-1">{plugin.description}</p>
            </div>
          </div>

          {/* Install Command */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">설치 방법</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="rounded-lg bg-muted p-4 text-sm overflow-x-auto">
                  <code>{installCommand}</code>
                </pre>
                <Button
                  variant="default"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* README Content */}
          {plugin.readme && (
            <Card>
              <CardHeader>
                <CardTitle>README</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="markdown-body">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {plugin.readme}
                  </ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">버전</span>
                <span className="ml-auto font-mono">{plugin.version}</span>
              </div>

              {plugin.author && (
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">작성자</span>
                  <span className="ml-auto">{plugin.author.name}</span>
                </div>
              )}

              {plugin.license && (
                <div className="flex items-center gap-2 text-sm">
                  <Scale className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">라이선스</span>
                  <span className="ml-auto">{plugin.license}</span>
                </div>
              )}

              {plugin.platform && (
                <div className="flex items-center gap-2 text-sm">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">플랫폼</span>
                  <span className="ml-auto">{plugin.platform.join(', ')}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Keywords */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">태그</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {plugin.keywords.map((keyword) => (
                  <Badge key={keyword} variant="secondary">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">링크</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {plugin.repository && (
                <a
                  href={plugin.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  GitHub Repository
                </a>
              )}
              {plugin.homepage && (
                <a
                  href={plugin.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  홈페이지
                </a>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
