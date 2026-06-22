const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const filesToFix = [
  'pages/ProjectsPage.jsx',
  'pages/ProjectDetailsPage.jsx',
  'pages/CommitteeMembersPage.jsx',
  'pages/BecomeMemberPage.jsx',
  'pages/ChaptersPage.jsx',
  'pages/AnnualReportsPage.jsx',
  'components/GujaratMap.jsx'
];

filesToFix.forEach(relPath => {
  const fullPath = path.join(srcDir, relPath);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let changed = false;

  if (content.includes('https://sco-network.onrender.com/api')) {
    content = content.replace(/'https:\/\/sco-network\.onrender\.com\/api\/(.*?)'/g, '`${API_BASE_URL}/$1`');
    content = content.replace(/`https:\/\/sco-network\.onrender\.com\/api\/(.*?)`/g, '`${API_BASE_URL}/$1`');
    changed = true;
  }

  if (changed && !content.includes('API_BASE_URL')) {
    const depth = relPath.split('/').length - 1;
    const prefix = depth === 1 ? '../' : '../../';
    const importStmt = `import { API_BASE_URL } from '${prefix}utils/api';\n`;
    
    const lastImportIndex = content.lastIndexOf('import ');
    if (lastImportIndex !== -1) {
      const endOfLine = content.indexOf('\n', lastImportIndex);
      content = content.slice(0, endOfLine + 1) + importStmt + content.slice(endOfLine + 1);
    } else {
      content = importStmt + content;
    }
  }

  if (changed) {
    fs.writeFileSync(fullPath, content);
    console.log('Fixed', relPath);
  }
});
