# Antora Extensions

This directory contains custom Antora extensions for the portfolio site.

## Extensions

### 1. lunr-enhancements-extension.js

Enhances Lunr search functionality with:
- Configurable snippet length
- Custom field boosting
- Search result limits
- Fuzzy search support

**Configuration:**
```yaml
antora:
  extensions:
    - ./extensions/lunr-enhancements-extension.js
      snippet_length: 100
      max_results: 50
      enable_fuzzy: true
```

### 2. search-index-customizer.js

Customizes the search index with:
- Automatic keyword extraction
- Enhanced document metadata
- Better field weighting
- Search behavior configuration

**Configuration:**
```yaml
antora:
  extensions:
    - ./extensions/search-index-customizer.js
      snippet_length: 100
      max_results: 50
      fuzzy_matching: true
      wildcard_search: true
```

## Usage

Extensions are loaded in `antora-playbook.yml`:

```yaml
antora:
  extensions:
    - '@antora/lunr-extension'
    - ./extensions/search-index-customizer.js
    - ./extensions/lunr-enhancements-extension.js
```

## Development

To create a new extension:

1. Create a new `.js` file in this directory
2. Export a `register` function
3. Use Antora's event system to hook into the build process
4. Add the extension to your playbook

Example:
```javascript
module.exports.register = function ({ config }) {
  const logger = this.getLogger('my-extension')
  
  this.on('beforePublish', ({ contentCatalog }) => {
    logger.info('My extension is running')
    // Your logic here
  })
}
```

## Events Available

- `playbookBuilt` - After playbook is built
- `contentAggregated` - After content is aggregated
- `contentClassified` - After content is classified
- `documentsConverted` - After documents are converted
- `navigationBuilt` - After navigation is built
- `beforePublish` - Before site is published
- `published` - After site is published

## Resources

- [Antora Extension Documentation](https://docs.antora.org/antora/latest/extend/extensions/)
- [Lunr.js Documentation](https://lunrjs.com/)
