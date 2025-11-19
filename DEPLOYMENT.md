# Deployment Checklist

## Pre-Deployment

- [x] Build successful: `npm run build`
- [x] Node files compiled to `dist/nodes/NovaWebGrounding/`
- [x] Configuration files included
- [x] SVG icon included

## Package Contents

```
dist/
└── nodes/
    └── NovaWebGrounding/
        ├── NovaWebGrounding.node.js
        ├── NovaWebGrounding.node.d.ts
        ├── NovaWebGrounding.node.json
        └── nova-web-grounding.svg
```

## NPM Publishing

1. Update version in `package.json` if needed
2. Run: `npm run prepublishOnly`
3. Publish: `npm publish`

## Verification

After publishing, verify:
- Package available on npm: `npm search n8n-nodes-nova-web-grounding`
- Installation works: `npm install n8n-nodes-nova-web-grounding`
- Node loads in n8n

## Installation Instructions for Users

```bash
npm install n8n-nodes-nova-web-grounding
```

Then restart n8n to load the new node.
