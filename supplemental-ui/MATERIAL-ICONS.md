Material Icons support (quick guide)

1) CDN usage (quickest)
   - The UI now loads Material Icons via Google CDN: `<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`.
   - Use material icons in HTML with the ligature name:
     - `<i class="material-icons">youtube_searched_for</i>` or `<i class="material-icons">public</i>`
   - The `.material-icons` class is styled in `css/base.css` to inherit color and align with text.

2) Local usage
   - Download the Material Icons font and CSS and place them in `css/` and `fonts/` as appropriate.
   - Replace the CDN link in `partials/head-styles.hbs` with a local path, e.g., `<link rel="stylesheet" href="{{{uiRootPath}}}/css/material-icons.css">`.

3) Using alongside Font Awesome
   - You can freely combine icons. Example:
     - `<span class="icon"><i class="fa fa-youtube"></i></span>` (Font Awesome)
     - `<span class="icon"><i class="material-icons">public</i></span>` (Material Icons)
   - Both icon types inherit color. Use existing utilities like `.icon--youtube` or `.icon-twitter` or add a specific class to color material icons as needed:
     - `.icon--youtube .material-icons { color: #FF0000; }`

4) Notes
   - Material Icons use ligatures (text names), not pseudo-content. When mixing icon systems, ensure your markup uses the correct class and format.
   - If you prefer a different Material icon set (Material Symbols), link the appropriate stylesheet and adjust `.material-icons` rules accordingly.
