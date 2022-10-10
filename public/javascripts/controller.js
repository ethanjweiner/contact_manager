class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Handle model updates
    this.model.onUpdate(this.handleModelUpdate);

    // Handle view events
    this.view.onNewContactSubmission(this.handleNewContact);
    this.view.onEditContactSubmission(this.handleEditContact);
    this.view.onSearchInput(this.handleSearchInput);
    this.view.onContactDeletion(this.handleDeletion);
    this.view.onEditButtonClick(this.handleEditButtonClick);
    this.view.onTagClick(this.handleTagClick);
    this.view.onClearFiltersClick(this.handleClearFiltersClick);
  }

  handleModelUpdate = () => {
    this.view.renderContactsList({
      contacts: this.model.contacts.length ? this.model.contacts : null,
      filteredContacts: this.model.filteredContacts.length
        ? this.model.filteredContacts
        : null,
      nameFilter: this.model.nameFilter,
      tagFilter: this.model.tagFilter,
    });
  };

  handleNewContact = async (newContact) => {
    await this.model.addContact(newContact);
    this.view.renderPage('#home');
  };

  handleEditContact = async (updatedContact) => {
    await this.model.editContact(updatedContact);
    this.view.renderPage('#home');
  };

  handleSearchInput = (name) => {
    this.model.filterByName(name);
  };

  handleDeletion = async (contactId) => {
    await this.model.deleteContact(contactId);
  };

  handleEditButtonClick = (contactId) => {
    const contact = this.model.getContact(contactId);

    if (!contact) {
      console.log('Contact could not be found.');
      return;
    }

    this.view.openEditor(contact);

    return contact;
  };

  handleTagClick = (tag) => {
    this.model.filterByTag(tag);
  };

  handleClearFiltersClick = () => {
    this.model.reset();
  };
}

export default Controller;
