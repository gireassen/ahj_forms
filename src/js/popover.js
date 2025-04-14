export default class Popover {
    createPopover() {
      const popoverChildren = `
        <h2 class="popover-title">Popover-title</h2>
        <p class="popover-text">And here's some amazing content. It's very engaging. Right?</p>
      `;
      const popover = document.createElement('div');
      popover.classList.add('popover');
  
      popover.insertAdjacentHTML('beforeend', popoverChildren);
      document.body.append(popover);
    }
  
    showPopover(element) {
      const popover = document.querySelector('.popover');
  
      const { left, top } = element.getBoundingClientRect();
  
      popover.style.top = top - 10 - popover.offsetHeight + 'px';
      popover.style.left = left + element.offsetWidth / 2 - popover.offsetWidth / 2 + 'px';
    }
  }