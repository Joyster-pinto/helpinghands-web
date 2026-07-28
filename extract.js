const fs = require('fs');

const html = fs.readFileSync('D:\\Helping hands\\resource\\Helping Hands Team Trust Selection Interview (2026-27).html', 'utf8');

// Regex to find div elements with role="heading" or similar text containers that look like form questions
const matches = html.match(/<div[^>]*role="heading"[^>]*>.*?<\/div>/gi);

if (matches) {
    const questions = matches.map(m => m.replace(/<[^>]+>/g, '').trim()).filter(text => text.length > 0);
    console.log("Found Headers/Questions:", questions);
} else {
    console.log("No role='heading' found.");
}

// Let's also look for data-params if it's a raw google form
const paramsMatch = html.match(/data-params="([^"]+)"/g);
if (paramsMatch) {
    console.log("Found data-params length:", paramsMatch.length);
}
