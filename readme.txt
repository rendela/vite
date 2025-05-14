# Rendela - SPA Page Prerendering Plugin

`Rendela` is a powerful tool designed to optimize Single Page Applications (SPAs) by prerendering them for better SEO, performance, and overall user experience. It helps search engines to index your pages more effectively, improves load times, and enhances the visibility of your site.

## Key Features
- **SEO Optimization:** Prerenders pages to ensure they are properly indexed by search engines.
- **Faster Load Times:** By prerendering pages, users get content faster on their first visit.
- **Easy Integration:** Easily integrates with your existing SPA built with frameworks like Vue, React, etc.
- **Works with Vite:** This package works seamlessly with Vite to optimize SPA performance.

## Prerequisites

Before you start using `rendela`, you will need to install **Chromium** on your machine. This is required to properly prerender the pages as `rendela` uses Chromium in headless mode for rendering.

### Installation for Chromium

#### On Ubuntu/Debian (Linux)

1. First, update your package list:
    ```bash
    sudo apt update
    ```

2. Then, install Chromium:
    ```bash
    sudo apt install chromium
    ```

3. Verify the installation by running:
    ```bash
    chromium --version
    ```

This should show the installed Chromium version.

#### On Windows

1. **Download Chromium**: You can download the latest stable version of Chromium from the [official website](https://download-chromium.appspot.com/).
   
2. **Extract the Archive**: Extract the downloaded `.zip` file to a location of your choice (e.g., `C:\Program Files\Chromium`).

3. **Set the Path**: You need to add the path to the Chromium executable in your system’s PATH environment variable.
   - Open **System Properties** > **Environment Variables**.
   - Under **System Variables**, find and select `Path`, then click **Edit**.
   - Click **New**, and add the path to the folder where Chromium is located (e.g., `C:\Program Files\Chromium`).

4. Verify the installation by running the following command in a terminal or command prompt:
    ```bash
    chromium --version
    ```

#### On macOS

1. **Install Chromium**: You can install Chromium using Homebrew. If you don't have Homebrew installed, first install it by running:
    ```bash
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```

2. **Install Chromium** via Homebrew:
    ```bash
    brew install chromium
    ```

3. Verify the installation by running:
    ```bash
    chromium --version
    ```

If you don't use Homebrew, you can manually download Chromium from the [official website](https://download-chromium.appspot.com/) and follow similar steps as for Windows.

---

## Installation

Once Chromium is installed on your machine, you can proceed to install `rendela` as a Vite plugin.

1. Install the package via npm or yarn:
    ```bash
    npm install @rendela/vite
    # or
    yarn add @rendela/vite
    ```

2. Add `rendela` to your `vite.config.js`:
    ```javascript
    import { defineConfig } from 'vite'
    import rendela from '@rendela/vite'

    export default defineConfig({
      plugins: [rendela()],
    })
    ```

---

## Usage

Once you've installed and configured `rendela` with Vite, it will automatically handle prerendering of your SPA pages when you build your project.

### How It Works
- `rendela` will use the installed Chromium instance in headless mode to render and capture your pages.
- It generates static HTML files of your pages that can be served to crawlers or users, ensuring better SEO and performance.

---

## Additional Notes

- Make sure your Chromium installation is accessible from your system's PATH for `rendela` to function properly.
- If you're running the plugin in a CI environment, make sure the Chromium binary is installed and available.
  
---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
