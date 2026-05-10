import fs from 'fs';
import path from 'path';

const sourceDir = 'c:\\Users\\satbi\\Downloads\\ezgif-80cc2e9f54c4fdb8-jpg (1)';
const destDir = path.join(process.cwd(), 'public', 'anatomy-sequence');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.readdirSync(sourceDir).forEach(file => {
  const sourceFile = path.join(sourceDir, file);
  const destFile = path.join(destDir, file);
  if (fs.statSync(sourceFile).isFile()) {
    fs.copyFileSync(sourceFile, destFile);
  }
});

console.log('Frames copied successfully!');
