import Popover from './popover.js';

export default class Button {
  constructor() {
    this.button = document.querySelector('.form-button');

    this.onClick = this.onClick.bind(this);
    this.button.addEventListener('click', this.onClick);

    this.popover = new Popover();
  }

  onClick(e) {
    e.preventDefault();
    this.popover.createPopover();

    const popover = document.querySelector('.popover');
    popover.classList.toggle('active');

    this.popover.showPopover(this.button);
  }
}
