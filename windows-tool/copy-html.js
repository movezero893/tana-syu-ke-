import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// どのディレクトリから実行されても動くように、
// 「このスクリプト自身の場所」を基準にパスを解決する。
//   スクリプトの場所: リポジトリ/windows-tool/copy-html.js
const scriptDir = path.dirname(fileURLToPath(import.meta.url)); // = windows-tool/
const repoRoot  = path.join(scriptDir, '..');                   // = リポジトリルート

// 集計ツール本体（リポジトリ直下）
const srcHtml = path.join(repoRoot, 'shukei-tool.html');

// tauri.conf.json の frontendDist は "../dist"（src-tauri基準）= windows-tool/dist
const distDir  = path.join(scriptDir, 'dist');
const destHtml = path.join(distDir, 'index.html');

if (!fs.existsSync(srcHtml)) {
  console.error(`Source HTML not found: ${srcHtml}`);
  process.exit(1);
}

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

try {
  const content = fs.readFileSync(srcHtml, 'utf-8');
  fs.writeFileSync(destHtml, content, 'utf-8');
  console.log(`Copied: ${srcHtml} -> ${destHtml}`);
} catch (err) {
  console.error(`Error copying HTML: ${err.message}`);
  process.exit(1);
}
