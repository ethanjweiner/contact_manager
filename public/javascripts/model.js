class Model {
  constructor() {
    this.#loadContacts();
    this.nameFilter = null;
    this.tagFilter = null;
    this.triggerUpdate = () => {};
  }

  async #loadContacts() {
    const response = await fetch('/api/contacts');
    const contacts = await response.json();

    this.allContacts = contacts;
    this.filteredContacts = this.allContacts;

    this.triggerUpdate();
  }

  onContactsUpdate(handler) {
    this.triggerUpdate = handler;
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

    this.triggerUpdate();
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

    this.triggerUpdate();
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
      this.allContacts.push(newContact);
      this.triggerUpdate();
    } else {
      console.log(response);
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
      const index = this.allContacts.findIndex(
        (contact) => contact.id === parseInt(id)
      );
      this.allContacts[index] = updatedContact;
      this.triggerUpdate();
    } else {
      console.log(response);
    }
  }

  async deleteContact(id) {
    const response = await fetch(`/api/contacts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      this.allContacts = this.allContacts.filter(
        (contact) => contact.id !== parseInt(id)
      );
      this.filteredContacts = this.allContacts;

      this.triggerUpdate();
    } else {
      console.log(response);
    }
  }

  reset() {
    this.filteredContacts = this.allContacts;
    this.triggerUpdate();
  }
}

export default Model;
