'use strict'

module.exports = (obj, key) => {
  if (!obj || key == null) return undefined
  return obj[key]
}
