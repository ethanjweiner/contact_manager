class Page {
  constructor(pageElement) {
    this.templates = Handlebars.templates;
    this.page = pageElement;
  }

  // Override as needed to display different elements
  show() {
    this.page.classList.remove('hidden');
  }

  hide() {
    this.page.classList.add('hidden');
  }

  select(selector) {
    return this.page.querySelector(selector);
  }

  insertTemplate(element, template, data = {}) {
    if (element.firstElementChild) element.firstElementChild.remove();
    element.insertAdjacentHTML('afterbegin', this.templates[template](data));
  }
}

class HomePage extends Page {
  constructor(pageElement) {
    super(pageElement);
    this.contactsList = this.select('.contacts-list');
    this.searchBox = this.select('#search');
    this.clearFiltersButton = this.select('.clear-filters');
  }

  renderContactsList(data) {
    this.insertTemplate(this.contactsList, 'contacts_list', data);
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
}

class ContactPage extends Page {
  constructor(pageElement) {
    super(pageElement);
    this.form = this.select('form');
  }

  show(contact = {}) {
    super.show();
    this.renderContactForm(contact);
  }

  renderContactForm(contact = {}) {
    this.insertTemplate(this.form, 'contact_form', contact);
  }

  onSubmission(handler) {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const target = e.target;
      const contact = this.formToContact(target);
      handler(contact);
    });
  }

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

export { HomePage, ContactPage };
