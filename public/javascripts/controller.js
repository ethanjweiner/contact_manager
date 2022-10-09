class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.bindContactsUpdate(this.handleContactsUpdate);
    this.view.bindNewContactSubmission(this.handleNewContactSubmission);
    this.view.bindSearch(this.handleSearch);
  }

  handleContactsUpdate = () => {
    this.view.renderContactsList({
      contacts: this.model.contacts.length ? this.model.contacts : null,
      filteredContacts: this.model.filteredContacts.length
        ? this.model.filteredContacts
        : null,
      nameFilter: this.model.nameFilter,
      tagFilter: this.model.tagFilter,
    });
  };

  handleNewContactSubmission = async (newContact) => {
    await this.model.addContact(newContact);
    this.handleContactsUpdate();
  };

  handleSearch = (name) => {
    this.model.filterByName(name);
    this.handleContactsUpdate();
  };
}

export default Controller;
