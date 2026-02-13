import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, 'dist');
const payloadRoot = path.join(projectRoot, 'deploy-exe', 'payload');
const payloadDistDir = path.join(payloadRoot, 'dist');
const payloadVersionFile = path.join(payloadRoot, 'version.txt');
const packageJsonPath = path.join(projectRoot, 'package.json');

if (!fs.existsSync(distDir)) {
  throw new Error('dist 目录不存在，请先执行 npm run build-only');
}

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const version = packageJson.version || '0.0.0';
const buildTag = `${version}-${Date.now()}`;

fs.mkdirSync(payloadRoot, { recursive: true });
fs.rmSync(payloadDistDir, { recursive: true, force: true });
fs.cpSync(distDir, payloadDistDir, { recursive: true });
fs.writeFileSync(payloadVersionFile, buildTag, 'utf8');

console.log('已同步 dist 到 deploy-exe/payload');
console.log(`版本标记: ${buildTag}`);
