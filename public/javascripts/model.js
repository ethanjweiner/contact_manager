class Model {
  constructor() {
    this.fetchContacts().then((contacts) => {
      this.contacts = contacts;
      this.filteredContacts = this.contacts;
      this.nameFilter = null;
      this.tagFilter = null;
      this.onContactUpdate();
    });
  }

  bindContactsUpdate(handler) {
    this.onContactUpdate = handler;
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

    this.onContactUpdate();
  }

  filterByTag(tag) {
    this.tagFilter = tag;

    if (tag) {
      this.filteredContacts = this.contacts.filter(({ tags }) => {
        return tags.toLowerCase().includes(tag.toLowerCase());
      });
    } else {
      this.filteredContacts = this.contacts;
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
