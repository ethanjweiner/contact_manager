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
    this.searchBox = this.homePage.querySelector('#search');

    // Buttons
    this.clearFiltersButton = this.homePage.querySelector('.clear-filters');

    // Rendering
    this.#bindPageSwitches();
    this.renderPage('#home');
  }

  // Rendering
  renderPage(pageId) {
    this.activePage.classList.add('hidden');
    this.activePage = this.main.querySelector(pageId);
    this.activePage.classList.remove('hidden');

    // Render contact form if necessary
    if (this.activePage === this.addContactPage) {
      this.renderContactForm(this.addContactForm);
    }
  }

  renderContactsList(data) {
    this.#insertTemplate(this.contactsList, 'contacts_list', data);
  }

  renderContactForm(form, data = {}) {
    this.#insertTemplate(form, 'contact_form', data);
  }

  openEditor(contact) {
    this.renderPage('#edit-contact');
    this.renderContactForm(this.editContactForm, contact);
  }

  #insertTemplate(element, template, data = {}) {
    if (element.firstElementChild) element.firstElementChild.remove();
    element.insertAdjacentHTML('afterbegin', this.templates[template](data));
  }

  // Event listeners
  #bindPageSwitches() {
    document.addEventListener('click', (e) => {
      const target = e.target;

      if (target.classList.contains('page-switcher')) {
        this.renderPage(target.dataset.page);
      }
    });
  }

  onEditButtonClick(handler) {
    document.addEventListener('click', (e) => {
      const target = e.target;

      if (target.classList.contains('edit')) {
        const contactId = parseInt(target.dataset.contactId);
        handler(contactId);
      }
    });
  }

  onNewContactSubmission(handler) {
    this.addContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const target = e.target;
      const newContact = this.formToContact(target);

      handler(newContact);
    });
  }

  onEditContactSubmission(handler) {
    this.editContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const target = e.target;
      const updatedContact = this.formToContact(target);

      handler(updatedContact);
    });
  }

  onSearchInput(handler) {
    this.searchBox.addEventListener('input', (e) => {
      handler(e.target.value);
    });
  }

  onContactDeletion(handler) {
    this.contactsList.addEventListener('click', (e) => {
      const target = e.target;

      if (target.classList.contains('delete')) {
        const { name, contactId } = target.dataset;

        if (!confirm(`Are you sure you want to delete ${name}?`)) {
          return;
        }

        handler(contactId);
      }
    });
  }

  onTagClick(handler) {
    this.contactsList.addEventListener('click', (e) => {
      const target = e.target;

      if (target.classList.contains('tag-link')) {
        const tag = target.dataset.tag;
        handler(tag);
      }
    });
  }

  onClearFiltersClick(handler) {
    this.clearFiltersButton.addEventListener('click', (e) => {
      this.searchBox.value = '';
      handler();
    });
  }

  // Helpers
  formToContact(form) {
    const data = {};

    for (const [key, val] of new FormData(form).entries()) {
      if (key === 'tags') {
        data[key] = val.split(',');
      } else {
        data[key] = val;
      }
    }

    return data;
  }
}

export default View;
