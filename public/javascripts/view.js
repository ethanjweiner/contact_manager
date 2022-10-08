class View {
  constructor() {
    this.templates = Handlebars.templates;
    this.main = document.querySelector('main');
    this.renderView('home');
    this.bindListeners();
  }

  renderView(viewName, { data } = {}) {
    if (this.main.firstElementChild) this.main.firstElementChild.remove();
    this.main.insertAdjacentHTML('afterbegin', this.templates[viewName](data));
  }

  bindListeners() {
    document.addEventListener('click', (e) => {
      const target = e.target;

      // View switching buttons
      if (target.classList.contains('view-switcher')) {
        this.renderView(target.dataset.view);
      }
    });
  }
}

export default View;
