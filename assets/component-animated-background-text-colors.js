/******/ (() => {
  // webpackBootstrap
  var __webpack_exports__ = {};
  class animatedBackgroundTextColors extends HTMLElement {
    constructor() {
      super();

      this.blocks = this.querySelectorAll("[data-announcement-block]");
      this.index = 1;
      this.interval = null;
      this.autoRotateSpeed =
        parseInt(this.getAttribute("data-autorotate-speed"), 10) || 7000;
    }

    connectedCallback() {
      this.init();

      if (window.Shopify.designMode) {
        document.addEventListener(
          "shopify:block:select",
          this.handleBlockSelect.bind(this)
        );
        document.addEventListener(
          "shopify:block:deselect",
          this.handleBlockDeselect.bind(this)
        );
      }

      const closeButton = this.closest(".announcement_bar").querySelector(
        ".m-announcement-bar__close"
      );
      if (closeButton) {
        closeButton.addEventListener("click", () => {
          this.closest(".announcement_bar").style.display = "none";
        });
      }
    }

    init() {
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.interval = setInterval(
        this.changeColors.bind(this),
        this.autoRotateSpeed
      );
    }

    changeColors() {
      const activeBlock = this.blocks[this.index];
      const backgroundColor = activeBlock.getAttribute(
        "data-background-color-block"
      );
      const frontColor = activeBlock.getAttribute("data-front-color-block");

      setTimeout(() => {
        this.style.backgroundColor = backgroundColor;
        this.style.color = frontColor;
      }, 350);

      const prevActiveBlock = this.querySelector(
        "[data-announcement-block].active"
      );
      if (prevActiveBlock) prevActiveBlock.classList.remove("active");

      activeBlock.classList.add("active");
      this.index = (this.index + 1) % this.blocks.length;
    }

    handleBlockSelect(e) {
      const blockIndex = e.target.dataset.announcementBlockIndex;
      if (!blockIndex) return;

      this.blocks.forEach((block) => block.classList.remove("active"));
      e.target.classList.add("active");

      e.target.style.backgroundColor = e.target.getAttribute(
        "data-background-color-block"
      );
      e.target.style.color = e.target.getAttribute("data-front-color-block");
      e.target.style.transition = "none";

      this.style.transition = "none";
      this.style.backgroundColor = e.target.getAttribute(
        "data-background-color-block"
      );
      this.style.color = e.target.getAttribute("data-front-color-block");

      clearInterval(this.interval);
      this.index = parseInt(blockIndex, 10);
    }

    handleBlockDeselect(e) {
      const blockIndex = e.target.dataset.announcementBlockIndex;
      if (!blockIndex) return;

      e.target.style.backgroundColor = "";
      e.target.style.color = "";
      e.target.style.transition = "";

      this.style.transition = "";

      this.index = (parseInt(blockIndex, 10) + 1) % this.blocks.length;
      this.init();
    }
  }

  customElements.define(
    "animated-background-text-colors",
    animatedBackgroundTextColors
  );
  /******/
})();
