import type { Plugin } from './types'

// Static plugin data - in production, this would be fetched from marketplace.json
export const plugins: Plugin[] = [
  {
    name: 'notification-hook',
    version: '1.0.0',
    description: '작업 완료/입력 대기 시 macOS 데스크톱 알림을 제공합니다. Claude Code가 오래 걸리는 작업을 완료하거나 사용자 입력이 필요할 때 알림을 받을 수 있습니다.',
    category: 'productivity',
    keywords: ['공통', 'hook', 'notification', 'macos'],
    author: {
      name: 'WhaTap Labs',
      email: 'dev@whatap.io',
    },
    homepage: 'https://github.com/whatap/claude-plugins/tree/main/plugins/notification-hook',
    repository: 'https://github.com/whatap/claude-plugins',
    license: 'MIT',
    platform: ['macOS'],
    readme: `# notification-hook

> macOS 데스크톱 알림으로 Claude Code 작업 상태를 실시간으로 확인하세요.

## 개요

Claude Code가 장시간 작업을 수행할 때, 완료 시점이나 사용자 입력이 필요한 시점을 놓치기 쉽습니다.
이 플러그인은 Hook을 활용하여 적절한 시점에 macOS 네이티브 알림을 제공합니다.

## 기능

- ✅ 작업 완료 알림 (60초 이상 소요된 작업)
- ✅ 사용자 입력 대기 알림 (Permission 요청 시)
- ✅ 세션 종료 알림

## 설치

\`\`\`bash
# 1. terminal-notifier 설치
brew install terminal-notifier

# 2. 플러그인 클론
git clone https://github.com/whatap/claude-plugins.git

# 3. hooks.json을 ~/.claude/ 에 복사
cp claude-plugins/plugins/notification-hook/hooks/hooks.json ~/.claude/
\`\`\`

## 설정

| 옵션 | 기본값 | 설명 |
|------|--------|------|
| IDLE_THRESHOLD | 60 | 알림 대기 시간(초) |

## 요구사항

- macOS 10.15+
- terminal-notifier
- Claude Code CLI

## 라이선스

MIT`,
  },
]

export function getPluginByName(name: string): Plugin | undefined {
  return plugins.find((p) => p.name === name)
}

export function searchPlugins(query: string, category?: string, tags?: string[]): Plugin[] {
  return plugins.filter((plugin) => {
    // Search query
    if (query) {
      const q = query.toLowerCase()
      const matchesQuery =
        plugin.name.toLowerCase().includes(q) ||
        plugin.description.toLowerCase().includes(q) ||
        plugin.keywords.some((k) => k.toLowerCase().includes(q))
      if (!matchesQuery) return false
    }

    // Category filter
    if (category && category !== 'all' && plugin.category !== category) {
      return false
    }

    // Tags filter
    if (tags && tags.length > 0) {
      const hasTag = tags.some((tag) =>
        plugin.keywords.some((k) => k.toLowerCase() === tag.toLowerCase())
      )
      if (!hasTag) return false
    }

    return true
  })
}
