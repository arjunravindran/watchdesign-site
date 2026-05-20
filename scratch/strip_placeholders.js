const fs = require('fs');

const path = 'data/modules.js';
let content = fs.readFileSync(path, 'utf8');

// Regex to find and remove image fields that point to unsplash URLs
// Example: image: 'https://images.unsplash.com/...',\n
const regex = /\s*image:\s*'https:\/\/images\.unsplash\.com\/[^']*',\s*/g;

const beforeLength = content.length;
content = content.replace(regex, '\n        ');

// Clean up any double empty lines or extra spaces created by replacement
content = content.replace(/,\s*\n\s*\n\s*/g, ',\n        ');

fs.writeFileSync(path, content, 'utf8');
console.log(`Successfully stripped all generic Unsplash placeholders from ${path}!`);
