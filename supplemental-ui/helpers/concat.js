'use strict'

module.exports = (...args) => {
  const numArgs = args.length
  if (numArgs < 2) throw new Error('{{concat}} helper expects at least 1 argument')
  // Remove the Handlebars options object (last argument)
  args.pop()
  return args.join('')
}
