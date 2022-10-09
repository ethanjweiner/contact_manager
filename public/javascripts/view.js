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
      } else if (target.classList.contains('add-tag')) {
        this.addTag();
      }
    });

    document.addEventListener('submit', (e) => {
      e.preventDefault();

      const target = e.target;
      const newContact = this.formToData(target);

      switch (target.id) {
        case 'contact-form':
          this.addContact(newContact).then(() => this.renderView('home'));
          break;
        case 'tag-form':
          this.addTag(data);
          break;
        default:
          break;
      }
    });
  }

  async addContact(contact) {
    const response = await fetch('/api/contacts', {
      method: 'POST',
      body: JSON.stringify(contact),
      headers: {
        'Content-Type': 'application/json; charset="utf-8"',
      },
    });
    // Add new contact to model
    const newContact = await response.json();
    console.log(newContact);
  }

  formToData(form) {
    const data = {};

    for (const [key, val] of new FormData(form).entries()) {
      data[key] = val;
    }

    return data;
  }

  addTag() {}
}

export default View;
