class View {
  constructor() {
    this.templates = Handlebars.templates;
    this.main = document.querySelector('main');

    // Pages
    this.homePage = this.main.querySelector('#home');
    this.addContactPage = this.main.querySelector('#add-contact');
    this.editContactPage = this.main.querySelector('#edit-contact');
    this.activePage = this.homePage;

    // Forms
    this.addContactForm = this.addContactPage.querySelector('form');
    this.editContactForm = this.editContactPage.querySelector('form');

    this.bindListeners();
  }

  renderPage(pageId) {
    this.activePage.classList.add('hidden');
    this.activePage = this.main.querySelector(pageId);
    this.activePage.classList.remove('hidden');

    if (this.activePage.contains(this.addContactForm)) {
      this.renderContactForm(this.addContactForm);
    }
  }

  renderContactForm(form, data = {}) {
    if (form.firstElementChild) form.firstElementChild.remove();
    form.insertAdjacentHTML('afterbegin', this.templates['contact_form'](data));
  }

  bindListeners() {
    document.addEventListener('click', (e) => {
      const target = e.target;

      if (target.classList.contains('page-switcher')) {
        this.renderPage(target.dataset.page);
      }
    });

    this.addContactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const target = e.target;
      const newContact = this.formToData(target);
      this.addContact(newContact).then(() => this.renderPage('#home'));
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
}

export default View;
