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
    this.renderPage('#home');
  }

  renderPage(pageId) {
    this.activePage.classList.add('hidden');
    this.activePage = this.main.querySelector(pageId);
    this.activePage.classList.remove('hidden');

    // Render contact form if necessary
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

  bindPageSwitches() {
    document.addEventListener('click', (e) => {
      const target = e.target;

      if (target.classList.contains('page-switcher')) {
        this.renderPage(target.dataset.page);
      }
    });
  }

  bindSwitchToEditor(supplyContact) {
    document.addEventListener('click', (e) => {
      const target = e.target;

      if (target.classList.contains('edit')) {
        this.renderPage('#edit-contact');
        const contactId = parseInt(target.dataset.contactId);
        this.renderContactForm(this.editContactForm, supplyContact(contactId));
      }
    });
  }

  bindNewContactSubmission(addContact) {
    this.addContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const target = e.target;
      const newContact = this.formToContact(target);

      addContact(newContact).then(() => this.renderPage('#home'));
    });
  }

  bindEditContactSubmission(editContact) {
    this.editContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const target = e.target;
      const updatedContact = this.formToContact(target);

      editContact(updatedContact).then(() => this.renderPage('#home'));
    });
  }

  bindSearch(filterByName) {
    this.searchBox.addEventListener('input', (e) => {
      filterByName(e.target.value);
    });
  }

  bindContactDeletion(deleteContact) {
    this.contactsList.addEventListener('click', (e) => {
      const target = e.target;

      if (target.classList.contains('delete')) {
        const { name, contactId } = target.dataset;

        if (!confirm(`Are you sure you want to delete ${name}?`)) {
          return;
        }

        deleteContact(contactId);
      }
    });
  }

  bindTagLinkClick(onTagLinkClick) {
    this.contactsList.addEventListener('click', (e) => {
      const target = e.target;

      if (target.classList.contains('tag-link')) {
        const tag = target.dataset.tag;
        onTagLinkClick(tag);
      }
    });
  }

  bindClearFiltersClick(clearFilters) {
    this.clearFiltersButton.addEventListener('click', (e) => {
      this.searchBox.value = '';
      clearFilters();
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
