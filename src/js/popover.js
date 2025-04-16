export default class Popover {
  constructor() {
    this._popovers = [];

    window.addEventListener('click', (event) => {
      const activator = event.target.closest('[data-toggle="popover"]');

      if (activator) {
        this.toggle(activator);
      }
    });
  }

  remove(activator, id) {
    const popover = this._popovers.find(p => p.id === id);
    popover.element.remove();
    activator.removeAttribute('aria-describedby');
    this._popovers = this._popovers.filter(p => p.id !== id);
  }

  show(activator) {
    const id = 'popover-' + Date.now();

    activator.setAttribute('aria-describedby', id);

    const popperElement = document.createElement('div');
    popperElement.classList.add('popover', 'popover--top');
    popperElement.id = id;
    popperElement.role = 'tooltip';

    const popperArrowElement = document.createElement('div');
    popperArrowElement.classList.add('popover__arrow');
    popperElement.appendChild(popperArrowElement);

    const popoverHeaderElement = document.createElement('h3');
    popoverHeaderElement.classList.add('popover__header');
    popoverHeaderElement.textContent = activator.dataset.title;
    popperElement.appendChild(popoverHeaderElement);

    const popoverBodyElement = document.createElement('div');
    popoverBodyElement.classList.add('popover__body');
    popoverBodyElement.textContent = activator.dataset.content;
    popperElement.appendChild(popoverBodyElement);

    this._popovers.push({ id, element: popperElement });
    document.body.appendChild(popperElement);

    const { left, top } = activator.getBoundingClientRect();

    popperElement.style.left = (left + activator.offsetWidth / 2 - popperElement.offsetWidth / 2) + 'px';
    popperElement.style.top = (top - popperElement.offsetHeight - popperArrowElement.offsetHeight) + 'px';

    popperArrowElement.style.left = (popperElement.offsetWidth / 2 - popperArrowElement.offsetWidth / 2) + 'px';

    return id;
  }

  toggle(activator) {
    if (activator.hasAttribute('aria-describedby')) {
      this.remove(activator, activator.getAttribute('aria-describedby'));
    }
    else {
      this.show(activator);
    }
  }
}
