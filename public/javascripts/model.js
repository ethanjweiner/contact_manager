class Model {
  static #API_PATH = '/api/contacts';

  constructor() {
    this.#loadContacts();
    this.nameFilter = null;
    this.tagFilter = null;
    this.tags = [];
    this.triggerContactsUpdate = () => {};
  }

  // Update handling
  onContactsUpdate(handler) {
    this.triggerContactsUpdate = handler;
  }

  // Contact filtering
  filterByName(name) {
    this.nameFilter = name;

    if (name) {
      this.filteredContacts = this.allContacts.filter(({ full_name }) => {
        return full_name.toLowerCase().startsWith(name.toLowerCase());
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
    this.allContacts = await this.ajax('GET', '');
    this.filteredContacts = this.allContacts;

    this.triggerContactsUpdate();
  }

  async addContact(contact) {
    const newContact = await this.ajax('POST', '', contact);
    this.allContacts.push(newContact);
    this.triggerContactsUpdate();
  }

  async editContact(contact) {
    const { id } = contact;
    const updatedContact = await this.ajax('PUT', `/${id}`, contact);
    const index = this.allContacts.findIndex(
      (contact) => contact.id === parseInt(id)
    );
    this.allContacts[index] = updatedContact;
    this.triggerContactsUpdate();
  }

  async deleteContact(id) {
    await this.ajax('DELETE', `/${id}`);
    this.allContacts = this.allContacts.filter(
      (contact) => contact.id !== parseInt(id)
    );
    this.filteredContacts = this.allContacts;

    this.triggerContactsUpdate();
  }

  // Helpers
  loadTags() {
    this.tags = [...new Set(this.allContacts.flatMap(({ tags }) => tags))];
  }

  getContact(id) {
    return this.allContacts.find((contact) => contact.id === id);
  }

  reset() {
    this.filteredContacts = this.allContacts;
    this.triggerContactsUpdate();
  }

  async ajax(method, endpoint, data = null) {
    try {
      const path = Model.#API_PATH + endpoint;
      const response = await fetch(path, {
        method,
        body: data ? JSON.stringify(data) : null,
        headers: {
          'Content-Type': 'application/json; charset="utf-8"',
        },
      });

      if (response.ok) {
        if (method === 'DELETE') return;
        return response.json();
      } else {
        throw new Error(`Error in fetching ${path}`);
      }
    } catch (error) {
      alert(error);
    }
  }
}

export default Model;
