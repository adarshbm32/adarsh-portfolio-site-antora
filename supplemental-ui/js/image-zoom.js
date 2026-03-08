/**
 * Medium Zoom Integration for Images
 * Provides click-to-zoom functionality for images in documentation
 *
 * Implementation based on: https://gitlab.com/antora/antora/-/issues/834
 * Uses medium-zoom library from CDN
 */

/* global mediumZoom */
;(function () {
  'use strict'

  function onReady (fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn)
    } else {
      fn()
    }
  }

  // Wait for DOM and medium-zoom to be available
  onReady(function () {
    if (typeof mediumZoom !== 'undefined') {
      initializeImageZoom()
    } else {
      // Retry after a brief delay if medium-zoom isn't ready yet
      setTimeout(function () {
        if (typeof mediumZoom !== 'undefined') {
          initializeImageZoom()
        }
      }, 500)
    }
  })

  function initializeImageZoom () {
    // Initialize medium-zoom for images in documentation
    // Excludes images with 'no-zoom' class
    var images = document.querySelectorAll(
      '.doc img:not(.no-zoom), ' +
        '.content img:not(.no-zoom), ' +
        'main img:not(.no-zoom), ' +
        'article img:not(.no-zoom), ' +
        '[role="main"] img:not(.no-zoom)'
    )

    if (images.length === 0) {
      console.debug('[Image Zoom] No images found to enhance')
      return
    }

    try {
      mediumZoom(images, {
        background: '#fff',
        margin: 24,
        scrollOffset: 40,
      })
      console.debug('[Image Zoom] Initialized for ' + images.length + ' images')
    } catch (e) {
      console.warn('[Image Zoom] Failed to initialize:', e.message)
    }
  }
})()
