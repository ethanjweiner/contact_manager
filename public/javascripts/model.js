class Model {
  static #API_PATH = '/api/contacts';

  constructor() {
    this.contacts = [];
    this.tags = [];
    this.refreshContacts();
  }

  // Update handling
  async onContactsUpdate(handler) {
    this.triggerContactsUpdate = handler;
  }

  // Contact filtering
  filterByName(name) {
    if (!name) return this.contacts;

    return this.contacts.filter(({ full_name }) => {
      return full_name.toLowerCase().startsWith(name.toLowerCase());
    });
  }

  filterByTag(tag) {
    if (!tag) return this.contacts;

    return this.contacts.filter(({ tags }) => {
      return tags.includes(tag);
    });
  }

  // API interactions
  async refreshContacts() {
    this.contacts = await this.ajax('GET', '');
  }

  async addContact(contact) {
    await this.ajax('POST', '', contact);
    this.triggerContactsUpdate();
  }

  async editContact(contact) {
    const { id } = contact;
    await this.ajax('PUT', `/${id}`, contact);
    this.triggerContactsUpdate();
  }

  async deleteContact(id) {
    await this.ajax('DELETE', `/${id}`);
    this.triggerContactsUpdate();
  }

  // Helpers
  refreshTags() {
    this.tags = [...new Set(this.contacts.flatMap(({ tags }) => tags))];
  }

  getContact(id) {
    return this.contacts.find((contact) => contact.id === id);
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
