import fs from 'fs';
import path from 'path';

const basePath = 'C:\\Users\\satbi\\d webs antigravity\\bio-clone';

const filesToDelete = [
  path.join(basePath, 'src', 'components', 'AnatomyScrollSequence.tsx'),
  path.join(basePath, 'copy-frames.mjs')
];

const dirsToDelete = [
  path.join(basePath, 'public', 'anatomy-sequence')
];

filesToDelete.forEach(file => {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log('Deleted file:', file);
  }
});

dirsToDelete.forEach(dir => {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log('Deleted directory:', dir);
  }
});
