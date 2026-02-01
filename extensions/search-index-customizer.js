'use strict'

/**
 * Antora Extension to Customize Lunr Search Index
 * Enhances the search index with better tokenization and field weighting
 */

module.exports.register = function ({ config }) {
  const logger = this.getLogger('search-index-customizer')
  
  this.on('beforePublish', ({ playbook, contentCatalog }) => {
    logger.info('Customizing search index configuration...')
    
    const searchConfig = {
      // Snippet configuration - use whatever is passed from playbook
      snippetLength: config.snippet_length || config.snippetLength || 150,
      
      // Field boosting for better relevance
      fields: {
        title: { boost: 10 },
        name: { boost: 5 },
        text: { boost: 1 },
        keywords: { boost: 8 }
      },
      
      // Search behavior
      maxResults: config.max_results || 50,
      minSearchLength: config.min_search_length || 2,
      
      // Advanced features
      features: {
        fuzzyMatching: config.fuzzy_matching !== false,
        wildcardSearch: config.wildcard_search !== false,
        phraseSearch: config.phrase_search !== false
      }
    }
    
    logger.info(`Search snippet length set to: ${searchConfig.snippetLength} characters`)
    logger.debug(JSON.stringify(searchConfig, null, 2))
    
    // Store config for use by other extensions or UI
    contentCatalog.searchConfig = searchConfig
  })
  
  this.on('documentsConverted', ({ contentCatalog }) => {
    // Process and enhance document metadata for search
    const pages = contentCatalog.getPages()
    let enhancedCount = 0
    
    pages.forEach((page) => {
      if (page.out && page.asciidoc) {
        // Add searchable metadata
        if (!page.asciidoc.attributes) {
          page.asciidoc.attributes = {}
        }
        
        // Extract and enhance keywords
        const title = page.asciidoc.doctitle || page.title || ''
        const keywords = extractKeywords(title, page.contents?.toString())
        
        if (keywords.length > 0) {
          page.asciidoc.attributes.keywords = keywords.join(', ')
          enhancedCount++
        }
      }
    })
    
    logger.info(`Enhanced ${enhancedCount} pages with search metadata`)
  })
}

/**
 * Extract important keywords from title and content
 */
function extractKeywords(title, content) {
  const keywords = new Set()
  
  // Add title words
  if (title) {
    title.split(/\s+/).forEach(word => {
      const cleaned = word.replace(/[^\w]/g, '').toLowerCase()
      if (cleaned.length > 3) keywords.add(cleaned)
    })
  }
  
  // Extract from content headings (##, ===, etc.)
  if (content) {
    const headingMatches = content.match(/^[=#]{2,}\s+(.+)$/gm)
    if (headingMatches) {
      headingMatches.forEach(heading => {
        const text = heading.replace(/^[=#]+\s*/, '')
        text.split(/\s+/).forEach(word => {
          const cleaned = word.replace(/[^\w]/g, '').toLowerCase()
          if (cleaned.length > 3) keywords.add(cleaned)
        })
      })
    }
  }
  
  return Array.from(keywords).slice(0, 10) // Limit to top 10 keywords
}
