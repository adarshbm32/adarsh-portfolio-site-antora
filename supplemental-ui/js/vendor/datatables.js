/**
 * DataTables Initialization and Responsive Tables Helper
 * - Initializes DataTables ONLY on tables with .datatable class
 * - Adds data-label attributes to ALL tables for responsive layout
 */

/* global jQuery */
;(function () {
  'use strict'

  function onReady (fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn)
    } else {
      fn()
    }
  }

  onReady(function () {
    addResponsiveLabels()
    waitForDataTables(initializeDataTables)
  })

  function waitForDataTables (cb) {
    if (
      typeof jQuery !== 'undefined' &&
      typeof jQuery.fn !== 'undefined' &&
      typeof jQuery.fn.DataTable !== 'undefined'
    ) {
      cb()
      return
    }
    setTimeout(function () {
      waitForDataTables(cb)
    }, 200)
  }

  function addResponsiveLabels () {
    var tables = document.querySelectorAll('.tableblock table')

    tables.forEach(function (table) {
      var headerCells = table.querySelectorAll('thead th')
      if (headerCells.length === 0) return

      var headers = []
      headerCells.forEach(function (th) {
        headers.push(th.textContent.trim())
      })

      var bodyRows = table.querySelectorAll('tbody tr')
      bodyRows.forEach(function (row) {
        var cells = row.querySelectorAll('td')
        cells.forEach(function (cell, index) {
          if (headers[index]) {
            cell.setAttribute('data-label', headers[index])
          }
        })
      })
    })
  }

  function initializeDataTables () {
    var tables = document.querySelectorAll('table.datatable')
    if (tables.length === 0) return

    tables.forEach(function (table) {
      jQuery(table).DataTable({
        searching: table.classList.contains('dt-search'),
        paging: table.classList.contains('dt-paging'),
      })
    })
  }
})()
