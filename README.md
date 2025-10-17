# Rendela - Pre-rendering for Vite SPAs

Rendela is an NPM library that allows you to pre-render selected pages of your Single Page Application to improve SEO, especially on landing pages that need to be indexed correctly by search engines.

## Features

- Pre-renders selected pages of your SPA for improved SEO
- Seamless integration with Vite build process
- Configurable rendering options
- Support for Nginx and Apache server configurations
- Automatic Chromium handling

## Prerequisites

Before installing Rendela, ensure you have:

- A Vite-based project
- Node.js version 14 or higher
- Chrome or Chromium browser (required for headless rendering)

### Installing Chromium

**Linux:**
```bash
apt update && apt install chromium
```

**Windows:**
1. Download Chromium from the [official website](https://www.chromium.org/getting-involved/download-chromium)
2. Extract to desired location (e.g., `C:\Program Files\Chromium`)
3. Add to PATH environment variable

**macOS:**
```bash
# Install Homebrew if needed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
# Install Chromium
brew install chromium
```

## Installation

Install Rendela in your Vite project:

```bash
npm i @rendela/vite
```

## Configuration

1. Add the plugin to your `vite.config.js` or `vite.config.ts`:

```js
import { defineConfig } from 'vite';
import rendela from '@rendela/vite';

export default defineConfig({
  plugins: [
    rendela()
  ]
});
```

2. Create a `rendela.config.js` in your project root (or let Rendela auto-generate it):

```js
export default {
  pages: [
    { url: "/" },
    { url: "/about" },
    { url: "/products" }
  ],
  buildDir: "dist",
  port: 3300,
  savePath: "pages",
  pageWaitTime: 10,
  pageTimeout: 5000,
  debug: true,
  autoStartOnBuild: true,
  concurrencyLimit: 1,
  chromiumExecutablePath: undefined
};
```

### Configuration Options

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| pages | Array | `[{ url: '/' }]` | Pages to pre-render |
| buildDir | String | `"dist"` | Build directory |
| port | Number | `3300` | Server port for rendering |
| savePath | String | `"pages"` | Output directory for rendered pages |
| pageWaitTime | Number | `10` | Wait time after load (ms) |
| pageTimeout | Number | `5000` | Page load timeout (ms) |
| debug | Boolean | `true` | Enable debug logging |
| autoStartOnBuild | Boolean | `true` | Auto-render after build |
| concurrencyLimit | Number | `1` | Concurrent page limit |
| chromiumExecutablePath | String | `undefined` | Custom Chromium path |

## Usage

With `autoStartOnBuild: true`, pages will be pre-rendered automatically after build. Otherwise, run:

```bash
npx rendela
```

## Server Configuration

### Nginx

```nginx
server {
   listen 80;
   root /var/www/your-site/dist;
   
   location = / {
        try_files /pages/index.html =404;
   }
   
   location / {
        try_files $uri /pages/$uri/index.html /index.html =404;
   }
}
```

### Apache

```apache
<VirtualHost *:80>
    DocumentRoot /var/www/your-site/dist

    RewriteEngine On
    RewriteCond %{REQUEST_URI} ^/$
    RewriteRule ^$ /pages/index.html [L]

    RewriteCond %{REQUEST_URI} !^/pages/
    RewriteRule ^(.*)$ /pages/$1/index.html [L]
</VirtualHost>
```

## License

MIT