import { HomePage, ContactPage } from './pages.js';

class View {
  constructor() {
    this.homePage = new HomePage(document.querySelector('#home'));
    this.addContactPage = new ContactPage(
      document.querySelector('#add-contact')
    );
    this.editContactPage = new ContactPage(
      document.querySelector('#edit-contact')
    );

    this.activePage = this.homePage;

    this.#bindPageSwitches();
  }

  showPage(page, data = {}) {
    this.activePage.hide();
    this.activePage = page;
    this.activePage.show(data);
  }

  #bindPageSwitches() {
    document.addEventListener('click', (e) => {
      const target = e.target;

      if (target.classList.contains('page-switcher')) {
        this.showPage(this[target.dataset.page]);
      }
    });
  }
}

export default View;
