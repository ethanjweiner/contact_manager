class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Handle model updates
    this.model.onContactsUpdate(this.handleContactsUpdate);
    this.handleContactsUpdate();

    // Handle view events
    this.view.addContactPage.onSubmission(this.handleNewContact);
    this.view.editContactPage.onSubmission(this.handleEditContact);
    this.view.homePage.onSearchInput(this.handleSearchInput);
    this.view.homePage.onDeleteButtonClick(this.handleDeletion);
    this.view.homePage.onEditButtonClick(this.handleEditButtonClick);
    this.view.homePage.onTagClick(this.handleTagClick);
    this.view.homePage.onClearFiltersClick(this.renderAllContacts);
  }

  handleContactsUpdate = async () => {
    await this.model.refreshContacts();
    this.model.refreshTags();
    this.renderAllContacts();
    this.renderAllTags();
  };

  handleNewContact = async (newContact) => {
    await this.model.addContact(newContact);
    this.view.showPage(this.view.homePage);
  };

  handleEditContact = async (updatedContact) => {
    await this.model.editContact(updatedContact);
    this.view.showPage(this.view.homePage);
  };

  handleDeletion = async (contactId) => {
    await this.model.deleteContact(contactId);
  };

  handleEditButtonClick = (contactId) => {
    const contact = this.model.getContact(contactId);

    if (!contact) {
      alert('Contact to edit could not be found.');
      return;
    }

    this.view.showPage(this.view.editContactPage, contact);

    return contact;
  };

  handleSearchInput = (name) => {
    const contacts = this.model.filterByName(name);
    this.view.homePage.renderContactsList({
      hasContacts: this.model.contacts.length > 0,
      contacts: contacts.length ? contacts : null,
      nameFilter: name,
    });
  };

  handleTagClick = (tag) => {
    const contacts = this.model.filterByTag(tag);
    this.view.homePage.renderContactsList({
      hasContacts: this.model.contacts.length > 0,
      contacts: contacts.length ? contacts : null,
    });
  };

  renderAllContacts = () => {
    this.view.homePage.renderContactsList({
      hasContacts: this.model.contacts.length > 0,
      contacts: this.model.contacts,
    });
  };

  renderAllTags = () => {
    this.view.homePage.renderTags(this.model.tags);
  };
}

export default Controller;
