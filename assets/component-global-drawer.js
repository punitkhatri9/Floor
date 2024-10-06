/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/* unused harmony export default */
class GlobalDrawer extends HTMLElement {
  constructor() {
    super();
    this.closeElements = this.querySelectorAll('[data-drawer-close]');
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.closeAllDrawers = this.closeAllDrawers.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  connectedCallback() {
    window.wetheme.webcomponentRegistry.register({key: 'component-drawer'});
    window.eventBus.on('close:all:drawers', this.closeAllDrawers);
    this.closeElements.forEach((element) => {
      element.addEventListener('click', this.closeDrawer);
    });

    if (window.Shopify.designMode) {
      window.addEventListener('resize', this.handleResize);
    }
  }

  openDrawer() {
    window.eventBus.emit('close:all:drawers', this); // Close all other global drawers before opening this one
    window.eventBus.emit('close:right:drawer'); // Close right drawer before opening
    this.setAttribute('aria-hidden', 'false');
    document.body.classList.add('js-drawer-open'); // Lock scroll
    this.addEventListener('transitionend', this.handleTransitionEnd);
  }

  closeDrawer() {
    this.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('js-drawer-open'); // Unlock scroll
    this.removeEventListener('transitionend', this.handleTransitionEnd);
  }

  closeAllDrawers(e) {
    if (e === this) return; // Only close other drawers not this one
    this.closeDrawer();
  }

  handleTransitionEnd(e) {
    // Trap focus once drawer is fully open
    if (e.target === this) {
      this.trapFocus();
    }
  }

  trapFocus() {
    const focusableElements = this.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    firstFocusableElement.focus();
    this.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
          }
        }
      }
    });
  }

  handleResize() {
    this.classList.add('disable-transitions');
    setTimeout(() => {
      this.classList.remove('disable-transitions');
    }, 500);
  }

  disconnectedCallback() {
    if (window.Shopify.designMode) {
      window.removeEventListener('resize', this.handleResize);
    }
  }
}
/******/ })()
;