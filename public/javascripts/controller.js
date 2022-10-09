class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.bindContactsUpdate(this.handleContactsUpdate);
    this.view.bindNewContactSubmission(this.handleNewContactSubmission);
  }

  handleContactsUpdate = () => {
    this.view.renderContactsList({
      contacts: this.model.contacts.length ? this.model.contacts : null,
      filteredContacts: this.model.filteredContacts.length
        ? this.model.filteredContacts
        : null,
    });
  };

  handleNewContactSubmission = async (newContact) => {
    await this.model.addContact(newContact);
    this.handleContactsUpdate();
  };
}

export default Controller;
