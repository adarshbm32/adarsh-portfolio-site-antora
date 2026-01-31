Local Font Awesome (FA 4.x) setup

1) Download Font Awesome 4.7
   - Grab the ZIP from https://github.com/FortAwesome/Font-Awesome/releases/tag/v4.7.0

2) Copy files into this UI repo
   - Copy the stylesheet to: `css/font-awesome.min.css` (or `css/font-awesome.css`)
   - Copy the font files to a `fonts/` directory at the repo root:
     - `fonts/fontawesome-webfont.eot`
     - `fonts/fontawesome-webfont.svg`
     - `fonts/fontawesome-webfont.ttf`
     - `fonts/fontawesome-webfont.woff`
     - `fonts/fontawesome-webfont.woff2`

3) Confirm paths inside `css/font-awesome.min.css`
   - The default FA 4 CSS uses `../fonts/fontawesome-webfont.woff2` etc when the CSS is in `css/` and the fonts are in `fonts/` at the same level — that is what we expect here. If you move things, update the paths inside the CSS accordingly.

4) Remove the CDN usage
   - The UI now references the local stylesheet from `partials/head-styles.hbs`. Remove the CDN only when you have copied the files.

5) Verification
   - Build and serve Antora and open a page that contains icons. In DevTools → Network filter by "font" to ensure the fonts are loaded from `.../fonts/` and that returns 200 OK.

Notes
- Font Awesome 4 does not include some icons introduced in FA 5/6 (e.g., `fa-podcast` may not exist). If you need newer icons, consider upgrading to FA 5/6 and updating class names or using a kit.
- If your site uses Content Security Policy, add `font-src` allowed host or self for local fonts.
