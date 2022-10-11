class Page {
  constructor(pageElement) {
    this.templates = Handlebars.templates;
    this.page = pageElement;
  }

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
    [...element.children].forEach((child) => child.remove());
    element.insertAdjacentHTML('afterbegin', this.templates[template](data));
  }
}

class HomePage extends Page {
  constructor(pageElement) {
    super(pageElement);
    this.contactsList = this.select('.contacts-list');
    this.tagsList = this.select('.all-tags');
    this.searchBox = this.select('#search');
    this.clearFiltersButton = this.select('.clear-filters');
  }

  // Rendering
  renderContactsList(data) {
    this.insertTemplate(this.contactsList, 'contacts_list', data);
  }

  renderTags(tags) {
    this.insertTemplate(this.tagsList, 'tags', { tags });
  }

  // Event Listeners
  onSearchInput(handler) {
    this.searchBox.addEventListener('input', (e) => {
      handler(e.target.value);
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

  onDeleteButtonClick(handler) {
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
    document.addEventListener('click', (e) => {
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

  // Add contact form rendering to `show`
  show(contact = {}) {
    super.show();
    this.renderContactForm(contact);
  }

  // Rendering
  renderContactForm(contact = {}) {
    this.insertTemplate(this.form, 'contact_form', contact);
  }

  // Event Listeners
  onSubmission(handler) {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const target = e.target;
      const contact = this.formToContact(target);
      handler(contact);
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

export { HomePage, ContactPage };
