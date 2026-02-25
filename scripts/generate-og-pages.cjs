#!/usr/bin/env node

/**
 * generate-og-pages.cjs
 *
 * Vite 빌드 후 실행. 각 플러그인별 정적 HTML을 생성하여
 * 메신저 링크 미리보기(OG 태그)를 지원한다.
 *
 * dist/plugin/{name}/index.html 생성
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const INDEX_HTML = path.join(DIST_DIR, 'index.html');
const META_FILE = path.join(DIST_DIR, 'plugins-meta.json');

const BASE_URL = 'https://whatap.github.io/claude-plugins-web';

function main() {
  if (!fs.existsSync(INDEX_HTML)) {
    console.error('Error: dist/index.html not found. Run vite build first.');
    process.exit(1);
  }

  // plugins-meta.json은 public/에서 dist/로 Vite가 복사
  if (!fs.existsSync(META_FILE)) {
    console.warn('Warning: plugins-meta.json not found. Falling back to plugins.ts parsing.');
    generateFromPluginsTs();
    return;
  }

  const plugins = JSON.parse(fs.readFileSync(META_FILE, 'utf-8'));
  const template = fs.readFileSync(INDEX_HTML, 'utf-8');

  console.log(`Generating OG pages for ${plugins.length} plugins...`);

  for (const plugin of plugins) {
    generatePluginPage(template, plugin);
  }

  console.log('OG pages generation complete.');
}

function generatePluginPage(template, plugin) {
  const dir = path.join(DIST_DIR, 'plugin', plugin.name);
  fs.mkdirSync(dir, { recursive: true });

  const title = `${plugin.name} - WhaTap Claude Plugin`;
  const description = plugin.description || '';
  const url = `${BASE_URL}/plugin/${plugin.name}`;

  const ogTags = [
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="WhaTap Claude Plugins" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
  ].join('\n    ');

  // index.html 템플릿에서 OG 태그와 title 교체
  let html = template;

  // 기존 og: 태그 제거 (index.html에 있는 기본 OG 태그)
  html = html.replace(/<meta property="og:[^"]*"[^>]*\/>\n?\s*/g, '');
  html = html.replace(/<meta name="twitter:[^"]*"[^>]*\/>\n?\s*/g, '');

  // title 교체
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(title)}</title>`
  );

  // description 교체
  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escapeAttr(description)}" />`
  );

  // OG 태그 삽입 (title 앞에)
  html = html.replace(
    /(\s*<title>)/,
    `\n    ${ogTags}$1`
  );

  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
  console.log(`  - plugin/${plugin.name}/index.html`);
}

/**
 * plugins-meta.json이 없을 때 plugins.ts에서 직접 파싱하는 폴백
 */
function generateFromPluginsTs() {
  const pluginsTs = path.join(__dirname, '..', 'src', 'data', 'plugins.ts');
  if (!fs.existsSync(pluginsTs)) {
    console.error('Error: src/data/plugins.ts not found.');
    process.exit(1);
  }

  const content = fs.readFileSync(pluginsTs, 'utf-8');
  const plugins = [];

  // 간단한 정규식 파싱: name과 description 추출
  const regex = /name:\s*'([^']+)'[\s\S]*?description:\s*'([^']+)'/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    plugins.push({ name: match[1], description: match[2] });
  }

  if (plugins.length === 0) {
    console.warn('Warning: No plugins found in plugins.ts');
    return;
  }

  const template = fs.readFileSync(INDEX_HTML, 'utf-8');
  console.log(`Generating OG pages for ${plugins.length} plugins (from plugins.ts)...`);

  for (const plugin of plugins) {
    generatePluginPage(template, plugin);
  }

  console.log('OG pages generation complete.');
}

function escapeAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

main();
