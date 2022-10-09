class View {
  constructor() {
    this.templates = Handlebars.templates;
    this.main = document.querySelector('main');

    // Pages
    this.homePage = this.main.querySelector('#home');
    this.addContactPage = this.main.querySelector('#add-contact');
    this.editContactPage = this.main.querySelector('#edit-contact');
    this.activePage = this.homePage;

    // Contacts list
    this.contactsList = this.homePage.querySelector('.contacts-list');

    // Forms
    this.addContactForm = this.addContactPage.querySelector('form');
    this.editContactForm = this.editContactPage.querySelector('form');

    this.bindListeners();

    // Rendering
    this.renderPage('#home');
  }

  renderPage(pageId) {
    this.activePage.classList.add('hidden');
    this.activePage = this.main.querySelector(pageId);
    this.activePage.classList.remove('hidden');

    if (this.activePage === this.addContactPage) {
      this.renderContactForm(this.addContactForm);
    }
  }

  insertTemplate(element, template, data = {}) {
    if (element.firstElementChild) element.firstElementChild.remove();
    element.insertAdjacentHTML('afterbegin', this.templates[template](data));
  }

  renderContactsList(data) {
    this.insertTemplate(this.contactsList, 'contacts_list', data);
  }

  renderContactForm(form, data = {}) {
    this.insertTemplate(form, 'contact_form', data);
  }

  bindListeners() {
    document.addEventListener('click', (e) => {
      const target = e.target;

      if (target.classList.contains('page-switcher')) {
        this.renderPage(target.dataset.page);
      }
    });
  }

  bindNewContactSubmission(addContact) {
    this.addContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const target = e.target;
      const newContact = this.formToData(target);

      addContact(newContact).then(() => this.renderPage('#home'));
    });
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
