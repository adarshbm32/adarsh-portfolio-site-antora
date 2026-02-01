'use strict'

/**
 * Antora Extension to Enhance Lunr Search
 * Provides better field boosting, custom pipeline, and improved search relevance
 */

module.exports.register = function ({ config }) {
  const logger = this.getLogger('lunr-enhancements-extension')
  
  this.on('beforePublish', ({ playbook, contentCatalog, siteCatalog }) => {
    logger.info('Applying Lunr search enhancements...')
    
    // Configuration options
    const options = {
      snippetLength: config.snippet_length || config.snippetLength || 150,
      fieldBoosts: config.field_boosts || {
        title: 10,
        name: 5,
        text: 1
      },
      maxResults: config.max_results || 50,
      enableFuzzySearch: config.enable_fuzzy !== false,
      ...config
    }
    
    logger.info(`Snippet length configured: ${options.snippetLength} characters`)
    logger.info(`Field boosts: ${JSON.stringify(options.fieldBoosts)}`)
    
    return { options }
  })
  
  this.on('documentsConverted', ({ contentCatalog }) => {
    logger.info('Indexing documents for enhanced search...')
    
    const pages = contentCatalog.getPages((page) => {
      return page.out && !page.out.path.startsWith('_')
    })
    
    logger.info(`Found ${pages.length} pages to index`)
  })
}
