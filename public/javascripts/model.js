class Model {
  constructor() {
    this.#loadContacts();
    this.nameFilter = null;
    this.tagFilter = null;
    this.tags = [];
    this.triggerContactsUpdate = () => {};
  }

  loadTags() {
    this.tags = [...new Set(this.allContacts.flatMap(({ tags }) => tags))];
  }

  onContactsUpdate(handler) {
    this.triggerContactsUpdate = handler;
  }

  getContact(id) {
    return this.allContacts.find((contact) => contact.id === id);
  }

  filterByName(name) {
    this.nameFilter = name;

    if (name) {
      this.filteredContacts = this.allContacts.filter(({ full_name }) => {
        return full_name.toLowerCase().includes(name.toLowerCase());
      });
    } else {
      this.filteredContacts = this.allContacts;
    }

    this.triggerContactsUpdate();
  }

  filterByTag(tag) {
    this.tagFilter = tag;

    if (tag) {
      this.filteredContacts = this.allContacts.filter(({ tags }) => {
        return tags.includes(tag);
      });
    } else {
      this.filteredContacts = this.allContacts;
    }

    this.triggerContactsUpdate();
  }

  // API interactions
  async #loadContacts() {
    this.allContacts = await this.ajax('GET', '/api/contacts');
    this.filteredContacts = this.allContacts;

    this.triggerContactsUpdate();
  }

  async addContact(contact) {
    const newContact = await this.ajax('POST', '/api/contacts', contact);
    this.allContacts.push(newContact);
    this.triggerContactsUpdate();
  }

  async editContact(contact) {
    const { id } = contact;
    const updatedContact = await this.ajax(
      'PUT',
      `/api/contacts/${id}`,
      contact
    );
    const index = this.allContacts.findIndex(
      (contact) => contact.id === parseInt(id)
    );
    this.allContacts[index] = updatedContact;
    this.triggerContactsUpdate();
  }

  async deleteContact(id) {
    await this.ajax('DELETE', `/api/contacts/${id}`);
    this.allContacts = this.allContacts.filter(
      (contact) => contact.id !== parseInt(id)
    );
    this.filteredContacts = this.allContacts;

    this.triggerContactsUpdate();
  }

  // Helpers
  reset() {
    this.filteredContacts = this.allContacts;
    this.triggerContactsUpdate();
  }

  async ajax(method, url, data = null) {
    const response = await fetch(url, {
      method,
      body: data ? JSON.stringify(data) : null,
      headers: {
        'Content-Type': 'application/json; charset="utf-8"',
      },
    });

    if (response.ok) {
      return response.json();
    } else {
      alert(`${response.status} error.`);
    }
  }
}

export default Model;
