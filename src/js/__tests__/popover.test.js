import Popover from '../popover';

describe('class Popover', () => {
  describe('[Popover]', () => {
    let activator;
    let popperFactory;

    beforeAll(() => {
      document.body.innerHTML = `
      <button
        class="btn btn-secondary"
        id="activator"
        type="button"
        data-toggle="popover"
        data-title="Popover title"
        data-content="And here's some amazing content. It's very engaging. Right?"
      >
        Click to toggle popover
      </button>
      `;
      activator = document.querySelector('#activator');
      popperFactory = new Popover();
    });

    test('.show()', () => {
      const id = popperFactory.show(activator);
      const popover = popperFactory._popovers.find(p => p.id === id);

      expect(activator.hasAttribute('aria-describedby')).toBeTruthy();
      expect(activator.getAttribute('aria-describedby')).toBe(id);
      expect(popover.element.className).toBe('popover popover--top');
      expect(popover.element.id).toBe(id);
      expect(popover.element.children[0].className).toBe('popover__arrow');
      expect(popover.element.children[1].className).toBe('popover__header');
      expect(popover.element.children[2].className).toBe('popover__body');
    });

    test('.remove()', () => {
      const id = activator.getAttribute('aria-describedby');

      popperFactory.remove(activator, id);

      expect(activator.hasAttribute('aria-describedby')).toBeFalsy();
      expect(popperFactory._popovers.find(p => p.id === id)).toBeUndefined();
    });

    describe('.toggle()', () => {
      beforeAll(() => {
        popperFactory.remove = jest.fn();
        popperFactory.show = jest.fn();
      });

      test('called show()', () => {
        if (activator.hasAttribute('aria-describedby')) {
          activator.removeAttribute('aria-describedby');
        }

        popperFactory.toggle(activator);

        expect(popperFactory.show).toHaveBeenCalled();
      });

      test('called remove()', () => {
        activator.setAttribute('aria-describedby', 'popover-0');
        popperFactory.toggle(activator);

        expect(popperFactory.remove).toHaveBeenCalled();
      });
    });
  });
});
