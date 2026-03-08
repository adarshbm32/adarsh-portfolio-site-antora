;(function () {
  'use strict'

  // Add copy-to-clipboard functionality for heading anchors
  var headings = document.querySelectorAll(
    '.doc h1[id], .doc h2[id], .doc h3[id], .doc h4[id], .doc h5[id], .doc h6[id]'
  )

  headings.forEach(function (heading) {
    var anchor = heading.querySelector('.anchor')
    if (!anchor) return

    // Make anchor clickable to copy URL
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      var url = window.location.origin + window.location.pathname + '#' + heading.id

      if (window.navigator.clipboard) {
        window.navigator.clipboard.writeText(url).then(
          function () {
            // Show visual feedback
            var originalContent = anchor.textContent
            anchor.textContent = '✓'
            anchor.style.opacity = '1'

            setTimeout(function () {
              anchor.textContent = originalContent
            }, 1000)
          },
          function (err) {
            console.error('Failed to copy: ', err)
          }
        )
      }
    })

    // Make anchor visible and clickable
    anchor.style.cursor = 'pointer'
  })
})()
