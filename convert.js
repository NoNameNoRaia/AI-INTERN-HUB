const fs = require('fs');

function htmlToJsx(html) {
  return html
    .replace(/class=/g, 'className=')
    .replace(/for=/g, 'htmlFor=')
    .replace(/<!--(.*?)-->/gs, '{/* $1 */}')
    // simple self closing tags
    .replace(/<img([^>]*[^\/])>/g, '<img$1 />')
    .replace(/<input([^>]*[^\/])>/g, '<input$1 />')
    .replace(/<br>/g, '<br />')
    .replace(/<hr>/g, '<hr />')
    // some inline styles need manual fix but let's try basic
    .replace(/style="([^"]*)"/g, (match, p1) => {
      const styleObj = p1.split(';').filter(s => s.trim()).reduce((acc, s) => {
        const [key, value] = s.split(':').map(v => v.trim());
        if (key && value) {
          const camelKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
          acc += `${camelKey}: '${value}', `;
        }
        return acc;
      }, '');
      return `style={{ ${styleObj} }}`;
    });
}

function convertFile(inFile, outFile, pageName, cssFiles = [], isClient = false) {
  let content = fs.readFileSync(inFile, 'utf8');
  
  // Extract body content
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (!bodyMatch) {
    console.log(`No body found in ${inFile}`);
    return;
  }
  
  let bodyContent = bodyMatch[1];
  
  // Remove script tags from body
  bodyContent = bodyContent.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  
  let jsx = htmlToJsx(bodyContent);
  
  let output = ``;
  if (isClient) {
    output += `"use client";\n\n`;
    output += `import { useEffect } from 'react';\n`;
  }
  
  cssFiles.forEach(css => {
    output += `import '${css}';\n`;
  });
  
  output += `\nexport default function ${pageName}() {\n`;
  
  if (isClient) {
    output += `
  useEffect(() => {
    // TODO: Paste logic from corresponding JS file here
  }, []);
`;
  }
  
  output += `  return (\n    <>\n${jsx}\n    </>\n  );\n}\n`;
  
  fs.writeFileSync(outFile, output);
  console.log(`Generated ${outFile}`);
}

// Convert index.html
convertFile('www_backup/index.html', 'app/page.jsx', 'HomePage', ['../app/css/github.css'], true);

// Convert auth.html
fs.mkdirSync('app/auth', { recursive: true });
convertFile('www_backup/auth.html', 'app/auth/page.jsx', 'AuthPage', ['../../app/css/auth.css'], true);

// Convert 404.html
convertFile('www_backup/404.html', 'app/not-found.jsx', 'NotFoundPage', ['../app/css/404.css'], true);

