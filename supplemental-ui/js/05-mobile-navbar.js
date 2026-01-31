;(function () {
  'use strict'

  function initNavbarBurger () {
    var burgers = document.querySelectorAll('.navbar-burger')
    if (!burgers || burgers.length === 0) return
    burgers.forEach(function (burger) {
      var handler = toggleNavbarMenu.bind(burger)
      burger.addEventListener('click', handler)
      // support touch and pointer events for mobile devices
      burger.addEventListener('touchstart', function (e) { e.preventDefault(); handler(e); }, { passive: false })
      burger.addEventListener('pointerdown', function (e) { e.preventDefault(); handler(e); })
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavbarBurger)
  } else {
    initNavbarBurger()
  }

  function toggleNavbarMenu (e) {
    if (e && e.stopPropagation) e.stopPropagation() // trap event
    console.debug('[navbar] toggle invoked', { target: this, dataset: this.dataset })
    document.documentElement.classList.toggle('is-clipped--navbar')
    this.classList.toggle('is-active')
    // update aria-expanded for accessibility and to help debugging
    this.setAttribute('aria-expanded', this.classList.contains('is-active') ? 'true' : 'false')
    var menu = document.getElementById(this.dataset.target)
    if (!menu) {
      console.debug('[navbar] target menu not found:', this.dataset.target)
      return
    }
    var opened = menu.classList.toggle('is-active')
    menu.setAttribute('aria-hidden', opened ? 'false' : 'true')
    console.debug('[navbar] menu is-active:', opened, 'menuEl:', menu)
    if (opened) {
      menu.style.maxHeight = ''
      var expectedMaxHeight = window.innerHeight - Math.round(menu.getBoundingClientRect().top)
      var actualMaxHeight = parseInt(window.getComputedStyle(menu).maxHeight, 10)
      if (actualMaxHeight !== expectedMaxHeight) menu.style.maxHeight = expectedMaxHeight + 'px'
    } else {
      menu.style.maxHeight = ''
    }
  }
})()
