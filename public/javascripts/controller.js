class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.bindContactsUpdate(this.handleContactsUpdate);
    this.view.bindPageSwitches();
    this.view.bindNewContactSubmission(this.handleNewContactSubmission);
    this.view.bindEditContactSubmission(this.handleEditContactSubmission);
    this.view.bindSearch(this.handleSearch);
    this.view.bindContactDeletion(this.handleDeletion);
    this.view.bindSwitchToEditor(this.supplyContact);
    this.view.bindTagLinkClick(this.handleTagLinkClick);
    this.view.bindClearFiltersClick(this.handleClearFiltersClick);
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
  };

  handleEditContactSubmission = async (updatedContact) => {
    await this.model.editContact(updatedContact);
  };

  handleSearch = (name) => {
    this.model.filterByName(name);
  };

  handleDeletion = async (contactId) => {
    await this.model.deleteContact(contactId);
  };

  supplyContact = (contactId) => {
    const contact = this.model.getContact(contactId);

    if (!contact) {
      console.log('Contact could not be found.');
      return;
    }

    return contact;
  };

  handleTagLinkClick = (tag) => {
    this.model.filterByTag(tag);
  };

  handleClearFiltersClick = () => {
    this.model.reset();
  };
}

export default Controller;
