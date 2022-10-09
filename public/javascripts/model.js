class Model {
  constructor() {
    this.fetchContacts().then((contacts) => {
      this.contacts = contacts;
      this.filteredContacts = this.contacts;
      this.onContactUpdate();
    });
  }

  bindContactsUpdate(handler) {
    this.onContactUpdate = handler;
  }

  filterContacts(filter = null) {
    if (filter) {
      // Filter contacts
    }

    this.onContactUpdate();
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

    const newContact = await response.json();
    this.contacts.push(newContact);
  }
}

export default Model;
