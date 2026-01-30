export interface PluginAuthor {
  name: string
  email?: string
}

export interface Plugin {
  name: string
  version: string
  description: string
  category: string
  keywords: string[]
  author?: PluginAuthor
  homepage?: string
  repository?: string
  license?: string
  readme?: string
  platform?: string[]
}

export interface Marketplace {
  name: string
  owner: {
    name: string
    email: string
  }
  metadata: {
    description: string
    version: string
    pluginRoot: string
  }
  plugins: Array<{
    name: string
    source: string
    description: string
    version: string
    category: string
    keywords: string[]
  }>
}

export const CATEGORIES = [
  { value: 'all', label: '전체' },
  { value: 'productivity', label: '생산성' },
  { value: 'development', label: '개발' },
  { value: 'testing', label: '테스팅' },
  { value: 'deployment', label: '배포' },
  { value: 'monitoring', label: '모니터링' },
] as const

export const TAGS = [
  '공통',
  '백엔드',
  '프론트엔드',
  'hook',
  'command',
  'mcp',
  'notification',
  'macos',
  'linux',
  'windows',
] as const
