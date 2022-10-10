class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Handle model updates
    this.model.onUpdate(this.handleModelUpdate);

    // Handle view events
    this.view.addContactPage.onSubmission(this.handleNewContact);
    this.view.editContactPage.onSubmission(this.handleEditContact);
    this.view.homePage.onSearchInput(this.handleSearchInput);
    this.view.homePage.onContactDeletion(this.handleDeletion);
    this.view.homePage.onEditButtonClick(this.handleEditButtonClick);
    this.view.homePage.onTagClick(this.handleTagClick);
    this.view.homePage.onClearFiltersClick(this.handleClearFiltersClick);
  }

  handleModelUpdate = () => {
    this.view.homePage.renderContactsList({
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
    this.view.showPage(this.view.homePage);
  };

  handleEditContact = async (updatedContact) => {
    await this.model.editContact(updatedContact);
    this.view.showPage(this.view.editContactPage);
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

    this.view.showPage(this.view.editContactPage, contact);

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
