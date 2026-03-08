'use strict'

module.exports = (value, separator = ',') => {
  if (value == null) return []
  if (Array.isArray(value)) return value
  if (typeof value !== 'string') return [value]
  return value
    .split(separator)
    .map((item) => item.trim())
    .filter(Boolean)
}
