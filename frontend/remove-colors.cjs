const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

// List of files to skip because they have dark backgrounds
const SKIP_FILES = [
  'HeroSection.jsx',
  'Footer.jsx',
  'CTASection.jsx',
  'JourneySection.jsx',
  'ImpactSection.jsx',
  'Navbar.jsx'
];

function processFile(filePath) {
  if (SKIP_FILES.some(skipFile => filePath.endsWith(skipFile))) {
    console.log(`Skipping dark background file: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // We want to remove text-gray-\d+, text-black, text-slate-\d+, text-[#0A1435], text-[#000000]
  // from className="..." but ONLY for specific tags (p, h1-h6, label, div)
  // To keep it simple and because the user said "Remove these text-color classes where they are being used for normal/general text",
  // we can use a regex that matches className string and removes these specific classes.
  
  // We'll replace occurrences of these classes inside className strings.
  const classesToRemove = [
    /text-gray-\d{2,3}\b/g,
    /text-slate-\d{2,3}\b/g,
    /text-zinc-\d{2,3}\b/g,
    /text-neutral-\d{2,3}\b/g,
    /text-black\b/g,
    /text-\[\#0A1435\]/g,
    /text-\[\#000000\]/g,
    /text-\[\#111827\]/g,
    /text-sco-blue-light\b/g,
    /text-sco-blue\b/g,
    /text-sco-muted\b/g
  ];

  // We only replace inside className="..." or className={`...`}
  // A bit tricky with regex, so let's match the whole class attribute and replace inside it.
  content = content.replace(/className=(["'])(.*?)\1|className=\{`(.*?)`\}/g, (match, quote, p2, p3) => {
    let classStr = p2 || p3;
    
    // Check if this class string contains button, badge, or other skip indicators
    if (classStr.includes('bg-[#0A1435]') || classStr.includes('bg-gray-800') || classStr.includes('bg-black')) {
      // It's a dark background element, keep text colors
      return match;
    }

    // Now remove the target classes
    classesToRemove.forEach(regex => {
      classStr = classStr.replace(regex, '');
    });

    // Clean up multiple spaces and trim
    classStr = classStr.replace(/\s+/g, ' ').trim();

    if (p2 !== undefined) {
      return `className=${quote}${classStr}${quote}`;
    } else {
      return `className={\`${classStr}\`}`;
    }
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function traverseDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      traverseDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.tsx') || fullPath.endsWith('.js')) {
      processFile(fullPath);
    }
  }
}

traverseDirectory(directoryPath);
console.log("Cleanup complete!");
