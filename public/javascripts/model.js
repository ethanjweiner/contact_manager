class Model {
  constructor() {
    this.fetchContacts().then((contacts) => {
      this.contacts = contacts;
      this.filteredContacts = this.contacts;
      this.nameFilter = null;
      this.tagFilter = null;
      this.onContactsUpdate();
    });
  }

  bindContactsUpdate(handler) {
    this.onContactsUpdate = handler;
  }

  filterByName(name) {
    this.nameFilter = name;

    if (name) {
      this.filteredContacts = this.contacts.filter(({ full_name }) => {
        return full_name.toLowerCase().includes(name.toLowerCase());
      });
    } else {
      this.filteredContacts = this.contacts;
    }

    this.onContactsUpdate();
  }

  filterByTag(tag) {
    this.tagFilter = tag;

    if (tag) {
      this.filteredContacts = this.contacts.filter(({ tags }) => {
        return tags.includes(tag);
      });
    } else {
      this.filteredContacts = this.contacts;
    }

    this.onContactsUpdate();
  }

  async fetchContacts() {
    const response = await fetch('/api/contacts');
    const contacts = await response.json();
    return contacts;
  }

  async addContact(contact) {
    const response = await fetch('/api/contacts', {
      method: 'POST',
      body: JSON.stringify(contact),
      headers: {
        'Content-Type': 'application/json; charset="utf-8"',
      },
    });

    if (response.ok) {
      const newContact = await response.json();
      this.contacts.push(newContact);
      this.onContactsUpdate();
    }
  }

  async editContact(contact) {
    const { id } = contact;
    const response = await fetch(`/api/contacts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(contact),
      headers: {
        'Content-Type': 'application/json; charset="utf-8"',
      },
    });

    if (response.ok) {
      const updatedContact = await response.json();
      const index = this.contacts.findIndex(
        (contact) => contact.id === parseInt(id)
      );
      this.contacts[index] = updatedContact;
      this.onContactsUpdate();
    }
  }

  async deleteContact(id) {
    const response = await fetch(`/api/contacts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      this.contacts = this.contacts.filter(
        (contact) => contact.id !== parseInt(id)
      );
      this.onContactsUpdate();
    }
  }

  getContact(id) {
    return this.contacts.find((contact) => contact.id === id);
  }

  reset() {
    this.filteredContacts = this.contacts;
    this.onContactsUpdate();
  }
}

export default Model;
