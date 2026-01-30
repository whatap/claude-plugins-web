# Claude Plugins Marketplace Web

WhaTap Claude Code 플러그인 마켓플레이스 웹사이트입니다.

## 배포

- **URL**: https://whatap.github.io/claude-plugins-web/
- **호스팅**: GitHub Pages

## 자동 업데이트 시스템

플러그인 데이터는 [claude-plugins](https://github.com/whatap/claude-plugins) 저장소에서 자동으로 동기화됩니다.

```
claude-plugins (private)          claude-plugins-web (public)
        │                                    │
        │  push to main                      │
        ▼                                    │
┌─────────────────┐                          │
│ sync-to-web.yml │── repository_dispatch ──►│
└─────────────────┘                          │
                                             ▼
                                    ┌─────────────────┐
                                    │ update-plugins  │
                                    │     .yml        │
                                    └────────┬────────┘
                                             │ push
                                             ▼
                                    ┌─────────────────┐
                                    │   deploy.yml    │
                                    │ (GitHub Pages)  │
                                    └─────────────────┘
```

### 동작 흐름

1. claude-plugins에서 `plugins/` 디렉토리 변경 시 push
2. `sync-to-web.yml`이 플러그인 메타데이터 추출
3. `repository_dispatch`로 이 저장소에 데이터 전송
4. `update-plugins.yml`이 `src/data/plugins.ts` 자동 생성
5. `deploy.yml`이 GitHub Pages로 배포

## 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 프로젝트 구조

```
claude-plugins-web/
├── .github/workflows/
│   ├── deploy.yml           # GitHub Pages 배포
│   └── update-plugins.yml   # 플러그인 데이터 수신
├── scripts/
│   └── update-plugins.js    # plugins.ts 생성 스크립트
├── src/
│   ├── components/          # React 컴포넌트
│   ├── data/
│   │   ├── plugins.ts       # 플러그인 데이터 (자동 생성)
│   │   └── types.ts         # TypeScript 타입
│   ├── pages/               # 페이지 컴포넌트
│   └── App.tsx
└── package.json
```

## 수동 업데이트

`workflow_dispatch`를 통해 수동으로 플러그인 데이터를 업데이트할 수 있습니다:

1. Actions 탭 → Update Plugins 워크플로우 선택
2. "Run workflow" 클릭
3. plugins_json 입력 (선택사항)

## 기술 스택

- React 18
- TypeScript
- Vite
- TailwindCSS

## 라이선스

MIT
