# SPARE — Build with Design

A responsive, single-page website for SPARE, an independent web design and development studio. It is built with plain HTML, CSS and JavaScript—there is no build step or dependency to install.

## Run locally

Open `index.html` directly in a modern browser, or serve this folder with a basic local server. For example, in VS Code, use a local-server extension and open the generated URL.

## Project structure

```
index.html                 Page content and metadata
style.css                  Visual design, responsiveness and motion
script.js                  Navigation, reveal animation and contact form logic
assets/images/             Social-sharing image asset
assets/icons/favicon.svg   Favicon
```

## Replace images

`assets/images/spare-social.svg` is the editable social-sharing placeholder. Once a final domain is available, update the Open Graph image reference in `index.html` to an absolute image URL.

## Edit text

All page copy lives in `index.html`. Search for the specific heading or sentence you wish to replace. Colour, typography, layout and responsive rules are in `style.css`.

## Update contact information

Search for `morerohan9850@gmail.com`, `917767826228`, and `rohan1_exe` in `index.html`. The contact form recipient is also set in `script.js` in the `mailto:` line.

The form validates input and opens the visitor's email app with a ready-to-send enquiry. It intentionally does not claim to store submissions. To connect a form provider later, replace the submit handler in `script.js` with the provider's documented endpoint or SDK call.

## Deploy

Because this is a static website, upload the project files to any static host such as GitHub Pages, Netlify, Cloudflare Pages or Vercel. Set the publish directory to the project root. Before launch, replace the relative Open Graph image with an absolute URL once the final domain is known.
