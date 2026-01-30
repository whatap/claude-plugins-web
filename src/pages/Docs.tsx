import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const docsContent = `
# WhaTap Claude Plugins Marketplace

## 소개

WhaTap Claude Plugins Marketplace는 WhaTap 내부에서 사용하는 **Claude Code 플러그인**을 관리하고 공유하기 위한 플랫폼입니다.

[Claude Code](https://claude.ai/claude-code)는 Anthropic에서 제공하는 AI 기반 코딩 어시스턴트입니다. 이 마켓플레이스를 통해 WhaTap 개발자들은 업무 생산성을 높이는 다양한 플러그인을 쉽게 찾고 설치할 수 있습니다.

---

## 플러그인 유형

### 1. Hook
Claude Code의 특정 이벤트에 반응하여 실행되는 스크립트입니다.

| 이벤트 | 설명 |
|--------|------|
| \`PreToolUse\` | 도구 실행 전 |
| \`PostToolUse\` | 도구 실행 후 |
| \`Notification\` | 알림 발생 시 |
| \`Stop\` | 세션 종료 시 |

**예시:** \`notification-hook\` - 작업 완료 시 데스크톱 알림

### 2. Command
슬래시 명령어로 실행할 수 있는 커스텀 기능입니다.

\`\`\`bash
# 사용 예시
/commit    # 자동 커밋 메시지 생성
/review    # 코드 리뷰 요청
\`\`\`

### 3. MCP Server
Model Context Protocol 서버로, Claude Code에 추가 기능을 제공합니다.

---

## 설치 방법

### 1. 저장소 클론

\`\`\`bash
git clone https://github.com/whatap/claude-plugins.git
cd claude-plugins
\`\`\`

### 2. 원하는 플러그인 설치

각 플러그인 페이지에서 설치 명령어를 확인하세요.

**Hook 플러그인 예시:**
\`\`\`bash
# hooks.json을 Claude Code 설정 디렉토리에 복사
cp plugins/notification-hook/hooks/hooks.json ~/.claude/
\`\`\`

### 3. Claude Code 재시작

설정이 적용되도록 Claude Code를 재시작합니다.

---

## 플러그인 개발 가이드

### 디렉토리 구조

\`\`\`
plugins/
└── my-plugin/
    ├── .claude-plugin/
    │   └── plugin.json      # 플러그인 메타데이터
    ├── hooks/
    │   └── hooks.json       # Hook 설정 (Hook 플러그인인 경우)
    ├── scripts/
    │   └── my-script.sh     # 실행 스크립트
    └── README.md            # 플러그인 설명
\`\`\`

### plugin.json 예시

\`\`\`json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "플러그인 설명",
  "author": {
    "name": "Your Name",
    "email": "you@whatap.io"
  },
  "keywords": ["공통", "hook"],
  "license": "MIT"
}
\`\`\`

### 기여하기

1. 이 저장소를 Fork 합니다
2. 플러그인을 개발합니다
3. Pull Request를 생성합니다
4. 리뷰 후 마켓플레이스에 등록됩니다

---

## 태그 분류 체계

| 분류 | 태그 예시 |
|------|----------|
| 사용 범위 | \`공통\`, \`백엔드\`, \`프론트엔드\` |
| 제품팀 | \`APM팀\`, \`인프라팀\`, \`로그팀\` |
| 기능 유형 | \`hook\`, \`command\`, \`mcp\` |
| 플랫폼 | \`macos\`, \`linux\`, \`windows\` |

---

## 문의 및 지원

- **GitHub Issues:** [github.com/whatap/claude-plugins/issues](https://github.com/whatap/claude-plugins/issues)
- **Slack:** #claude-code 채널

---

## 참고 자료

- [Claude Code 공식 문서](https://docs.anthropic.com/claude-code)
- [Claude Code Hooks Guide](https://docs.anthropic.com/claude-code/hooks)
- [MCP (Model Context Protocol)](https://modelcontextprotocol.io)
`

export function Docs() {
  return (
    <div className="container mx-auto max-w-screen-md px-4 py-8">
      <div className="markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {docsContent}
        </ReactMarkdown>
      </div>
    </div>
  )
}
